"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/cn"

interface SectionNavProps {
  links: { id: string; href: string; label: string }[]
}

/** Data attribute on <html> holding the section currently in view; read by the language switcher. */
export const ACTIVE_SECTION_ATTRIBUTE = "data-section"

/**
 * Desktop navigation with scroll-spy: the section in the middle of the viewport is highlighted.
 * The URL is deliberately left alone while scrolling: rewriting the hash makes the router jump
 * to the anchor. The active section is recorded on <html> instead.
 */
export function SectionNav({ links }: SectionNavProps) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null)
    if (sections.length === 0) return

    const root = document.documentElement
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = links.find((link) => visible.has(link.id))?.id ?? null
        setActive(current)
        if (current) root.setAttribute(ACTIVE_SECTION_ATTRIBUTE, current)
        else root.removeAttribute(ACTIVE_SECTION_ATTRIBUTE)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      root.removeAttribute(ACTIVE_SECTION_ATTRIBUTE)
    }
  }, [links])

  return (
    <ul className="flex items-center gap-1 text-sm">
      {links.map((link) => {
        const isActive = active === link.id
        return (
          <li key={link.id}>
            <a
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 transition-colors",
                isActive ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-px h-px origin-center bg-trace transition-transform duration-300",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
