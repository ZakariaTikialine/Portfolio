import { profile } from "../../content/profile"

/**
 * Destinations an assistant answer may link to: this site, Zakaria's own email, and his own
 * profiles and projects (GitHub account, LinkedIn, employer and project sites, school), all taken
 * from content. A manipulated answer can therefore never carry a link to any other site.
 */
const ALLOWED_DESTINATIONS = [
  profile.links.github,
  profile.links.linkedin,
  profile.education.url,
  ...profile.experience.flatMap((role) => ("url" in role && role.url ? [role.url] : [])),
  ...profile.projects.flatMap((project) =>
    "live" in project && project.live ? [project.live.url] : [],
  ),
].map((url) => new URL(url))

export function isAllowedHref(href: string): boolean {
  // Same-site paths only; "//host" and "/\host" would resolve to another site.
  if (href.startsWith("/")) return !href.startsWith("//") && !href.startsWith("/\\")
  if (href === `mailto:${profile.email}`) return true
  let url: URL
  try {
    url = new URL(href)
  } catch {
    return false
  }
  if (url.protocol !== "https:" || url.username || url.password) return false
  const host = url.hostname.replace(/^www\./, "")
  return ALLOWED_DESTINATIONS.some(
    (allowed) =>
      host === allowed.hostname.replace(/^www\./, "") &&
      url.pathname.toLowerCase().startsWith(allowed.pathname.toLowerCase()),
  )
}
