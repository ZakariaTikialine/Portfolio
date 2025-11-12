"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import TypingEffect from "@/components/typing-effect"
import CVDownloadSimple from "../cv-download-simple"
import { useRouter } from "next/navigation"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

const Hero = () => {
  const [particles, setParticles] = useState<Particle[]>([])

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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-accent animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/10 via-transparent to-secondary/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {/* Profile image section */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            {/* Animated glow ring */}
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-accent via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
            <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-pulse" />

            {/* Profile image placeholder */}
            <img
              src="/professional-developer-portrait.png"
              alt="Zakaria TIKIALINE"
              className="relative z-10 w-full h-full rounded-full object-cover border-2 border-accent/50 shadow-lg"
            />

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent animate-pulse" />
            <div
              className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-secondary animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>

        <div className="mb-6 inline-block">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
            <Sparkles size={16} />
            Fullstack Developer, AI enthusiast & Data Scientist
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
          <span className="text-foreground block mb-4">
            <div className="whitespace-pre-line">
              <TypingEffect text={"Smart Systems.\nClean Code.\nReal Impact."} speed={50} />
            </div>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-4 text-balance max-w-2xl mx-auto leading-relaxed font-medium">
          Turning complex challenges into intelligent, elegant digital experiences.
        </p>

        <p className="text-base md:text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto leading-relaxed">
          Crafting fullstack solutions that merge backend precision, frontend creativity, and data-driven intelligence — all built with clean code and continuous curiosity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center p-4">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 cursor-pointer"
            onClick={handleClick}
          >
            View My Work
            <ArrowRight size={18} className="ml-2" />
          </Button>
          <CVDownloadSimple />
        </div>
      </div>
    </section>
  )
}

export default Hero
