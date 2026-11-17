import { profile, SECTIONS, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { ExternalLink } from "@/components/ui/external-link"
import { ArrowUpIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
import { Logo } from "@/components/ui/logo"

interface FooterProps {
  locale: Locale
  dict: Dictionary
}

export function Footer({ locale, dict }: FooterProps) {
  const name = locale === "ar" ? profile.name.arabic : profile.name.latin
  const year = new Date().getFullYear()
  const iconLink =
    "inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card hover:text-ink"

  return (
    <footer className="border-t border-rule bg-paper-2">
      <div className="container-page grid gap-10 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="grid gap-3">
            <Logo className="text-base" />
            <p className="max-w-xs text-sm text-muted">{dict.hero.role}</p>
          </div>

          <nav>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-3">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`/${locale}#${id}`}
                    className="text-muted transition-colors hover:text-ink"
                  >
                    {dict.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <p className="text-sm text-muted">
            © {year} {name}. {dict.footer.rights}
          </p>

          <div className="flex items-center gap-1">
            <ExternalLink
              href={profile.links.github}
              newTabLabel={dict.a11y.opensInNewTab}
              className={iconLink}
              aria-label={`GitHub (${dict.a11y.opensInNewTab})`}
            >
              <GitHubIcon className="size-4" />
            </ExternalLink>
            <ExternalLink
              href={profile.links.linkedin}
              newTabLabel={dict.a11y.opensInNewTab}
              className={iconLink}
              aria-label={`LinkedIn (${dict.a11y.opensInNewTab})`}
            >
              <LinkedInIcon className="size-4" />
            </ExternalLink>
            <ExternalLink
              href={profile.links.source}
              newTabLabel={dict.a11y.opensInNewTab}
              className="mx-2 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {dict.footer.source}
            </ExternalLink>
            <a href="#top" className={iconLink} aria-label={dict.a11y.backToTop}>
              <ArrowUpIcon className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
