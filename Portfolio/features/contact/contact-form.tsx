"use client"

import { useState, type FormEvent } from "react"
import type { Dictionary } from "@/content/types"
import { cn } from "@/lib/cn"
import { SendIcon, SuccessIcon } from "@/components/ui/icons"

type Status = "idle" | "sending" | "success" | "error"

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

interface ContactFormProps {
  accessKey: string
  labels: Dictionary["contact"]["form"]
}

const fieldClass =
  "w-full rounded-lg border border-rule bg-paper-2 px-3.5 py-2.5 text-[0.9375rem] text-ink transition-colors placeholder:text-muted hover:border-rule-strong focus:border-focus focus:outline-none"

export function ContactForm({ accessKey, labels }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle")

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never see or tick this box.
    if (data.get("botcheck")) return

    setStatus("sending")
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio message from ${String(data.get("name") ?? "")}`,
          from_name: "Portfolio contact form",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (!response.ok || !result.success) throw new Error("Submission rejected")
      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="grid place-items-center gap-3 py-12 text-center">
        <SuccessIcon className="size-10 text-ok" aria-hidden="true" />
        <p className="max-w-sm text-lg">{labels.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium">
            {labels.name}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="contact-email" className="text-sm font-medium">
            {labels.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            dir="ltr"
            className={cn(fieldClass, "rtl:text-right")}
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-on-primary transition-[filter,opacity] hover:brightness-110 disabled:opacity-60"
        >
          <SendIcon className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          {status === "sending" ? labels.sending : labels.send}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {status === "error" ? labels.error : ""}
        </p>
      </div>
    </form>
  )
}
