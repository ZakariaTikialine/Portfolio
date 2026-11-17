"use client"

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import type { Dictionary } from "@/content/types"
import type { Locale } from "@/i18n/routing"
import { ChatIcon, CloseIcon, ResetIcon, SendIcon } from "@/components/ui/icons"
import { cn } from "@/lib/cn"
import { RichText } from "./rich-text"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  offline?: boolean
  error?: "rate" | "failed"
}

export interface AssistantPanelProps {
  locale: Locale
  labels: Dictionary["assistant"]
  sectionLabels: Dictionary["nav"]
  email: string
  onClose: () => void
}

/** Mirrors the server limits so the visitor gets a clear message instead of a rejected request. */
const MAX_USER_TURNS = 10
const MAX_HISTORY = 10
const MAX_QUESTION_CHARS = 600

let nextId = 1

export default function AssistantPanel({
  locale,
  labels,
  sectionLabels,
  email,
  onClose,
}: AssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const userTurns = messages.filter((message) => message.role === "user").length
  const limitReached = userTurns >= MAX_USER_TURNS

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      abortRef.current?.abort()
    }
  }, [onClose])

  // Keep the newest text in view while an answer streams in.
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTo({ top: log.scrollHeight })
  }, [messages])

  const ask = useCallback(
    async (rawQuestion: string) => {
      const question = rawQuestion.trim().slice(0, MAX_QUESTION_CHARS)
      if (!question || busy || limitReached) return

      const userMessage: Message = { id: nextId++, role: "user", content: question }
      const answerId = nextId++
      const history = [...messages.filter((message) => !message.error), userMessage]
        .slice(-MAX_HISTORY)
        .map(({ role, content }) => ({ role, content: content.slice(0, 2_000) }))

      setMessages((current) => [
        ...current,
        userMessage,
        { id: answerId, role: "assistant", content: "" },
      ])
      setInput("")
      setBusy(true)

      const update = (patch: Partial<Message>) =>
        setMessages((current) =>
          current.map((message) => (message.id === answerId ? { ...message, ...patch } : message)),
        )

      const controller = new AbortController()
      abortRef.current = controller
      try {
        const response = await fetch("/api/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale, messages: history }),
          signal: controller.signal,
        })
        if (response.status === 429) return update({ error: "rate" })
        if (!response.ok || !response.body) return update({ error: "failed" })

        const offline = response.headers.get("X-Assistant-Source") === "offline"
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let text = ""
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          text += decoder.decode(value, { stream: true })
          update({ content: text, offline })
        }
        if (!text.trim()) update({ error: "failed" })
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          update({ error: "failed" })
      } finally {
        setBusy(false)
        abortRef.current = null
        inputRef.current?.focus()
      }
    },
    [busy, limitReached, locale, messages],
  )

  const submit = (event: FormEvent) => {
    event.preventDefault()
    void ask(input)
  }

  const onInputKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void ask(input)
    }
  }

  const reset = () => {
    abortRef.current?.abort()
    setMessages([])
    setBusy(false)
    inputRef.current?.focus()
  }

  // On phones the panel covers the page; close it when a section link is followed.
  const closeOnSmallScreens = () => {
    if (window.matchMedia("(max-width: 639px)").matches) onClose()
  }

  return (
    <div
      role="dialog"
      aria-labelledby="assistant-title"
      className="fixed inset-0 z-50 flex flex-col bg-paper pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] motion-safe:animate-rise sm:inset-auto sm:end-5 sm:bottom-5 sm:h-[min(640px,calc(100svh-2.5rem))] sm:w-[400px] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-rule-strong sm:bg-card sm:pt-0 sm:pb-0 sm:shadow-lift"
    >
      <header className="flex items-center gap-3 border-b border-rule px-4 py-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-on-primary">
          <ChatIcon className="size-[1.125rem]" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="assistant-title" className="truncate font-semibold">
            {labels.title}
          </h2>
          <p className="truncate text-xs text-muted">{labels.subtitle}</p>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={reset}
            aria-label={labels.reset}
            title={labels.reset}
            className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <ResetIcon />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          title={labels.close}
          className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-paper-2 hover:text-ink"
        >
          <CloseIcon />
        </button>
      </header>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-busy={busy}
        className="flex-1 overflow-y-auto overscroll-contain px-4 py-5"
      >
        <div className="grid gap-4 text-[0.9375rem] leading-relaxed">
          <div className="max-w-[92%] rounded-2xl rounded-ss-md border border-rule bg-paper-2 px-4 py-3">
            {labels.intro}
          </div>

          {messages.length === 0 && (
            <ul className="grid gap-2" aria-label={labels.title}>
              {labels.suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => void ask(suggestion)}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl border border-rule px-3.5 py-2.5 text-start text-sm transition-colors hover:border-rule-strong hover:bg-paper-2"
                  >
                    {suggestion}
                    <SendIcon className="size-3.5 text-muted transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {messages.map((message) =>
            message.role === "user" ? (
              <div
                key={message.id}
                className="ms-auto max-w-[85%] rounded-2xl rounded-se-md bg-primary px-4 py-2.5 whitespace-pre-wrap text-on-primary"
              >
                {message.content}
              </div>
            ) : (
              <div key={message.id} className="grid max-w-[92%] gap-1.5">
                <div className="rounded-2xl rounded-ss-md border border-rule bg-paper-2 px-4 py-3">
                  {message.error === "rate" ? (
                    <p>{labels.rateLimited}</p>
                  ) : message.error === "failed" ? (
                    <p>
                      {labels.error}{" "}
                      <a
                        href={`mailto:${email}`}
                        dir="ltr"
                        className="font-medium text-accent underline underline-offset-2"
                      >
                        {email}
                      </a>
                    </p>
                  ) : message.content ? (
                    <RichText
                      text={message.content}
                      sectionLabels={sectionLabels}
                      onInternalLink={closeOnSmallScreens}
                    />
                  ) : (
                    <p className="flex items-center gap-2 text-muted">
                      <span className="flex gap-1" aria-hidden="true">
                        <span className="size-1.5 animate-pulse rounded-full bg-trace" />
                        <span className="size-1.5 animate-pulse rounded-full bg-trace [animation-delay:150ms]" />
                        <span className="size-1.5 animate-pulse rounded-full bg-trace [animation-delay:300ms]" />
                      </span>
                      {labels.thinking}
                    </p>
                  )}
                </div>
                {message.offline && !message.error && (
                  <p className="px-1 text-xs text-muted">{labels.offlineNote}</p>
                )}
              </div>
            ),
          )}

          {limitReached && !busy && (
            <p className="text-center text-sm text-muted">{labels.limitReached}</p>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="border-t border-rule p-3">
        <div className="flex items-end gap-2 rounded-xl border border-rule bg-paper-2 p-1.5 transition-colors focus-within:border-focus">
          <label htmlFor="assistant-input" className="sr-only">
            {labels.placeholder}
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onInputKey}
            placeholder={labels.placeholder}
            rows={1}
            maxLength={MAX_QUESTION_CHARS}
            disabled={limitReached}
            className="field-sizing-content max-h-32 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-[0.9375rem] text-ink placeholder:text-muted focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={busy || limitReached || !input.trim()}
            aria-label={labels.send}
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-on-primary transition-[filter,opacity]",
              "hover:brightness-110 disabled:opacity-40",
            )}
          >
            <SendIcon className="rtl:-scale-x-100" />
          </button>
        </div>
        <p className="mt-2 px-1 text-[0.6875rem] text-muted">{labels.disclaimer}</p>
      </form>
    </div>
  )
}
