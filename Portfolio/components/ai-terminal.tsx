"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

const AiTerminal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hey! I'm Zakaria's AI assistant. Ask me about skills, projects, or how I can help with your next project!",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses: Record<string, string> = {
    "what are your skills":
      "I excel in frontend (React, Next.js, TypeScript), backend (Node.js, Express, Go), and data science (Python, ML). What interests you most?",
    "tell me about projects":
      "Recent highlights include Tahwisa NAFTAL (fullstack trip management), a CSP timetable scheduler, and maze visualization. Each shows different expertise.",
    "what do you know about ai":
      "I'm deeply interested in ML fundamentals, AI applications in business, and ethical considerations. I'm exploring TensorFlow and building practical projects.",
    "go backend":
      "Go is my current focus for building performant, scalable backend systems. I'm learning about goroutines, channels, and systems design patterns.",
    "data science":
      "I work with data analysis, statistical modeling, and building ML pipelines. Pandas, NumPy, and Scikit-learn are my go-to tools.",
    "work with you":
      "I'd love to collaborate! I'm available for fullstack projects, data analysis, ML implementations, or technical consulting.",
    available:
      "I'm currently open for projects, freelance work, and interesting collaborations. Get in touch for more details!",
  }

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerInput.includes(key)) {
        return response
      }
    }

    const defaultResponses = [
      "That's an interesting question! Could you be more specific about what you'd like to know?",
      "Great question! Feel free to ask about my skills, projects, or experience with specific technologies.",
      "I'm happy to help! Try asking about my projects, tech stack, or availability.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 600)
  }

  if (!isOpen) {
    return (
      <button title="zz"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-linear-to-r from-accent to-secondary text-accent-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
      >
        <MessageCircle size={24} className="group-hover:scale-125 transition-transform" />
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-card border border-border/50 rounded-lg shadow-2xl transition-all duration-300 ${
        isMinimized ? "w-80 h-14" : "w-80 h-96"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h3 className="font-semibold text-sm">Ask Zakaria's AI</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button title="button" onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      {!isMinimized && (
        <>
          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed ${
                    message.type === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-muted">
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
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border/50 flex gap-2">
            <Input
              type="text"
              placeholder="Ask about skills, projects..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="text-sm bg-muted/50 border-border/50 placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent/50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !inputValue.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send size={16} />
            </Button>
          </form>
        </>
      )}
    </div>
  )
}

export default AiTerminal
