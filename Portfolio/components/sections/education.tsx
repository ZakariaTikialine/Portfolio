"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { getEducationContent } from "@/content/education"
import type { Locale } from "@/navigation"

export default function Education() {
  const locale = useLocale() as Locale
  const copy = getEducationContent(locale)
  return (
    <section id="education" className="relative overflow-hidden border-t border-border/40 py-12 px-6 md:py-20 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="mx-auto mt-10 h-64 max-w-4xl bg-linear-to-r from-accent/10 via-secondary/5 to-transparent blur-3xl" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3 sm:space-y-5 text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-muted-foreground">
                {copy.badge}
                <span className="h-1 w-4 sm:w-6 bg-accent" />
              </span>
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-gradient text-3xl sm:text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</h2>
                <p className="text-sm sm:text-base text-muted-foreground md:text-lg">{copy.description}</p>
              </div>
            </div>

            <div className="grid gap-2 sm:gap-4 grid-cols-2">
              {copy.facts.map((fact) => (
                <div key={fact.label} className="rounded-xl sm:rounded-2xl border border-border/60 bg-background/70 p-3 sm:p-4 shadow-inner shadow-black/5 transition-colors hover:border-accent/50">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">{fact.label}</p>
                  <p className="mt-1 sm:mt-2 text-base sm:text-xl font-semibold text-foreground">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-linear-to-b from-accent via-border/60 to-transparent md:block" />

          <div className="space-y-6 sm:space-y-10">
            {copy.entries.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-xl sm:rounded-2xl border border-border/60 bg-background/80 p-4 sm:p-5 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-accent/20 md:grid md:grid-cols-[auto_1fr] md:gap-6 md:p-8"
              >
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3 md:mb-0 md:flex-col">
                  <span className="hidden h-4 w-4 rounded-full border-4 border-background bg-accent md:block" />
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-sm font-semibold text-muted-foreground">
                    {idx + 1}
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{edu.year}</p>
                      <h3 className="text-2xl font-semibold leading-snug">{edu.degree}</h3>
                      <p className="text-sm text-accent">{edu.institution}</p>
                    </div>
                    <span className="inline-flex items-center justify-center rounded-full border border-accent/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {edu.tag}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/80 md:text-base">{edu.details}</p>

                  <div className="grid gap-3 md:grid-cols-2">
                    {edu.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="rounded-2xl border border-border/50 bg-muted/30 p-4 text-sm text-foreground/80"
                      >
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          {copy.highlightLabel}
                          <span className="h-px w-8 bg-accent/60" />
                        </div>
                        <p className="mt-2">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
