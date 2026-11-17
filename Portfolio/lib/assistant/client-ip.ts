/**
 * The client IP used for rate limiting. Only the hosting platform's own header is trusted:
 * on Vercel, x-real-ip is set by the edge network and cannot be supplied by the visitor.
 * Everywhere else, headers such as X-Forwarded-For are client-controlled, so all requests share
 * one "untrusted" bucket instead of letting a spoofed header create a fresh one.
 */
export const UNTRUSTED_CLIENT = "untrusted"

export function rateLimitClientKey(
  headers: Headers,
  env: Record<string, string | undefined> = process.env,
): string {
  if (env.VERCEL === "1") {
    const ip = headers.get("x-real-ip")?.trim()
    if (ip) return ip
  }
  return UNTRUSTED_CLIENT
}
