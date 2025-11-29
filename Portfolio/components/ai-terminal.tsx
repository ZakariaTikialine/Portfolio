"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle, X, Minimize2, Maximize2, Bot, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import { getAiTerminalContent } from "@/content/ai-terminal"

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

  const horizontalAnchor = isRTL ? "left-6" : "right-6"

  if (!isOpen) {
    return (
      <button
        aria-label={copy.openLabel}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${horizontalAnchor} z-40 group focus:outline-none`}
      >
        <div className="flex items-center gap-3 rounded-full border border-accent/40 bg-background/90 px-4 py-2 shadow-[0_15px_35px_rgba(15,23,42,0.45)] transition-all group-hover:-translate-y-0.5 group-hover:border-accent/70">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/90 text-accent-foreground shadow-inner shadow-black/40">
            <MessageCircle size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">AI</span>
            <span className="text-sm font-semibold text-foreground">{copy.headerTitle}</span>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 ${horizontalAnchor} z-50 w-[360px] overflow-hidden rounded-3xl border border-border/40 bg-card/95 shadow-[0_25px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[520px]"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 bg-linear-to-r from-background/60 via-background/20 to-background/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
            <Bot size={18} />
            <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full border border-background bg-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{copy.headerTitle}</p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">{copy.openLabel}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded-full border border-border/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={isMinimized ? copy.maximizeLabel : copy.minimizeLabel}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-border/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={copy.closeLabel}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      {!isMinimized && (
        <>
          <div className="h-[360px] space-y-4 overflow-y-auto px-4 py-5">
            {messages.map((message) => {
              const isUser = message.type === "user"
              return (
                <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[85%] items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`mt-1 flex h-8 w-8 items-center justify-center rounded-2xl border text-xs ${
                        isUser ? "border-accent/50 text-accent" : "border-border/40 text-foreground"
                      }`}
                      aria-hidden
                    >
                      {isUser ? <UserRound size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "border-accent/40 bg-accent text-accent-foreground"
                          : "border-border/40 bg-card/80 text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              )
            })}
            {messages.length <= 1 && copy.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {copy.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="rounded-full border border-border/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
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
                <div className="rounded-2xl border border-border/40 bg-card/80 px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-border/50">
            {errorMessage && (
              <p className="px-4 pt-3 text-xs text-red-400" role="status">
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleSendMessage} className="flex gap-2 px-4 pb-4 pt-3">
              <Input
                type="text"
                placeholder={copy.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                ref={inputRef}
                className="text-sm border-border/40 bg-muted/40 placeholder:text-muted-foreground/60 focus:border-accent focus:ring-accent/50"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !inputValue.trim()}
                className="h-11 w-11 rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/30 hover:bg-accent/90"
              >
                <Send size={16} />
              </Button>
            </form>
            <p className="px-4 pb-4 text-center text-[11px] text-muted-foreground/70">{copy.poweredBy}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default AiTerminal
