"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Brain, Cloud, Code2, Database, Globe, Server, Users2 } from "lucide-react"
import { useLocale } from "next-intl"
import { getSkillsContent } from "@/content/skills"
import type { Locale } from "@/navigation"

const iconMap = {
  globe: Globe,
  code: Code2,
  server: Server,
  brain: Brain,
  database: Database,
  users: Users2,
  cloud: Cloud,
}

const Skills = () => {
  const locale = useLocale() as Locale
  const copy = getSkillsContent(locale)

  return (
    <section id="skills" className="relative overflow-hidden border-t border-border/40 py-12 px-6 md:py-20 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="mx-auto h-72 max-w-4xl bg-linear-to-r from-accent/15 via-transparent to-secondary/20 blur-3xl" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2 sm:space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
              {copy.badge}
              <span className="h-1 w-4 sm:w-6 bg-accent" />
            </span>
            <div className="text-3xl sm:text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</div>
            <p className="text-xs sm:text-sm text-muted-foreground md:text-base">{copy.description}</p>
          </div>
          <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-3 grid-cols-3">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl sm:rounded-2xl border border-border/60 bg-background/80 p-2 sm:p-4 text-center shadow-inner shadow-black/5">
                <p className="text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-muted-foreground">{stat.label}</p>
                <p className="mt-1 sm:mt-2 text-lg sm:text-2xl font-semibold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 sm:mt-4 grid gap-3 sm:gap-4 lg:grid-cols-3">
            {copy.focusTracks.map((track) => (
              <div key={track.title} className="rounded-xl sm:rounded-2xl border border-border/60 bg-background/85 p-3 sm:p-4 text-left shadow-lg shadow-black/5">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
                  {copy.focusLabel}
                  <ArrowUpRight size={10} className="sm:w-3 sm:h-3" />
                </div>
                <h3 className="mt-1.5 sm:mt-2 text-base sm:text-xl font-semibold">{track.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{track.detail}</p>
                <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-accent">{track.stack}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/60 bg-background/85 shadow-xl shadow-black/10"
        >
          <div className="hidden items-center gap-4 border-b border-border/35 bg-background/70 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground md:grid md:grid-cols-[220px_1fr]">
            <span className="inline-flex items-center gap-2">
              {copy.blockLabel}
              <span className="h-px w-8 bg-accent" />
            </span>
            <span className="inline-flex items-center gap-2">
              {copy.stackLabel}
              <span className="h-px w-8 bg-accent" />
            </span>
          </div>

          <div className="divide-y divide-border/40">
            {copy.technicalBlocks.map((section, idx) => {
              const Icon = iconMap[section.icon as keyof typeof iconMap] || Globe
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  viewport={{ once: true }}
                  className="grid gap-4 px-4 py-5 md:grid-cols-[220px_1fr] md:px-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent leading-none">
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                          {copy.blockIndexLabel} #{idx + 1}
                        </p>
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{section.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <p className="mb-1 w-full text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground md:hidden">
                      {copy.stackLabel}
                    </p>
                    {section.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] font-semibold text-foreground/80"
                      >
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/60 bg-background/90 p-5 shadow-lg shadow-black/5"
          >
            <h3 className="text-xl font-semibold">{copy.transversalTitle}</h3>
            <p className="text-sm text-muted-foreground">{copy.transversalSubtitle}</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              {copy.transversal.map((skill) => (
                <li key={skill} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/60 bg-background/90 p-5 shadow-lg shadow-black/5"
          >
            <h3 className="text-xl font-semibold">{copy.certificationsTitle}</h3>
            <p className="text-sm text-muted-foreground">{copy.certificationsSubtitle}</p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              {copy.certifications.map((cert) => (
                <li key={cert} className="rounded-2xl border border-border/50 bg-muted/30 px-4 py-3">
                  <div className="text-sm font-medium">{cert}</div>
                  <div className="text-xs text-muted-foreground">{copy.certificationsNote}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
