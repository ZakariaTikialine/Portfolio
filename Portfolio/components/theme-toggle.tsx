"use client"

import { useCallback, useEffect, useState } from "react"
import { Clock, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import {
  notifyThemeModeChange,
  persistThemeMode,
  readStoredThemeMode,
  resolveTimeBasedTheme,
  type ThemeMode,
} from "@/lib/theme-mode"

const MODE_SEQUENCE: ThemeMode[] = ["light", "auto", "dark"]
const MODE_ICONS = {
  light: Sun,
  auto: Clock,
  dark: Moon,
} satisfies Record<ThemeMode, typeof Sun>

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle = ({ className }: ThemeToggleProps = {}) => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mode, setMode] = useState<ThemeMode>("auto")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialMode = readStoredThemeMode()
    setMode(initialMode)
    setTheme(initialMode === "auto" ? resolveTimeBasedTheme() : initialMode)
    setMounted(true)
  }, [setTheme])

  const cycleMode = useCallback(() => {
    const currentIndex = MODE_SEQUENCE.indexOf(mode)
    const nextMode = MODE_SEQUENCE[(currentIndex + 1) % MODE_SEQUENCE.length]
    setMode(nextMode)
    persistThemeMode(nextMode)
    notifyThemeModeChange(nextMode)
    setTheme(nextMode === "auto" ? resolveTimeBasedTheme() : nextMode)
  }, [mode, setTheme])

  if (!mounted) return null

  const Icon = MODE_ICONS[mode]
  const label =
    mode === "auto"
      ? `Auto theme · currently ${resolvedTheme ?? "detecting"}`
      : `Switch theme · currently ${mode}`

  return (
    <motion.button
      type="button"
      onClick={cycleMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex items-center justify-center rounded-full border border-border/50 bg-background/80 p-2.5 shadow-lg backdrop-blur transition-colors hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        className,
      )}
      aria-label={label}
      title={label}
    >
      <motion.span
        key={mode}
        initial={{ opacity: 0, rotate: -15, scale: 0.85 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-foreground"
      >
        <Icon className="h-4 w-4" />
      </motion.span>
    </motion.button>
  )
}

export default ThemeToggle
