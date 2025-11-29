"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { getEducationContent } from "@/content/education"
import type { Locale } from "@/navigation"

export default function Education() {
  const locale = useLocale() as Locale
  const copy = getEducationContent(locale)
  return (
    <section id="education" className="relative overflow-hidden border-t border-border/40 py-24 px-4 md:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="mx-auto mt-10 h-64 max-w-4xl bg-linear-to-r from-accent/10 via-secondary/5 to-transparent blur-3xl" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                {copy.badge}
                <span className="h-1 w-6 bg-accent" />
              </span>
              <div className="space-y-3">
                <h2 className="text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</h2>
                <p className="text-base text-muted-foreground md:text-lg">{copy.description}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {copy.facts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-border/60 bg-background/70 p-4 shadow-inner shadow-black/5">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{fact.label}</p>
                  <p className="mt-2 text-xl font-semibold text-foreground">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-linear-to-b from-accent via-border/60 to-transparent md:block" />

          <div className="space-y-10">
            {copy.entries.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl border border-border/60 bg-background/80 p-6 shadow-lg shadow-black/5 backdrop-blur-sm md:grid md:grid-cols-[auto_1fr] md:gap-8 md:p-10"
              >
                <div className="mb-4 flex items-center gap-3 md:mb-0 md:flex-col">
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
