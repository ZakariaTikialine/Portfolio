/**
 * Small key-value store for rate limits, budgets and conversation history.
 *
 * With Upstash Redis configured (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, or the
 * KV_REST_API_URL / KV_REST_API_TOKEN names set by Vercel's Marketplace integration) limits are
 * shared across all serverless instances. Without it, an in-memory store keeps everything working
 * per instance; a warning is logged once so the gap is visible in the deployment logs.
 * Talks to Upstash's REST API directly, so no client library is needed.
 */
export interface Store {
  /** Increments a counter and starts its expiry on first use. Returns the new value. */
  increment(key: string, ttlSeconds: number, by?: number): Promise<number>
  get(key: string): Promise<string | null>
  set(key: string, value: string, ttlSeconds: number): Promise<void>
  delete(key: string): Promise<void>
}

class MemoryStore implements Store {
  private entries = new Map<string, { value: string; expiresAt: number }>()
  private static readonly MAX_KEYS = 20_000

  private read(key: string): string | null {
    const entry = this.entries.get(key)
    if (!entry) return null
    if (entry.expiresAt <= Date.now()) {
      this.entries.delete(key)
      return null
    }
    return entry.value
  }

  private write(key: string, value: string, ttlSeconds: number, keepExpiry = false) {
    const existing = this.entries.get(key)
    const expiresAt =
      keepExpiry && existing && existing.expiresAt > Date.now()
        ? existing.expiresAt
        : Date.now() + ttlSeconds * 1000
    if (!existing && this.entries.size >= MemoryStore.MAX_KEYS) {
      const oldest = this.entries.keys().next().value
      if (oldest !== undefined) this.entries.delete(oldest)
    }
    this.entries.set(key, { value, expiresAt })
  }

  async increment(key: string, ttlSeconds: number, by = 1) {
    const next = Number(this.read(key) ?? 0) + by
    this.write(key, String(next), ttlSeconds, true)
    return next
  }

  async get(key: string) {
    return this.read(key)
  }

  async set(key: string, value: string, ttlSeconds: number) {
    this.write(key, value, ttlSeconds)
  }

  async delete(key: string) {
    this.entries.delete(key)
  }
}

class UpstashStore implements Store {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  private async pipeline(commands: (string | number)[][]): Promise<unknown[]> {
    const response = await fetch(`${this.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      signal: AbortSignal.timeout(2_000),
      cache: "no-store",
    })
    if (!response.ok) throw new Error(`Upstash responded ${response.status}`)
    const results = (await response.json()) as { result?: unknown; error?: string }[]
    const failed = results.find((item) => item.error)
    if (failed) throw new Error("Upstash command failed")
    return results.map((item) => item.result)
  }

  async increment(key: string, ttlSeconds: number, by = 1) {
    const [value] = await this.pipeline([
      ["INCRBY", key, by],
      ["EXPIRE", key, ttlSeconds, "NX"],
    ])
    return Number(value)
  }

  async get(key: string) {
    const [value] = await this.pipeline([["GET", key]])
    return typeof value === "string" ? value : null
  }

  async set(key: string, value: string, ttlSeconds: number) {
    await this.pipeline([["SET", key, value, "EX", ttlSeconds]])
  }

  async delete(key: string) {
    await this.pipeline([["DEL", key]])
  }
}

/** Uses Upstash when it answers; if it fails mid-request, falls back to memory for that call. */
class ResilientStore implements Store {
  constructor(
    private readonly primary: Store,
    private readonly fallback: Store,
  ) {}

  private async run<T>(operation: (store: Store) => Promise<T>): Promise<T> {
    try {
      return await operation(this.primary)
    } catch {
      console.error("[assistant] shared store unavailable, using in-memory fallback")
      return operation(this.fallback)
    }
  }

  increment(key: string, ttlSeconds: number, by?: number) {
    return this.run((store) => store.increment(key, ttlSeconds, by))
  }
  get(key: string) {
    return this.run((store) => store.get(key))
  }
  set(key: string, value: string, ttlSeconds: number) {
    return this.run((store) => store.set(key, value, ttlSeconds))
  }
  delete(key: string) {
    return this.run((store) => store.delete(key))
  }
}

let instance: Store | undefined

export function getStore(): Store {
  if (instance) return instance
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN
  const memory = new MemoryStore()
  if (url && token) {
    instance = new ResilientStore(new UpstashStore(url.replace(/\/$/, ""), token), memory)
  } else {
    if (process.env.VERCEL === "1") {
      console.warn("[assistant] Upstash not configured: rate limits are per instance only")
    }
    instance = memory
  }
  return instance
}

/** A fresh in-memory store, for tests. */
export function createMemoryStore(): Store {
  return new MemoryStore()
}
