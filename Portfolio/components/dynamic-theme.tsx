"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

import {
  THEME_MODE_EVENT,
  THEME_MODE_STORAGE_KEY,
  readStoredThemeMode,
  resolveTimeBasedTheme,
  type ThemeMode,
} from "@/lib/theme-mode"

const AUTO_REFRESH_INTERVAL = 60_000

export default function DynamicTheme() {
  const { setTheme } = useTheme()

  useEffect(() => {
    const applyAutoTheme = () => {
      if (readStoredThemeMode() !== "auto") {
        return
      }

      setTheme(resolveTimeBasedTheme())
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== THEME_MODE_STORAGE_KEY) {
        return
      }

      applyAutoTheme()
    }

    const handleModeChange = (event: CustomEvent<ThemeMode>) => {
      if (event.detail === "auto") {
        applyAutoTheme()
      }
    }

    applyAutoTheme()
    const interval = window.setInterval(applyAutoTheme, AUTO_REFRESH_INTERVAL)

    window.addEventListener("storage", handleStorage)
    window.addEventListener(THEME_MODE_EVENT, handleModeChange)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener(THEME_MODE_EVENT, handleModeChange)
    }
  }, [setTheme])

  return null
}
