import Image from "next/image"
import { ArrowDown, Download } from "lucide-react"
import { profile, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { ButtonLink } from "@/components/ui/button-link"
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
import { buildStackView } from "@/features/stack/build-stack"
import { LayerStack } from "@/features/stack/layer-stack"

interface HeroProps {
  locale: Locale
  dict: Dictionary
}

export function Hero({ locale, dict }: HeroProps) {
  const { hero, a11y } = dict
  const isArabic = locale === "ar"
  const name = isArabic ? profile.name.arabic : profile.name.latin

  return (
    <section aria-labelledby="hero-name" className="border-b border-rule">
      <div className="container-page grid items-center gap-12 pt-12 pb-16 md:pt-16 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-14 xl:gap-20">
        <div className="grid gap-6">
          <div className="flex items-center gap-3.5">
            <Image
              src={profile.portrait}
              alt={name}
              width={112}
              height={112}
              sizes="56px"
              priority
              className="size-14 rounded-full object-cover ring-1 ring-rule"
            />
            <p className="label">{hero.role}</p>
          </div>

          <h1 id="hero-name" className="grid gap-3">
            {isArabic ? (
              <span className="font-kufi text-[clamp(2.5rem,1.5rem+3.8vw,4rem)] leading-tight font-bold">
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
            <li className="flex items-center gap-2 font-medium text-ink">
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

        <LayerStack {...buildStackView(locale, dict)} />
      </div>
    </section>
  )
}
