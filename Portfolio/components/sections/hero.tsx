"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Cpu } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import TypingEffect from "@/components/typing-effect"
import SpotlightCard from "@/components/spotlight-card"
import CVDownloadSimple from "../cv-download-simple"
import { useLocale } from "next-intl"
import { useRouter } from "@/navigation"
import { getHeroContent } from "@/content/home"
import type { Locale } from "@/navigation"

const Hero = () => {
  const locale = useLocale() as Locale
  const heroCopy = getHeroContent(locale)
  const router = useRouter()

  const handleClick = () => {
    router.push("/projects")
  }

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden border-b border-border/30 py-10 md:py-14">
      {/* Local soft glow (global aurora lives in the layout) */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-secondary/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-6 md:px-10 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/60 px-5 py-2 text-xs uppercase tracking-[0.4em] text-muted-foreground backdrop-blur">
              {heroCopy.badge}
              <span className="h-1 w-6 bg-linear-to-r from-accent to-secondary" />
            </div>

            <div>
              {heroCopy.name ? (
                <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{heroCopy.name}</p>
              ) : null}
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-5xl">
                <span className="block text-muted-foreground">{heroCopy.taglineLead}</span>
                <span className="mt-2 block">
                  <TypingEffect className="text-gradient" text={heroCopy.typingLines.join("\n")} speed={50} />
                </span>
              </h1>
            </div>

            <p className="mx-auto max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
              {heroCopy.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                className="group rounded-full bg-accent px-6 text-sm text-accent-foreground transition-shadow hover:bg-accent/90 hover:shadow-[0_8px_30px_-8px] hover:shadow-accent/60 sm:px-8 sm:text-base"
                onClick={handleClick}
              >
                {heroCopy.primaryCta}
                <ArrowRight size={16} className="ms-1 transition-transform group-hover:translate-x-1 sm:ms-2 sm:size-[18px] rtl:rotate-180" />
              </Button>
              <CVDownloadSimple />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {heroCopy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-border/60 bg-background/80 p-3 text-left shadow-inner shadow-black/5 transition-colors hover:border-accent/50"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[11px] sm:tracking-[0.25em]">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground sm:text-[11px]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[34px] bg-linear-to-br from-accent/20 to-secondary/20 opacity-60 blur-2xl sm:-inset-6" />
            <SpotlightCard className="rounded-3xl p-5 shadow-2xl shadow-black/20 sm:p-6">
              <div className="relative mx-auto h-24 w-24 sm:h-32 sm:w-32">
                <div className="absolute inset-0 rounded-full border-2 border-accent/40 opacity-70" />
                <Image
                  src="/professional-developer-portrait.png"
                  alt="Zakaria TIKIALINE"
                  width={160}
                  height={160}
                  priority
                  className="relative z-10 h-full w-full rounded-full border-2 border-accent/60 object-cover"
                />
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-background shadow-lg sm:-right-3 sm:-top-3 sm:h-8 sm:w-8">
                  <Cpu size={12} className="sm:h-4 sm:w-4" />
                </div>
                <div className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full bg-secondary sm:-bottom-2 sm:-left-2 sm:h-5 sm:w-5" />
              </div>

              <div className="mt-5 space-y-3 sm:mt-6">
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-3 text-left sm:p-4">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs sm:tracking-[0.35em]">
                    {heroCopy.nowShippingTitle}
                  </p>
                  <p className="mt-1 text-xs text-foreground/80 sm:mt-2 sm:text-sm">{heroCopy.nowShippingDescription}</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-3 sm:p-4">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs sm:tracking-[0.35em]">
                    {heroCopy.focusTitle}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-foreground/80 sm:mt-3 sm:space-y-1.5">
                    {heroCopy.focusAreas.map((area) => (
                      <li key={area} className="flex min-w-0 items-start gap-1.5">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="break-words">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)
