"use client"

import { useLocale } from "next-intl"
import { getAboutContent } from "@/content/about"
import type { Locale } from "@/navigation"

const About = () => {
  const locale = useLocale() as Locale
  const copy = getAboutContent(locale)
  return (
    <section id="about" className="relative overflow-hidden border-t border-border/40 py-20 px-6 md:py-28 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="mx-auto h-72 max-w-4xl bg-linear-to-r from-accent/5 via-transparent to-secondary/10 blur-3xl" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-10">
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {copy.badge}
            <span className="h-1 w-6 bg-accent" />
          </span>
          <div>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">{copy.description}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-lg shadow-black/5 backdrop-blur-sm md:p-6">
            <div className="space-y-5 text-foreground/80 leading-relaxed">
              {copy.story.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">{copy.exploringLabel}</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                  {copy.exploringItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-lg shadow-black/5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">{copy.principlesLabel}</p>
              <ul className="mt-4 space-y-3 text-foreground/80">
                {copy.principles.map((principle, idx) => (
                  <li key={principle} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-xs font-semibold text-accent">
                      {idx + 1}
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-lg shadow-black/5 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">{copy.highlightsLabel}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {copy.highlights.map((highlight) => (
                  <div key={highlight.detail} className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-center">
                    <div className="text-3xl font-semibold text-accent">{highlight.value}</div>
                    <p className="text-xs text-muted-foreground">{highlight.detail}</p>
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
