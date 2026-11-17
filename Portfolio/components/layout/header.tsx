import { Download } from "lucide-react"
import { profile, SECTIONS, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { BrandMark } from "@/components/ui/brand-mark"
import { LocaleSwitcher } from "./locale-switcher"
import { MobileMenu } from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  locale: Locale
  dict: Dictionary
}

export function Header({ locale, dict }: HeaderProps) {
  const name = locale === "ar" ? profile.name.arabic : profile.name.latin
  const links = SECTIONS.map((id) => ({ href: `/${locale}#${id}`, label: dict.nav[id] }))

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <a href={`/${locale}`} className="flex items-center gap-2.5 text-sm font-semibold">
          <BrandMark />
          <span>{name}</span>
        </a>

        <nav aria-label={dict.a11y.primaryNav} className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <LocaleSwitcher label={dict.a11y.language} />
          <ThemeToggle label={dict.a11y.toggleTheme} />
          <a
            href={profile.links.cv}
            target="_blank"
            rel="noopener"
            className="hidden h-9 items-center gap-2 rounded-lg bg-s4 px-3 text-sm font-medium text-on-s4 transition-[filter] hover:brightness-110 sm:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            {dict.hero.ctaCv}
          </a>
          <MobileMenu
            links={[...links, { href: profile.links.cv, label: dict.hero.ctaCv }]}
            openLabel={dict.a11y.openMenu}
            closeLabel={dict.a11y.closeMenu}
          />
        </div>
      </div>
    </header>
  )
}
