import { getDictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { rateLimitClientKey } from "@/lib/assistant/client-ip"
import { offlineAnswer } from "@/lib/assistant/fallback"
import { screenForInjection } from "@/lib/assistant/guard"
import { looksLikeInjection } from "@/lib/assistant/injection-patterns"
import { checkRequestLimits, recordTokens, reserveModelCall } from "@/lib/assistant/limits"
import { leaksSystemPrompt, stripImageMarkdown } from "@/lib/assistant/output-check"
import {
  buildSystemPrompt,
  CLOSING_REMINDER,
  PROMPT_CANARY,
  PROMPT_FRAGMENTS,
} from "@/lib/assistant/prompt"
import { sanitizeMessage } from "@/lib/assistant/sanitize"
import { chatRequestSchema } from "@/lib/assistant/schema"
import {
  clearHistory,
  loadHistory,
  newSessionId,
  readSessionId,
  saveExchange,
  sessionCookie,
} from "@/lib/assistant/session"
import { getStore } from "@/lib/assistant/store"

/*
 * Security layers, outermost first:
 *  1. Cross-site browser requests are refused.
 *  2. Body size is capped; the body must match a strict schema ({ locale, message } only), so
 *     no client field can reach the model configuration.
 *  3. Rate limits per trusted client IP and per session cookie, plus a global daily budget of
 *     model calls and tokens (shared through Upstash when configured).
 *  4. The message is normalized and stripped of invisible/bidi characters, then screened by a
 *     multilingual pattern filter and, in parallel with the answer, by Prompt Guard. Only the
 *     latest message is screened; history is kept server-side and cannot be forged.
 *  5. The answer is buffered and checked for the system-prompt canary and prompt-only headings
 *     before anything is sent. Markdown images are stripped.
 *  6. Every failure returns a generic code; provider errors and stack traces stay in server logs.
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

/** Fixed server-side. Tried in order; a retired model can't take the feature down. */
const MODELS = [
  { id: "openai/gpt-oss-120b", options: { reasoning_effort: "low", include_reasoning: false } },
  { id: "qwen/qwen3.8-27b", options: { reasoning_format: "hidden" } },
  { id: "openai/gpt-oss-20b", options: { reasoning_effort: "low", include_reasoning: false } },
] as const

const GENERATION = { temperature: 0.4, max_completion_tokens: 450 }
const BODY_LIMIT_BYTES = 8_000
const MODEL_TIMEOUT_MS = 15_000

type ChatMessage = { role: "system" | "user" | "assistant"; content: string }

function json(status: number, error: string, headers: Record<string, string> = {}) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store", ...headers } })
}

function textResponse(body: string, source: string, cookie?: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Assistant-Source": source,
      ...(cookie ? { "Set-Cookie": cookie } : {}),
    },
  })
}

/** Asks each model in turn. Returns the first non-empty answer with its token usage. */
async function requestAnswer(
  messages: ChatMessage[],
  apiKey: string,
  signal: AbortSignal,
): Promise<{ text: string; model: string; tokens: number } | null> {
  for (const model of MODELS) {
    if (signal.aborted) return null
    try {
      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: model.id, messages, ...GENERATION, ...model.options }),
        signal: AbortSignal.any([signal, AbortSignal.timeout(MODEL_TIMEOUT_MS)]),
      })
      if (!response.ok) {
        console.error(`[assistant] ${model.id} responded ${response.status}`)
        continue
      }
      const payload = (await response.json()) as {
        choices?: { message?: { content?: string } }[]
        usage?: { total_tokens?: number }
      }
      const text = payload.choices?.[0]?.message?.content?.trim()
      if (text) return { text, model: model.id, tokens: payload.usage?.total_tokens ?? 0 }
    } catch (error) {
      if (signal.aborted) return null
      console.error(
        `[assistant] ${model.id} failed:`,
        error instanceof Error ? error.name : "error",
      )
    }
  }
  return null
}

async function handleChat(request: Request): Promise<Response> {
  const fetchSite = request.headers.get("sec-fetch-site")
  if (fetchSite && fetchSite !== "same-origin") return json(403, "FORBIDDEN")

  if (Number(request.headers.get("content-length") ?? 0) > BODY_LIMIT_BYTES) {
    return json(413, "TOO_LARGE")
  }
  const raw = await request.text()
  if (raw.length > BODY_LIMIT_BYTES) return json(413, "TOO_LARGE")

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return json(400, "INVALID_REQUEST")
  }
  const parsed = chatRequestSchema.safeParse(body)
  if (!parsed.success) return json(400, "INVALID_REQUEST")
  const locale: Locale = parsed.data.locale
  const message = sanitizeMessage(parsed.data.message)
  if (!message) return json(400, "INVALID_REQUEST")

  const existingSession = readSessionId(request.headers.get("cookie"))
  const session = existingSession ?? newSessionId()
  const cookie = existingSession ? undefined : sessionCookie(session)

  const store = getStore()
  const limit = await checkRequestLimits(store, {
    ip: rateLimitClientKey(request.headers),
    session,
  })
  if (!limit.allowed) {
    return json(429, "RATE_LIMITED", {
      "Retry-After": String(limit.retryAfterSeconds ?? 60),
      ...(cookie ? { "Set-Cookie": cookie } : {}),
    })
  }

  const refusal = getDictionary(locale).assistant.refusal
  if (looksLikeInjection(message)) return textResponse(refusal, "filter", cookie)

  const history = await loadHistory(store, session)
  const apiKey = process.env.GROQ_API_KEY
  const offline = !apiKey || process.env.ASSISTANT_OFFLINE === "1"
  if (offline || !(await reserveModelCall(store))) {
    const answer = offlineAnswer(locale, message)
    await saveExchange(store, session, history, message, answer)
    return textResponse(answer, "offline", cookie)
  }

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt(locale) },
    ...history,
    { role: "user", content: message },
    { role: "system", content: CLOSING_REMINDER },
  ]

  const controller = new AbortController()
  const verdictPromise = screenForInjection(message, apiKey, controller.signal)
  const answerPromise = requestAnswer(messages, apiKey, controller.signal)

  const verdict = await verdictPromise
  if (verdict === "injection") {
    controller.abort()
    return textResponse(refusal, "guard", cookie)
  }
  if (verdict === "unavailable") console.error("[assistant] injection screening unavailable")

  const result = await answerPromise
  if (!result) {
    const answer = offlineAnswer(locale, message)
    await saveExchange(store, session, history, message, answer)
    return textResponse(answer, "offline", cookie)
  }
  await recordTokens(store, result.tokens)

  const answer = stripImageMarkdown(result.text).trim()
  if (!answer || leaksSystemPrompt(answer, PROMPT_CANARY, PROMPT_FRAGMENTS)) {
    console.error("[assistant] answer blocked by output check")
    return textResponse(refusal, "output-check", cookie)
  }

  await saveExchange(store, session, history, message, answer)
  return textResponse(answer, result.model, cookie)
}

export async function POST(request: Request) {
  try {
    return await handleChat(request)
  } catch (error) {
    console.error("[assistant] unexpected error:", error instanceof Error ? error.name : "error")
    return json(500, "SERVER_ERROR")
  }
}

/** Starts a new conversation by forgetting this session's server-side history. */
export async function DELETE(request: Request) {
  try {
    const fetchSite = request.headers.get("sec-fetch-site")
    if (fetchSite && fetchSite !== "same-origin") return json(403, "FORBIDDEN")
    const session = readSessionId(request.headers.get("cookie"))
    if (session) await clearHistory(getStore(), session)
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } })
  } catch {
    return json(500, "SERVER_ERROR")
  }
}
