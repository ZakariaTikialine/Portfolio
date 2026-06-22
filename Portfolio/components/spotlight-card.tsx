"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Spotlight radius in px */
  radius?: number
}

/**
 * Interactive card: a soft accent spotlight follows the cursor, the card lifts
 * and gains a cyan->violet glow on hover. Reusable across sections.
 */
export default function SpotlightCard({ children, className, radius = 340 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    el.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 backdrop-blur",
        "transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_45px_-12px] hover:shadow-accent/40",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
