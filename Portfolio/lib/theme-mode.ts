export type ThemeMode = "light" | "dark" | "auto"

export const THEME_MODE_STORAGE_KEY = "portfolio-theme-mode"
export const THEME_MODE_EVENT = "portfolio-theme-mode-change"

export const resolveTimeBasedTheme = (date = new Date()): "light" | "dark" => {
  const hour = date.getHours()
  return hour < 6 || hour >= 18 ? "dark" : "light"
}

export const readStoredThemeMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "auto"
  }

  const stored = window.localStorage.getItem(THEME_MODE_STORAGE_KEY) as ThemeMode | null
  return stored ?? "auto"
}

export const persistThemeMode = (mode: ThemeMode) => {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(THEME_MODE_STORAGE_KEY, mode)
}

export const notifyThemeModeChange = (mode: ThemeMode) => {
  if (typeof window === "undefined") {
    return
  }

  window.dispatchEvent(
    new CustomEvent<ThemeMode>(THEME_MODE_EVENT, {
      detail: mode,
    }),
  )
}

declare global {
  interface WindowEventMap {
    "portfolio-theme-mode-change": CustomEvent<ThemeMode>
  }
}

export {}
