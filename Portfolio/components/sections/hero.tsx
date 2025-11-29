"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import TypingEffect from "@/components/typing-effect"
import CVDownloadSimple from "../cv-download-simple"
import { useLocale } from "next-intl"
import { useRouter } from "@/navigation"
import { getHeroContent } from "@/content/home"
import type { Locale } from "@/navigation"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

const Hero = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const locale = useLocale() as Locale
  const heroCopy = getHeroContent(locale)

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setParticles(newParticles)
  }, [])

  const router = useRouter()

  const handleClick = () => {
    router.push("/projects")
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-border/30 py-24 pt-28">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-accent"
            initial={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 6 + particle.size, repeat: Infinity, ease: "easeInOut", delay: particle.id * 0.05 }}
          />
        ))}
      </div>

      {/* Glowing gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/15 via-transparent to-secondary/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/60 px-5 py-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {heroCopy.badge}
              <span className="h-1 w-6 bg-accent" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">{heroCopy.name}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance md:text-6xl">
                <span className="block text-muted-foreground">{heroCopy.taglineLead}</span>
                <span className="mt-2 block text-foreground">
                  <TypingEffect text={heroCopy.typingLines.join("\n")} speed={50} />
                </span>
              </h1>
            </div>

            <p className="text-base text-muted-foreground md:text-lg">
              {heroCopy.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-start">
              <Button
                size="lg"
                className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90"
                onClick={handleClick}
              >
                {heroCopy.primaryCta}
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <CVDownloadSimple />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroCopy.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-background/80 p-4 text-left shadow-inner shadow-black/5">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[40px] border border-accent/20 blur-2xl" />
            <div className="relative rounded-4xl border border-border/60 bg-background/80 p-8 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="relative mx-auto h-40 w-40">
                <div className="absolute inset-0 rounded-full border-2 border-accent/40 opacity-70" />
                <img
                  src="/professional-developer-portrait.png"
                  alt="Zakaria TIKIALINE"
                  className="relative z-10 h-full w-full rounded-full border-2 border-accent/60 object-cover"
                />
                <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-background shadow-lg">
                  <Cpu size={16} />
                </div>
                <div className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-secondary" />
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 text-left">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{heroCopy.nowShippingTitle}</p>
                  <p className="mt-2 text-sm text-foreground/80">
                    {heroCopy.nowShippingDescription}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{heroCopy.focusTitle}</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                    {heroCopy.focusAreas.map((area) => (
                      <li key={area} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
