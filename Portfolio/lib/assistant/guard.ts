import "server-only"

/**
 * Prompt-injection screening with Meta's Prompt Guard 2 (86M) on Groq: a small classifier that
 * scores how likely a text is to be an attempt to override instructions or jailbreak the model.
 * It reliably flags English and Arabic injections in testing. Off-topic but harmless requests
 * pass through and are declined by the main model's own rules.
 */

const GUARD_MODEL = "meta-llama/llama-prompt-guard-2-86m"
const GUARD_URL = "https://api.groq.com/openai/v1/chat/completions"
const THRESHOLD = 0.9
/** The classifier reads about 512 tokens; screen the most recent part of the conversation. */
const MAX_GUARD_CHARS = 1_800
const TIMEOUT_MS = 2_500

export type GuardVerdict = "safe" | "injection" | "unavailable"

export async function screenForInjection(
  texts: string[],
  apiKey: string,
  signal?: AbortSignal,
): Promise<GuardVerdict> {
  const input = texts.join("\n\n").slice(-MAX_GUARD_CHARS)
  try {
    const response = await fetch(GUARD_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: GUARD_MODEL, messages: [{ role: "user", content: input }] }),
      signal: signal
        ? AbortSignal.any([signal, AbortSignal.timeout(TIMEOUT_MS)])
        : AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!response.ok) return "unavailable"
    const payload = (await response.json()) as { choices?: { message?: { content?: string } }[] }
    const score = Number.parseFloat(payload.choices?.[0]?.message?.content ?? "")
    if (Number.isNaN(score)) return "unavailable"
    return score >= THRESHOLD ? "injection" : "safe"
  } catch {
    return "unavailable"
  }
}
