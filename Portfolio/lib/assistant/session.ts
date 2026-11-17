import { randomUUID } from "node:crypto"
import type { Store } from "./store"

/**
 * Conversation state lives on the server, keyed by an HttpOnly session cookie. The browser only
 * ever sends its newest message, so it cannot forge earlier turns (including "assistant" or
 * "system" messages) to steer the model.
 */
export const SESSION_COOKIE = "assistant_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24
const HISTORY_TTL_SECONDS = 60 * 60
/** Last six messages, i.e. three question/answer exchanges. */
export const MAX_HISTORY_MESSAGES = 6

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

export interface HistoryMessage {
  role: "user" | "assistant"
  content: string
}

export function readSessionId(cookieHeader: string | null): string | null {
  const match = cookieHeader?.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`))
  const value = match?.[1]
  return value && UUID.test(value) ? value : null
}

export function newSessionId(): string {
  return randomUUID()
}

export function sessionCookie(id: string): string {
  const secure = process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
  return [
    `${SESSION_COOKIE}=${id}`,
    "Path=/api/ai-chat",
    `Max-Age=${SESSION_TTL_SECONDS}`,
    "HttpOnly",
    "SameSite=Strict",
    ...(secure ? ["Secure"] : []),
  ].join("; ")
}

const historyKey = (session: string) => `chat:history:${session}`

export async function loadHistory(store: Store, session: string): Promise<HistoryMessage[]> {
  const raw = await store.get(historyKey(session))
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as HistoryMessage[]
    return Array.isArray(parsed) ? parsed.slice(-MAX_HISTORY_MESSAGES) : []
  } catch {
    return []
  }
}

export async function saveExchange(
  store: Store,
  session: string,
  history: HistoryMessage[],
  question: string,
  answer: string,
) {
  const next = [
    ...history,
    { role: "user" as const, content: question },
    { role: "assistant" as const, content: answer },
  ].slice(-MAX_HISTORY_MESSAGES)
  await store.set(historyKey(session), JSON.stringify(next), HISTORY_TTL_SECONDS)
}

export async function clearHistory(store: Store, session: string) {
  await store.delete(historyKey(session))
}
