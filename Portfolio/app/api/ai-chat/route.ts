import { hasLocale } from "next-intl"
import { getDictionary } from "@/content"
import { routing, type Locale } from "@/i18n/routing"
import { offlineAnswer } from "@/lib/assistant/fallback"
import { screenForInjection } from "@/lib/assistant/guard"
import { buildSystemPrompt, CLOSING_REMINDER } from "@/lib/assistant/prompt"
import { isRateLimited } from "@/lib/assistant/rate-limit"

/*
 * Security layers, outermost first:
 *  1. Cross-site browser requests are refused (other sites can't spend this quota).
 *  2. Body size, message count and message length are capped; text is normalized and stripped
 *     of invisible and bidirectional-override characters that can hide instructions.
 *  3. Per-client rate limit, keyed on the IP set by the hosting platform.
 *  4. A prompt-injection classifier screens the conversation in parallel with the answer.
 *  5. The system prompt holds only public facts and strict rules, repeated after the history.
 *  6. The client renders answers without HTML and only links to allowlisted destinations.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

/**
 * Tried in order. The best free model first, then a different model family, so a model being
 * retired upstream (which is what broke the previous assistant) never takes the feature down.
 */
const MODELS = [
  { id: "openai/gpt-oss-120b", options: { reasoning_effort: "low", include_reasoning: false } },
  { id: "qwen/qwen3.8-27b", options: { reasoning_format: "hidden" } },
  { id: "openai/gpt-oss-20b", options: { reasoning_effort: "low", include_reasoning: false } },
] as const

const LIMITS = {
  bodyBytes: 32_000,
  messages: 10,
  userChars: 600,
  assistantChars: 2_000,
  answerTokens: 450,
  timeoutMs: 15_000,
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ChatRequest {
  locale: Locale
  messages: ChatMessage[]
}

/** Zero-width, bidi-override and control characters (newline and tab are kept). */
const HIDDEN_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F​-‏‪-‮⁠-⁤⁦-⁩﻿]/g

function sanitize(text: string): string {
  return text.normalize("NFKC").replace(HIDDEN_CHARACTERS, "").trim()
}

function parseRequest(body: unknown): ChatRequest | null {
  if (typeof body !== "object" || body === null) return null
  const { locale, messages } = body as Record<string, unknown>
  if (typeof locale !== "string" || !hasLocale(routing.locales, locale)) return null
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > LIMITS.messages) {
    return null
  }

  const parsed: ChatMessage[] = []
  for (const message of messages) {
    if (typeof message !== "object" || message === null) return null
    const { role, content } = message as Record<string, unknown>
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null
    const clean = sanitize(content)
    const max = role === "user" ? LIMITS.userChars : LIMITS.assistantChars
    if (!clean || clean.length > max) return null
    parsed.push({ role, content: clean })
  }
  if (parsed[parsed.length - 1]?.role !== "user") return null
  return { locale, messages: parsed }
}

/** The platform's own client-IP headers first: they can't be set by the visitor on Vercel. */
function clientKey(request: Request): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anonymous"
  )
}

function json(status: number, error: string) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } })
}

function textResponse(body: ReadableStream<Uint8Array> | string, source: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Assistant-Source": source,
    },
  })
}

/**
 * Turns Groq's server-sent events into a plain text stream of answer tokens. If the model sends
 * no text at all, the offline answer is streamed instead, so the visitor never gets a blank reply.
 */
function toTextStream(upstream: ReadableStream<Uint8Array>, fallbackText: string) {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ""
  let sentText = false

  return upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""
        for (const line of lines) {
          const data = line.startsWith("data:") ? line.slice(5).trim() : ""
          if (!data || data === "[DONE]") continue
          try {
            const payload = JSON.parse(data) as {
              choices?: { delta?: { content?: string } }[]
            }
            const text = payload.choices?.[0]?.delta?.content
            if (text) {
              sentText = true
              controller.enqueue(encoder.encode(text))
            }
          } catch {
            // Ignore keep-alive comments or partial frames; the next chunk completes them.
          }
        }
      },
      flush(controller) {
        if (!sentText) controller.enqueue(encoder.encode(fallbackText))
      },
    }),
  )
}

/** Asks each model in turn; returns the first streaming response, or null if all fail. */
async function requestAnswer(
  messages: { role: string; content: string }[],
  apiKey: string,
  signal: AbortSignal,
): Promise<{ body: ReadableStream<Uint8Array>; model: string } | null> {
  for (const model of MODELS) {
    if (signal.aborted) return null
    try {
      const upstream = await fetch(GROQ_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: model.id,
          messages,
          stream: true,
          temperature: 0.5,
          max_completion_tokens: LIMITS.answerTokens,
          ...model.options,
        }),
        signal: AbortSignal.any([signal, AbortSignal.timeout(LIMITS.timeoutMs)]),
      })
      if (upstream.ok && upstream.body) return { body: upstream.body, model: model.id }
      console.error(`[assistant] ${model.id} responded ${upstream.status}`)
    } catch (error) {
      if (signal.aborted) return null
      console.error(`[assistant] ${model.id} failed:`, error instanceof Error ? error.name : error)
    }
  }
  return null
}

export async function POST(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site")
  if (fetchSite && fetchSite !== "same-origin") return json(403, "FORBIDDEN")

  const declaredLength = Number(request.headers.get("content-length") ?? 0)
  if (declaredLength > LIMITS.bodyBytes) return json(413, "TOO_LARGE")

  let body: unknown
  try {
    const raw = await request.text()
    if (raw.length > LIMITS.bodyBytes) return json(413, "TOO_LARGE")
    body = JSON.parse(raw)
  } catch {
    return json(400, "INVALID_REQUEST")
  }
  const chat = parseRequest(body)
  if (!chat) return json(400, "INVALID_REQUEST")
  if (isRateLimited(clientKey(request))) return json(429, "RATE_LIMITED")

  const question = chat.messages[chat.messages.length - 1]?.content ?? ""
  const fallbackText = offlineAnswer(chat.locale, question)
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || process.env.ASSISTANT_OFFLINE === "1") return textResponse(fallbackText, "offline")

  const messages = [
    { role: "system", content: buildSystemPrompt(chat.locale) },
    ...chat.messages,
    { role: "system", content: CLOSING_REMINDER },
  ]

  // Screen the whole client-supplied conversation (history can be forged) while the answer starts.
  const controller = new AbortController()
  const verdictPromise = screenForInjection(
    chat.messages.map((message) => message.content),
    apiKey,
    controller.signal,
  )
  const answerPromise = requestAnswer(messages, apiKey, controller.signal)

  const verdict = await verdictPromise
  if (verdict === "injection") {
    controller.abort()
    void answerPromise.then((answer) => answer?.body.cancel()).catch(() => undefined)
    return textResponse(getDictionary(chat.locale).assistant.refusal, "guard")
  }
  if (verdict === "unavailable") console.error("[assistant] injection screening unavailable")

  const answer = await answerPromise
  if (!answer) return textResponse(fallbackText, "offline")
  return textResponse(toTextStream(answer.body, fallbackText), answer.model)
}
