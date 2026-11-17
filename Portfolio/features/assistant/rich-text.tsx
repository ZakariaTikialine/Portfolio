import { Fragment, type ReactNode } from "react"
import { profile } from "@/content/profile"
import { isAllowedHref } from "@/lib/assistant/links"
import { stripImageMarkdown } from "@/lib/assistant/output-check"

/**
 * Renders the small Markdown subset the assistant is allowed to use: paragraphs, "- " lists,
 * **bold** and [links](url). Everything else stays plain text and React escapes it, so model
 * output can never inject HTML. Links go only to allowlisted destinations (lib/assistant/links.ts)
 * and open with rel="noopener noreferrer"; Markdown images are stripped.
 */

/** The owner's email, escaped for use inside a regular expression. */
const EMAIL = profile.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * Bold, Markdown links (an empty target is tolerated), "[/en#work]", bare "/en#work" paths, bare
 * https URLs (ending before trailing punctuation) and the owner's plain-text email. Paths and
 * allowlisted URLs are recovered as proper links, since models occasionally slip on the format.
 */
const INLINE = new RegExp(
  String.raw`(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]*\)|\[\/(?:en|fr|ar)#[a-z]+\]|(?<![\w/])\/(?:en|fr|ar)#[a-z]+|https:\/\/[^\s<>()\[\]]*[^\s<>()\[\].,;:!?'"]|` +
    EMAIL +
    ")",
  "g",
)
const SITE_PATH = /^\/(?:en|fr|ar)#([a-z]+)$/
const BARE_URL = /^https:\/\/\S+$/

/** "https://github.com/user/" → "github.com/user" for display. */
const displayUrl = (href: string) => href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")

const linkClass =
  "font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"

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
    if (part === profile.email) {
      return (
        <a key={index} href={`mailto:${part}`} dir="ltr" className={linkClass}>
          {part}
        </a>
      )
    }
    if (BARE_URL.test(part)) {
      // Only allowlisted destinations become links; anything else stays inert text.
      if (!isAllowedHref(part)) return <Fragment key={index}>{part}</Fragment>
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
          className={linkClass}
        >
          {displayUrl(part)}
        </a>
      )
    }

    const link = /^\[([^\]]+)\](?:\(([^)\s]*)\))?$/.exec(part)
    if (link) {
      const [, label = "", rawHref = ""] = link
      // "[/ar#contact]()" or "[/fr#skills]": the label is the path.
      const href = rawHref || (SITE_PATH.test(label) ? label : "")
      if (SITE_PATH.test(href)) return siteLink(href, index, label, options)
      if (!href || !isAllowedHref(href)) return <Fragment key={index}>{label}</Fragment>
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
  const blocks = stripImageMarkdown(text)
    .trim()
    .split(/\n{2,}/)

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
                    className="mt-[0.6em] size-1.5 shrink-0 rounded-xs bg-trace"
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
