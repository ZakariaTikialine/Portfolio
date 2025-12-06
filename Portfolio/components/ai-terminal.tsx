"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, Minimize2, Maximize2, Bot, UserRound, Expand, Shrink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import { getAiTerminalContent } from "@/content/ai-terminal"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

const AiTerminal = () => {
  const locale = useLocale() as Locale
  const isRTL = locale === "ar"
  const copy = getAiTerminalContent(locale)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "intro",
      type: "ai",
      content: copy.introMessage,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMessages([
      {
        id: "intro",
        type: "ai",
        content: copy.introMessage,
        timestamp: new Date(),
      },
    ])
    setErrorMessage(null)
  }, [copy.introMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getFallbackResponse = () => copy.defaultResponses[Math.floor(Math.random() * copy.defaultResponses.length)]

  useEffect(() => {
    if (!isFullscreen) {
      document.body.style.overflow = ""
      return
    }

    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [isFullscreen])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const trimmedInput = inputValue.trim()
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: trimmedInput,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputValue("")
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const historyPayload = updatedMessages.slice(-6).map((message) => ({
        role: message.type === "user" ? "user" : "assistant",
        content: message.content,
      }))

      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput, locale, history: historyPayload }),
      })

      if (!response.ok) {
        throw new Error(`AI request failed (${response.status})`)
      }

      const data = (await response.json()) as { answer?: string }
      const aiResponse = data.answer?.trim() || getFallbackResponse()

      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("AI terminal error", error)
      setErrorMessage(copy.errorMessage)
      const fallbackMessage: Message = {
        id: `${Date.now()}-fallback`,
        type: "ai",
        content: getFallbackResponse(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const horizontalAnchor = isRTL ? "left-5" : "right-5"

  const renderedMessages = messages.map((message) => {
    const isUser = message.type === "user"
    return (
      <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div className={`flex max-w-[85%] items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <div
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
              isUser ? "border-accent/50 bg-accent/10 text-accent" : "border-border/60 bg-muted/30 text-foreground"
            }`}
            aria-hidden
          >
            {isUser ? <UserRound size={13} /> : <Bot size={13} />}
          </div>
          <div
            className={`rounded-2xl border px-3.5 py-2.5 text-sm leading-relaxed ${
              isUser
                ? "border-accent/30 bg-accent/10 text-foreground"
                : "border-border/50 bg-muted/20 text-foreground"
            }`}
          >
            {message.content}
          </div>
        </div>
      </div>
    )
  })

  const showSuggestions = messages.length <= 1 && copy.suggestions.length > 0

  // Closed state - floating button (matches minimized header exactly)
  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${horizontalAnchor} z-50 flex cursor-pointer items-center justify-between rounded-2xl border border-border/60 bg-background/98 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-xl`}
        role="button"
        tabIndex={0}
        aria-label={copy.openLabel}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-accent/10 text-accent">
            <Bot size={16} />
            <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border-2 border-background bg-emerald-400" />
          </div>
          <p className="text-sm font-semibold text-foreground">{copy.headerTitle}</p>
        </div>
      </div>
    )
  }

  // Container classes - properly centered for fullscreen
  const containerClasses = cn(
    "fixed z-50 flex flex-col overflow-hidden border border-border/60 bg-background/98 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300",
    isFullscreen
      ? "inset-4 sm:inset-8 md:inset-12 lg:inset-16 rounded-2xl"
      : `bottom-5 ${horizontalAnchor} w-[380px] rounded-2xl ${isMinimized ? "h-auto" : "h-[520px]"}`,
  )

  const handleClose = () => {
    setIsOpen(false)
    setIsFullscreen(false)
    setIsMinimized(false)
    document.body.style.overflow = ""
  }

  const toggleMinimize = () => {
    if (isFullscreen) return
    setIsMinimized((prev) => !prev)
  }

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => {
      const next = !prev
      if (next) {
        setIsMinimized(false)
      }
      return next
    })
  }

  return (
    <div className={containerClasses} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className={`flex items-center justify-between bg-muted/30 px-4 py-2.5 ${isMinimized ? "" : "border-b border-border/40"}`}>
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-accent/10 text-accent">
            <Bot size={16} />
            <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border-2 border-background bg-emerald-400" />
          </div>
          <p className="text-sm font-semibold text-foreground">{copy.headerTitle}</p>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={toggleFullscreen}
            className="rounded-lg border border-border/40 bg-background/80 p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={isFullscreen ? copy.exitFullscreenLabel : copy.fullscreenLabel}
          >
            {isFullscreen ? <Shrink size={14} /> : <Expand size={14} />}
          </button>
          <button
            onClick={toggleMinimize}
            className="rounded-lg border border-border/40 bg-background/80 p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
            aria-label={isMinimized ? copy.maximizeLabel : copy.minimizeLabel}
            disabled={isFullscreen}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button
            onClick={handleClose}
            className="rounded-lg border border-border/40 bg-background/80 p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={copy.closeLabel}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Messages area */}
          <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-3">
              {renderedMessages}

              {showSuggestions && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {copy.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground transition-all hover:border-border hover:bg-muted/50 hover:text-foreground"
                      onClick={() => {
                        setInputValue(suggestion)
                        inputRef.current?.focus()
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-full border border-border/50 bg-muted/30 px-4 py-2">
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-border/40 bg-muted/20 p-3">
            {errorMessage && (
              <p className="mb-2 text-center text-xs text-red-400" role="status">
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                type="text"
                placeholder={copy.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                ref={inputRef}
                className="h-10 flex-1 rounded-xl border-border/40 bg-background/80 text-sm placeholder:text-muted-foreground/60 focus:border-accent focus:ring-accent/30"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !inputValue.trim()}
                className="h-10 w-10 rounded-xl bg-accent text-accent-foreground shadow-sm hover:bg-accent/90"
              >
                <Send size={15} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AiTerminal
