"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { getExperienceContent } from "@/content/experience"
import type { Locale } from "@/navigation"

export default function Experience() {
  const locale = useLocale() as Locale
  const copy = getExperienceContent(locale)
  return (
    <section id="experience" className="relative overflow-hidden border-t border-border/40 py-24 px-4 md:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="mx-auto h-64 max-w-4xl bg-linear-to-r from-accent/15 via-transparent to-secondary/20 blur-3xl" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              {copy.subheading}
              <span className="h-1 w-6 bg-accent" />
            </span>
            <div className="text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</div>
            <p className="text-sm text-muted-foreground md:text-base">{copy.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {copy.facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-border/60 bg-background/70 p-4 text-center shadow-inner shadow-black/5">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{fact.label}</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{fact.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-linear-to-b from-accent via-border/60 to-transparent md:block" />

          <div className="space-y-10">
            {copy.entries.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/80 p-6 shadow-lg shadow-black/5 backdrop-blur-sm md:grid md:grid-cols-[auto_1fr] md:gap-8 md:p-10"
              >
                <div className="mb-6 flex items-center gap-4 md:mb-0 md:flex-col">
                  <span className="hidden h-4 w-4 rounded-full border-4 border-background bg-accent md:block" />
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 text-base font-semibold text-muted-foreground">
                    {idx + 1}
                  </span>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-accent">{exp.period}</p>
                      <h3 className="text-2xl font-semibold leading-tight">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-accent/40 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-base text-foreground/80">{exp.description}</p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {exp.metrics?.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-border/50 bg-muted/40 p-3 text-left">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{metric.label}</p>
                        <p className="mt-1 text-xl font-semibold text-foreground">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {exp.achievements.map((achievement, i) => (
                      <div
                        key={achievement}
                        className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm text-foreground/80"
                      >
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                          {copy.impactLabel} {i + 1}
                          <span className="h-px w-8 bg-accent/60" />
                        </div>
                        <p className="mt-2">{achievement}</p>
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
