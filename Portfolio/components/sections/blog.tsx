"use client"

import { BookOpen } from "lucide-react"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import { getBlogContent } from "@/content/blog"

const Blog = () => {
  const locale = useLocale() as Locale
  const copy = getBlogContent(locale)

  return (
    <section id="blog" className="relative overflow-hidden border-t border-border/40 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="mx-auto h-72 max-w-4xl bg-linear-to-r from-accent/15 via-transparent to-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-10 lg:px-12">
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            {copy.badge}
            <span className="h-1 w-6 bg-accent" />
          </span>
          <div>
            <h2 className="text-4xl font-semibold">{copy.heading}</h2>
            <p className="mt-2 text-base text-muted-foreground">{copy.description}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-accent/40 bg-background/80 p-5 shadow-lg shadow-black/10 backdrop-blur">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {copy.exploringLabel}
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-2xl font-semibold">{copy.exploringTitle}</p>
            <p className="text-sm text-muted-foreground">{copy.exploringSummary}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            {copy.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border/50 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-background/70 p-5 shadow-inner shadow-black/10">
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-accent" />
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">{copy.prepLabel}</p>
              <p className="text-base text-foreground">{copy.prepTitle}</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-border/50 bg-muted/20 p-5 text-sm text-muted-foreground">
            {copy.prepBody}
          </div>

          {/*
          <article className="mt-5 rounded-2xl border border-border/50 p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Machine Learning Fundamentals</span>
              <span>8 min read</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold">From Theory to Practice</h3>
            <p className="text-sm text-muted-foreground">A future deep dive once experiments stabilize.</p>
            <ArrowRight className="mt-3 h-4 w-4 text-muted-foreground" />
          </article>
          */}
        </div>
      </div>
    </section>
  )
}

export default Blog
