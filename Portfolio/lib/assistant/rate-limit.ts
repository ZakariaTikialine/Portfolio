import "server-only"

/**
 * Small in-memory sliding-window limiter, per client key. It is per server instance, so on
 * serverless it is a best-effort guard against bursts rather than a global quota; together with
 * the input caps it keeps the free model quota from being drained by one visitor or script.
 */
interface Window {
  limit: number
  ms: number
}

const WINDOWS: Window[] = [
  { limit: 8, ms: 60_000 },
  { limit: 60, ms: 24 * 60 * 60_000 },
]

const hits = new Map<string, number[]>()
const MAX_TRACKED_KEYS = 5_000

export function isRateLimited(key: string, now = Date.now()): boolean {
  const longest = Math.max(...WINDOWS.map((w) => w.ms))
  const recent = (hits.get(key) ?? []).filter((time) => now - time < longest)

  const limited = WINDOWS.some(
    (window) => recent.filter((time) => now - time < window.ms).length >= window.limit,
  )
  if (!limited) recent.push(now)

  if (!hits.has(key) && hits.size >= MAX_TRACKED_KEYS) {
    const oldest = hits.keys().next().value
    if (oldest !== undefined) hits.delete(oldest)
  }
  hits.set(key, recent)
  return limited
}
