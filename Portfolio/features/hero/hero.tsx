import { ArrowDown, Download } from "lucide-react"
import { profile, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { ButtonLink } from "@/components/ui/button-link"
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"

interface HeroProps {
  locale: Locale
  dict: Dictionary
}

export function Hero({ locale, dict }: HeroProps) {
  const { hero, a11y } = dict
  const isArabic = locale === "ar"

  return (
    <section aria-labelledby="hero-name" className="container-page pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="grid max-w-2xl gap-6">
        <p className="label">{hero.role}</p>

        <h1 id="hero-name" className="grid gap-3">
          {isArabic ? (
            <span className="font-kufi text-[clamp(2.25rem,1.4rem+3.6vw,3.75rem)] leading-tight font-bold">
              {profile.name.arabic}
            </span>
          ) : (
            <>
              <span className="text-display font-semibold font-stretch-[82%]">
                {profile.name.latin}
              </span>
              <span
                lang="ar"
                dir="rtl"
                className="justify-self-start font-kufi text-xl font-medium text-muted md:text-2xl"
              >
                {profile.name.arabic}
              </span>
            </>
          )}
        </h1>

        <p className="max-w-[46ch] text-lg text-muted">{hero.summary}</p>

        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full bg-ok" />
            {hero.availability}
          </li>
          <li>{hero.status}</li>
          <li>{hero.location}</li>
        </ul>

        <div className="flex flex-wrap items-center gap-2.5">
          <ButtonLink variant="primary" href={profile.links.cv} target="_blank" rel="noopener">
            <Download className="size-4" aria-hidden="true" />
            {hero.ctaCv}
          </ButtonLink>
          <ButtonLink href={`/${locale}#contact`}>
            {hero.ctaContact}
            <ArrowDown className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink
            variant="ghost"
            href={profile.links.github}
            target="_blank"
            rel="noopener"
            aria-label={`GitHub (${a11y.opensInNewTab})`}
            className="px-2.5"
          >
            <GitHubIcon className="size-[1.125rem]" />
          </ButtonLink>
          <ButtonLink
            variant="ghost"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener"
            aria-label={`LinkedIn (${a11y.opensInNewTab})`}
            className="px-2.5"
          >
            <LinkedInIcon className="size-[1.125rem]" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
