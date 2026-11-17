"use client"

import type { MouseEvent } from "react"
import { useLocale } from "next-intl"
import { usePathname } from "@/i18n/navigation"
import { localeNames, locales, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/cn"
import { ACTIVE_SECTION_ATTRIBUTE } from "./section-nav"

/**
 * Switches language on the same page. The section in view (recorded by the section nav) is
 * carried over as an anchor, so the visitor stays where they were.
 */
export function LocaleSwitcher({ label }: { label: string }) {
  const pathname = usePathname()
  const current = useLocale() as Locale
  const suffix = pathname === "/" ? "" : pathname

  const switchTo = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const section = document.documentElement.getAttribute(ACTIVE_SECTION_ATTRIBUTE)
    // A full document load is intentional: the new page needs a fresh <html lang dir>, and the
    // cross-document view transition fades between languages.
    window.location.assign(section ? `${href}#${section}` : href)
  }

  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-lg border border-rule p-0.5">
        {locales.map((locale) => {
          const active = locale === current
          const href = `/${locale}${suffix}`
          return (
            <li key={locale}>
              <a
                href={href}
                onClick={
                  active ? (event) => event.preventDefault() : (event) => switchTo(event, href)
                }
                lang={locale}
                hrefLang={locale}
                title={localeNames[locale]}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "block rounded-md px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase transition-colors",
                  active ? "bg-ink text-paper" : "text-muted hover:text-ink",
                )}
              >
                <span className="sr-only">{localeNames[locale]}</span>
                <span aria-hidden="true">{locale}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
