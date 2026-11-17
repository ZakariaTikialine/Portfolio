"use client"

import { useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { localeNames, locales, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/cn"

export function LocaleSwitcher({ label }: { label: string }) {
  const pathname = usePathname()
  const current = useLocale() as Locale

  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-lg border border-rule p-0.5">
        {locales.map((locale) => {
          const active = locale === current
          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
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
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
