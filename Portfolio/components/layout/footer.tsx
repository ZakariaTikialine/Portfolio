import { profile, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { BrandMark } from "@/components/ui/brand-mark"
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"

interface FooterProps {
  locale: Locale
  dict: Dictionary
}

export function Footer({ locale, dict }: FooterProps) {
  const name = locale === "ar" ? profile.name.arabic : profile.name.latin
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-rule">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-sm text-muted">
          <BrandMark />
          <span>
            © {year} {name}. {dict.footer.rights}
          </span>
        </div>

        <ul className="flex items-center gap-1">
          <li>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener"
              aria-label={`GitHub (${dict.a11y.opensInNewTab})`}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-s1 hover:text-ink"
            >
              <GitHubIcon className="size-4" />
            </a>
          </li>
          <li>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener"
              aria-label={`LinkedIn (${dict.a11y.opensInNewTab})`}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-s1 hover:text-ink"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </li>
          <li>
            <a
              href={profile.links.source}
              target="_blank"
              rel="noopener"
              className="ms-2 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {dict.footer.source}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
