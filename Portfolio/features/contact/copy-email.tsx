"use client"

import { useEffect, useState } from "react"
import { CheckIcon, CopyIcon } from "@/components/ui/icons"

interface CopyEmailProps {
  email: string
  copyLabel: string
  copiedLabel: string
}

export function CopyEmail({ email, copyLabel, copiedLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // Clipboard can be unavailable (insecure context, permissions); the address stays selectable.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-rule bg-paper-2 px-3 text-sm font-medium text-muted transition-colors hover:border-rule-strong hover:text-ink"
    >
      {copied ? (
        <CheckIcon className="size-4 text-ok" aria-hidden="true" />
      ) : (
        <CopyIcon className="size-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  )
}
