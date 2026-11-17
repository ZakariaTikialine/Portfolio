import type { AnchorHTMLAttributes, ReactNode } from "react"

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  /** Announced to screen readers after the link text, e.g. "opens in a new tab". */
  newTabLabel: string
  children: ReactNode
}

/** A link to another site: new tab, no opener, and a screen-reader hint about the new tab. */
export function ExternalLink({ href, newTabLabel, children, ...props }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  )
}
