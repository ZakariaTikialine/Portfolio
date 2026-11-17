import type { Store } from "./store"

/**
 * Three layers, so bypassing one never runs up the bill:
 *  1. per client IP (only the platform-provided IP is trusted, see client-ip.ts)
 *  2. per session cookie
 *  3. a global daily budget of model calls and tokens; past it, visitors get the offline answer.
 * Fixed windows (per minute and per day) keep this to two cheap counters per layer.
 */
function envNumber(name: string, fallback: number): number {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

export const LIMITS = {
  ip: {
    perMinute: envNumber("ASSISTANT_IP_PER_MINUTE", 20),
    perDay: envNumber("ASSISTANT_IP_PER_DAY", 200),
  },
  session: { perMinute: 8, perDay: 60 },
  daily: {
    modelCalls: envNumber("ASSISTANT_DAILY_MODEL_CALLS", 800),
    tokens: envNumber("ASSISTANT_DAILY_TOKENS", 250_000),
  },
}

const MINUTE = 60
const DAY = 24 * 60 * 60

function windows(now: number) {
  return {
    minute: Math.floor(now / 1000 / MINUTE),
    day: Math.floor(now / 1000 / DAY),
  }
}

export type LimitScope = "ip" | "session"

export interface LimitResult {
  allowed: boolean
  scope?: LimitScope
  retryAfterSeconds?: number
}

export async function checkRequestLimits(
  store: Store,
  identity: { ip: string; session: string },
  now = Date.now(),
): Promise<LimitResult> {
  const { minute, day } = windows(now)
  const layers: [LimitScope, string, { perMinute: number; perDay: number }][] = [
    ["ip", identity.ip, LIMITS.ip],
    ["session", identity.session, LIMITS.session],
  ]
  for (const [scope, id, limit] of layers) {
    const [perMinute, perDay] = await Promise.all([
      store.increment(`rl:${scope}:${id}:m:${minute}`, MINUTE),
      store.increment(`rl:${scope}:${id}:d:${day}`, DAY),
    ])
    if (perMinute > limit.perMinute) {
      return {
        allowed: false,
        scope,
        retryAfterSeconds: MINUTE - (Math.floor(now / 1000) % MINUTE),
      }
    }
    if (perDay > limit.perDay) {
      return { allowed: false, scope, retryAfterSeconds: DAY - (Math.floor(now / 1000) % DAY) }
    }
  }
  return { allowed: true }
}

/** Reserves one model call from today's budget. False when the budget is spent. */
export async function reserveModelCall(store: Store, now = Date.now()): Promise<boolean> {
  const { day } = windows(now)
  const [calls, tokens] = await Promise.all([
    store.increment(`budget:calls:${day}`, DAY),
    store.get(`budget:tokens:${day}`),
  ])
  return calls <= LIMITS.daily.modelCalls && Number(tokens ?? 0) < LIMITS.daily.tokens
}

export async function recordTokens(store: Store, tokens: number, now = Date.now()) {
  if (tokens > 0) await store.increment(`budget:tokens:${windows(now).day}`, DAY, Math.ceil(tokens))
}
