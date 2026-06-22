"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { getExperienceContent } from "@/content/experience"
import type { Locale } from "@/navigation"

export default function Experience() {
  const locale = useLocale() as Locale
  const copy = getExperienceContent(locale)
  return (
    <section id="experience" className="relative overflow-hidden border-t border-border/40 py-12 px-6 md:py-20 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="mx-auto h-64 max-w-4xl bg-linear-to-r from-accent/15 via-transparent to-secondary/20 blur-3xl" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-3 sm:space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
              {copy.subheading}
              <span className="h-1 w-4 sm:w-6 bg-accent" />
            </span>
            <div className="text-gradient text-3xl sm:text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</div>
            <p className="text-xs sm:text-sm text-muted-foreground md:text-base">{copy.description}</p>
          </div>

          <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-4 grid-cols-3">
            {copy.facts.map((fact) => (
              <div key={fact.label} className="rounded-xl sm:rounded-2xl border border-border/60 bg-background/70 p-2 sm:p-4 text-center shadow-inner shadow-black/5">
                <p className="text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">{fact.label}</p>
                <p className="mt-1 sm:mt-2 text-lg sm:text-2xl font-semibold text-foreground">{fact.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-linear-to-b from-accent via-border/60 to-transparent md:block" />

          <div className="space-y-6 sm:space-y-10">
            {copy.entries.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-background/80 p-4 sm:p-5 shadow-lg shadow-black/5 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-accent/20 md:grid md:grid-cols-[auto_1fr] md:gap-6 md:p-8"
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

        {copy.community?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="space-y-2 sm:space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
                {copy.communityHeading}
                <span className="h-1 w-4 sm:w-6 bg-accent" />
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground md:text-base">{copy.communitySubtitle}</p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {copy.community.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-3 rounded-xl sm:rounded-2xl border border-border/60 bg-background/70 p-4 sm:p-5 shadow-sm shadow-black/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-accent/20"
                >
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent">{item.period}</p>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <p className="text-sm text-foreground/80">{item.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-accent/40 px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}
