import { Fragment, type ReactNode } from "react"
import { profile } from "@/content/profile"

/**
 * Renders the small Markdown subset the assistant is allowed to use: paragraphs, "- " lists,
 * **bold** and [links](url). Everything else stays plain text, so model output can never inject
 * HTML. Links are limited to site paths and https URLs.
 */

/**
 * Bold, Markdown links (an empty target is tolerated), "[/en#work]" and bare "/en#work" paths.
 * The last two are recovered as proper links, since models occasionally slip on the format.
 */
const INLINE =
  /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]*\)|\[\/(?:en|fr|ar)#[a-z]+\]|(?<![\w/])\/(?:en|fr|ar)#[a-z]+)/g
const SITE_PATH = /^\/(?:en|fr|ar)#([a-z]+)$/

const linkClass =
  "font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"

/**
 * External destinations an answer may link to: Zakaria's own profiles and projects, all taken
 * from content. A manipulated answer therefore can't plant a link to any other site.
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

function isSafeHref(href: string): boolean {
  // Same-site paths only; "//host" would be an external, protocol-relative URL.
  if (href.startsWith("/")) return !href.startsWith("//")
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

interface InlineOptions {
  sectionLabels: Record<string, string>
  onInternalLink?: () => void
}

function siteLink(path: string, key: number, label: string | undefined, options: InlineOptions) {
  const section = SITE_PATH.exec(path)?.[1]
  return (
    <a key={key} href={path} onClick={options.onInternalLink} className={linkClass}>
      {label && !label.startsWith("/")
        ? label
        : ((section && options.sectionLabels[section]) ?? path)}
    </a>
  )
}

function renderInline(text: string, options: InlineOptions): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (SITE_PATH.test(part)) return siteLink(part, index, undefined, options)

    const link = /^\[([^\]]+)\](?:\(([^)\s]*)\))?$/.exec(part)
    if (link) {
      const [, label = "", rawHref = ""] = link
      // "[/ar#contact]()" or "[/fr#skills]": the label is the path.
      const href = rawHref || (SITE_PATH.test(label) ? label : "")
      if (SITE_PATH.test(href)) return siteLink(href, index, label, options)
      if (!href || !isSafeHref(href)) return <Fragment key={index}>{label}</Fragment>
      const external = href.startsWith("https://") || href.startsWith("mailto:")
      return (
        <a
          key={index}
          href={href}
          onClick={external ? undefined : options.onInternalLink}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={linkClass}
        >
          {label}
        </a>
      )
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}

interface RichTextProps {
  text: string
  /** Section names in the visitor's language, used to label recovered site links. */
  sectionLabels: Record<string, string>
  onInternalLink?: () => void
}

export function RichText({ text, sectionLabels, onInternalLink }: RichTextProps) {
  const options: InlineOptions = { sectionLabels, onInternalLink }
  const blocks = text.trim().split(/\n{2,}/)

  return (
    <div className="grid gap-2.5">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").filter((line) => line.trim() !== "")
        const isList = lines.length > 0 && lines.every((line) => /^\s*([-*•]|\d+\.)\s+/.test(line))
        if (isList) {
          return (
            <ul key={blockIndex} className="grid gap-1.5">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] size-1.5 shrink-0 rounded-[2px] bg-trace"
                  />
                  <span>{renderInline(line.replace(/^\s*([-*•]|\d+\.)\s+/, ""), options)}</span>
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={blockIndex}>
            {lines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {renderInline(line, options)}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}
