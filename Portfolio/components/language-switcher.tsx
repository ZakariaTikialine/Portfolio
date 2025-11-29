"use client"

import { useTransition } from "react"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { locales, usePathname, useRouter } from "@/navigation"

interface LanguageSwitcherProps {
  className?: string
  onSelect?: () => void
}

export default function LanguageSwitcher({ className, onSelect }: LanguageSwitcherProps) {
  const locale = useLocale()
  const t = useTranslations("a11y")
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
      onSelect?.()
    })
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/70 p-1 text-[11px] font-semibold uppercase",
        className,
      )}
      role="group"
      aria-label={t("languageSwitcher")}
    >
      {locales.map((availableLocale) => (
        <button
          key={availableLocale}
          type="button"
          onClick={() => handleChange(availableLocale)}
          disabled={isPending && availableLocale === locale}
          className={cn(
            "cursor-pointer rounded-full px-3 py-1.5 transition-all",
            availableLocale === locale
              ? "bg-accent text-accent-foreground shadow"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={availableLocale === locale ? "true" : "false"}
        >
          {availableLocale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
