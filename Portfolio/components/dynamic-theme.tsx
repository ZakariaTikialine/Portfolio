"use client"

import { useEffect } from "react"

export default function DynamicTheme() {
  useEffect(() => {
    const updateThemeByTime = () => {
      const hour = new Date().getHours()
      const isDarkTime = hour < 6 || hour > 18

      if (isDarkTime && !document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark")
        localStorage.theme = "dark"
      } else if (!isDarkTime && document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark")
        localStorage.theme = "light"
      }
    }

    updateThemeByTime()
    const interval = setInterval(updateThemeByTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return null
}
