"use client"

import { Menu, X } from "lucide-react"
import { useEffect, useId, useState } from "react"

interface MobileMenuProps {
  links: { href: string; label: string }[]
  openLabel: string
  closeLabel: string
}

export function MobileMenu({ links, openLabel, closeLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        className="inline-flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-s1"
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-rule bg-paper shadow-[0_12px_24px_-16px_rgb(0_0_0/0.35)]"
      >
        <ul className="container-page grid py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-rule py-3.5 text-base font-medium last:border-b-0"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
