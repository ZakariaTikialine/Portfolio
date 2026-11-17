/**
 * Absolute origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in Vercel once the final domain
 * is live; until then Vercel's production URL is used, so changing domains needs no code change.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, "")

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercelProduction) return `https://${vercelProduction}`

  return "http://localhost:3000"
}

export const siteUrl = resolveSiteUrl()
