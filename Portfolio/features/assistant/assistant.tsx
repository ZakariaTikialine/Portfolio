"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Dictionary } from "@/content/types"
import type { Locale } from "@/i18n/routing"
import { ChatIcon } from "@/components/ui/icons"

/** The chat panel's code is only downloaded the first time the assistant is opened. */
const AssistantPanel = dynamic(() => import("./assistant-panel"), { ssr: false })

/** Dispatch this on window to open the assistant from anywhere on the page. */
export const OPEN_ASSISTANT_EVENT = "assistant:open"

interface AssistantProps {
  locale: Locale
  labels: Dictionary["assistant"]
  sectionLabels: Dictionary["nav"]
  email: string
}

export function Assistant({ locale, labels, sectionLabels, email }: AssistantProps) {
  const [open, setOpen] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_ASSISTANT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, onOpen)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    // Return focus to where the visitor started.
    requestAnimationFrame(() => launcherRef.current?.focus())
  }, [])

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={labels.launcher}
        hidden={open}
        className="group fixed end-4 bottom-4 z-40 flex items-center gap-2.5 rounded-full border border-rule-strong bg-card/90 p-3 text-sm font-medium text-ink shadow-lift backdrop-blur-md transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/60 motion-safe:animate-rise motion-safe:[animation-delay:1.2s] sm:end-5 sm:bottom-5 sm:py-2.5 sm:ps-3 sm:pe-4"
      >
        <span className="relative grid size-7 place-items-center rounded-full bg-primary text-on-primary">
          <ChatIcon className="size-4" />
          <span
            aria-hidden="true"
            className="absolute -end-0.5 -top-0.5 size-2.5 rounded-full border-2 border-card bg-trace"
          />
        </span>
        <span className="hidden sm:inline">{labels.launcher}</span>
      </button>

      {open && (
        <AssistantPanel
          locale={locale}
          labels={labels}
          sectionLabels={sectionLabels}
          email={email}
          onClose={close}
        />
      )}
    </>
  )
}

/** A button anywhere on the page that opens the assistant. */
export function AssistantTrigger({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_ASSISTANT_EVENT))}
      className={className}
    >
      <ChatIcon className="size-4" />
      {label}
    </button>
  )
}
