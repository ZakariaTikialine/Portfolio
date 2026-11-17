import Image from "next/image"
import { profile, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { ButtonLink } from "@/components/ui/button-link"
import { ArrowDownIcon, DocumentIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons"
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
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative isolate overflow-hidden border-b border-rule"
    >
      <div aria-hidden="true" className="blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute end-[-10%] -top-40 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <div className="container-page grid items-center gap-14 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-14 xl:gap-20">
        <div className="rise-stagger grid gap-7">
          <div className="flex items-center gap-3.5">
            <Image
              src={profile.portrait}
              alt={name}
              width={112}
              height={112}
              sizes="56px"
              priority
              className="size-14 rounded-full object-cover ring-2 ring-rule-strong ring-offset-2 ring-offset-paper"
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
              <DocumentIcon className="size-4" aria-hidden="true" />
              {hero.ctaCv}
            </ButtonLink>
            <ButtonLink href={`/${locale}#contact`} className="group">
              {hero.ctaContact}
              <ArrowDownIcon
                className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
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

        <div className="motion-safe:animate-rise motion-safe:[animation-delay:150ms]">
          <LayerStack {...buildStackView(locale, dict)} assistantLabel={dict.assistant.launcher} />
        </div>
      </div>
    </section>
  )
}
