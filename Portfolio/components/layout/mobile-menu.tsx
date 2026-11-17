"use client"

import { useEffect, useId, useState } from "react"
import { CloseIcon, MenuIcon } from "@/components/ui/icons"

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
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        className="inline-flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-card"
      >
        {open ? (
          <CloseIcon className="size-5" aria-hidden="true" />
        ) : (
          <MenuIcon className="size-5" aria-hidden="true" />
        )}
      </button>

      <div
        id={panelId}
        data-open={open}
        inert={!open}
        className="invisible absolute inset-x-0 top-full -translate-y-2 border-b border-rule bg-paper/95 opacity-0 shadow-lift backdrop-blur-md transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] data-[open=true]:visible data-[open=true]:translate-y-0 data-[open=true]:opacity-100"
      >
        <ul className="container-page grid py-3">
          {links.map((link, index) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${60 + index * 35}ms` : "0ms" }}
              className="translate-y-1 opacity-0 transition-[opacity,transform] duration-300 in-data-[open=true]:translate-y-0 in-data-[open=true]:opacity-100"
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-rule py-4 text-lg font-medium"
              >
                {link.label}
                <span aria-hidden="true" className="size-1.5 rounded-[2px] bg-trace" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
