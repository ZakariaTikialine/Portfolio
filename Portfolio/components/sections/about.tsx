"use client"

import { useLocale } from "next-intl"
import { getAboutContent } from "@/content/about"
import type { Locale } from "@/navigation"

const About = () => {
  const locale = useLocale() as Locale
  const copy = getAboutContent(locale)
  return (
    <section id="about" className="relative overflow-hidden border-t border-border/40 py-12 px-6 md:py-20 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="mx-auto h-72 max-w-4xl bg-linear-to-r from-accent/5 via-transparent to-secondary/10 blur-3xl" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 sm:px-4 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
            {copy.badge}
            <span className="h-1 w-4 sm:w-6 bg-accent" />
          </span>
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground md:text-lg">{copy.description}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border/60 bg-background/80 p-4 sm:p-5 shadow-lg shadow-black/5 backdrop-blur-sm md:p-6">
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-foreground/80 leading-relaxed">
              {copy.story.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-3 sm:p-5">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground">{copy.exploringLabel}</p>
                <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground/80">
                  {copy.exploringItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-4 sm:p-5 shadow-lg shadow-black/5 backdrop-blur-sm">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground">{copy.principlesLabel}</p>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground/80">
                {copy.principles.map((principle, idx) => (
                  <li key={principle} className="flex items-start gap-2 sm:gap-3">
                    <span className="mt-0.5 sm:mt-1 inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/15 text-[10px] sm:text-xs font-semibold text-accent">
                      {idx + 1}
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/80 p-4 sm:p-5 shadow-lg shadow-black/5 backdrop-blur-sm">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground">{copy.highlightsLabel}</p>
              <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3 grid-cols-3">
                {copy.highlights.map((highlight) => (
                  <div key={highlight.detail} className="rounded-xl sm:rounded-2xl border border-border/60 bg-muted/20 p-2 sm:p-4 text-center">
                    <div className="text-xl sm:text-3xl font-semibold text-accent">{highlight.value}</div>
                    <p className="text-[9px] sm:text-xs text-muted-foreground">{highlight.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
