"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Layers3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import { getProjectsContent } from "@/content/projects"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  deployment: string
  github: string
  demo: string
}

const Projects = () => {
  const locale = useLocale() as Locale
  const copy = getProjectsContent(locale)
  const projects = copy.projects as Project[]

  return (
    <section id="projects" className="relative overflow-hidden border-t border-border/40 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="mx-auto h-80 max-w-5xl bg-linear-to-r from-accent/15 via-transparent to-secondary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6 text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            {copy.badge}
            <span className="h-1 w-6 bg-accent" />
          </span>
          <div>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</h2>
            <p className="mt-3 text-base text-muted-foreground md:max-w-3xl">{copy.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {copy.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border/50 bg-background/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border/60 bg-background/80 p-4 text-center shadow-inner shadow-black/5">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 p-5 shadow-xl shadow-black/10 backdrop-blur"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="h-full w-full bg-linear-to-br from-accent/15 via-transparent to-secondary/20" />
              </div>

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-accent/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                    {project.deployment}
                  </span>
                  <span className="text-sm font-mono text-muted-foreground">#{String(project.id).padStart(2, "0")}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold leading-tight group-hover:text-accent">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                </div>

                <div className="grid gap-3 rounded-2xl border border-border/50 bg-muted/20 p-4">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <Layers3 size={14} />
                    {copy.stackLabel}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/80"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 rounded-full border-border/50 text-xs hover:bg-muted"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2">
                      <Github size={14} />
                      {copy.codeLabel}
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 rounded-full bg-accent text-xs text-accent-foreground hover:bg-accent/90"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2">
                      <ExternalLink size={14} />
                      {copy.demoLabel}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
