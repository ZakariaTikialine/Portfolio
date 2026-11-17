"use client"

import { useTheme } from "next-themes"
import { ContrastIcon } from "@/components/ui/icons"

/** A half-filled disc that turns 180° between navy and light. CSS picks the angle, so it never flashes. */
export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-card hover:text-ink"
    >
      <ContrastIcon className="size-[1.125rem] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] dark:rotate-180" />
    </button>
  )
}
