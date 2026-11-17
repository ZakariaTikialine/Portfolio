import { profile, SECTIONS, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { Logo } from "@/components/ui/logo"
import { LocaleSwitcher } from "./locale-switcher"
import { MobileMenu } from "./mobile-menu"
import { SectionNav } from "./section-nav"
import { ThemeToggle } from "./theme-toggle"
import { DocumentIcon } from "@/components/ui/icons"

interface HeaderProps {
  locale: Locale
  dict: Dictionary
}

export function Header({ locale, dict }: HeaderProps) {
  const links = SECTIONS.map((id) => ({ id, href: `/${locale}#${id}`, label: dict.nav[id] }))

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <a
          href={`/${locale}`}
          aria-label={`${profile.name.latin}, ${dict.a11y.home}`}
          className="rounded-md py-1 text-[0.9375rem]"
        >
          <Logo />
        </a>

        <nav aria-label={dict.a11y.primaryNav} className="hidden lg:block">
          <SectionNav links={links} />
        </nav>

        <div className="flex items-center gap-1.5">
          <LocaleSwitcher label={dict.a11y.language} />
          <ThemeToggle label={dict.a11y.toggleTheme} />
          <a
            href={profile.links.cv}
            target="_blank"
            rel="noopener"
            className="ms-1 hidden h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-on-primary transition-[filter] hover:brightness-110 sm:inline-flex"
          >
            <DocumentIcon className="size-4" aria-hidden="true" />
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
