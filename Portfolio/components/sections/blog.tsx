"use client"

import { BookOpen } from "lucide-react"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import { getBlogContent } from "@/content/blog"

const Blog = () => {
  const locale = useLocale() as Locale
  const copy = getBlogContent(locale)

  return (
    <section id="blog" className="relative overflow-hidden border-t border-border/40 py-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="mx-auto h-72 max-w-4xl bg-linear-to-r from-accent/15 via-transparent to-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-4 sm:gap-6 px-6 md:px-10 lg:px-12">
        <div className="space-y-3 sm:space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 sm:px-4 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
            {copy.badge}
            <span className="h-1 w-4 sm:w-6 bg-accent" />
          </span>
          <div>
            <h2 className="text-gradient text-3xl sm:text-4xl font-semibold">{copy.heading}</h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground">{copy.description}</p>
          </div>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-accent/40 bg-background/80 p-4 sm:p-5 shadow-lg shadow-black/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/20">
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent animate-pulse" />
            {copy.exploringLabel}
          </div>
          <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
            <p className="text-xl sm:text-2xl font-semibold">{copy.exploringTitle}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{copy.exploringSummary}</p>
          </div>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
            {copy.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border/50 px-2 sm:px-3 py-0.5 sm:py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-border/60 bg-background/70 p-4 sm:p-5 shadow-inner shadow-black/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <BookOpen size={16} className="text-accent sm:w-5 sm:h-5" />
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">{copy.prepLabel}</p>
              <p className="text-sm sm:text-base text-foreground">{copy.prepTitle}</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-dashed border-border/50 bg-muted/20 p-3 sm:p-5 text-xs sm:text-sm text-muted-foreground">
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
