"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MessageSquare, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import { getContactContent, type ContactChannelType } from "@/content/contact"

const channelIcons: Record<ContactChannelType, typeof Mail> = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
}

type FormStatus = "idle" | "loading" | "success" | "error"

const Contact = () => {
  const locale = useLocale() as Locale
  const copy = getContactContent(locale)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, 
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "New Contact Form Submission",
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      })

      const result = await response.json()
      console.log("Web3Forms response:", result)
      
      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        console.error("Web3Forms error:", result)
        throw new Error(result.message || "Form submission failed")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const isDisabled = status === "loading" || status === "success"

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border/40 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="mx-auto h-72 max-w-5xl bg-linear-to-r from-accent/15 via-transparent to-secondary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            {copy.badge}
            <span className="h-1 w-6 bg-accent" />
          </span>
          <div>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">{copy.heading}</h2>
            <p className="mt-2 text-base text-muted-foreground">{copy.description}</p>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-5 rounded-2xl border border-border/60 bg-background/80 p-6 shadow-lg shadow-black/10 backdrop-blur md:p-8"
          >
            {/* Success/Error Messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                <CheckCircle2 size={18} />
                <span>{copy.form.successMessage}</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                <AlertCircle size={18} />
                <span>{copy.form.errorMessage}</span>
              </div>
            )}

            {/* Name & Email Row */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  {copy.form.nameLabel}
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder={copy.form.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="rounded-xl border-border/40 bg-muted/20 px-4 py-3 transition-colors focus:border-accent/50 focus:bg-muted/30"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  {copy.form.emailLabel}
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder={copy.form.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="rounded-xl border-border/40 bg-muted/20 px-4 py-3 transition-colors focus:border-accent/50 focus:bg-muted/30"
                  required
                />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {copy.form.subjectLabel}
              </label>
              <Input
                type="text"
                name="subject"
                placeholder={copy.form.subjectPlaceholder}
                value={formData.subject}
                onChange={handleChange}
                disabled={isDisabled}
                className="rounded-xl border-border/40 bg-muted/20 px-4 py-3 transition-colors focus:border-accent/50 focus:bg-muted/30"
              />
            </div>

            {/* Message Field - Fixed to expand vertically */}
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {copy.form.messageLabel}
              </label>
              <Textarea
                name="message"
                placeholder={copy.form.messagePlaceholder}
                value={formData.message}
                onChange={handleChange}
                disabled={isDisabled}
                rows={6}
                className="min-h-[150px] w-full resize-y rounded-xl border-border/40 bg-muted/20 px-4 py-3 transition-colors focus:border-accent/50 focus:bg-muted/30"
                style={{ fieldSizing: "fixed" } as React.CSSProperties}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isDisabled}
              className="w-full rounded-xl bg-accent py-6 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  {copy.form.sendingLabel}
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={18} className="mr-2" />
                  {copy.form.sentLabel}
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  {copy.form.submitLabel}
                </>
              )}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4 rounded-2xl border border-border/60 bg-background/70 p-5 shadow-inner shadow-black/10"
          >
            <div className="rounded-2xl border border-border/50 bg-muted/20 p-5">
              <div className="flex items-center gap-3">
                <MessageSquare size={18} className="text-accent" />
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{copy.direct.label}</p>
                  <p className="text-sm text-foreground/80">{copy.direct.response}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                {copy.direct.channels.map((channel) => {
                  const Icon = channelIcons[channel.type]
                  return (
                    <a
                      key={channel.href}
                      href={channel.href}
                      target={channel.type === "mail" ? undefined : "_blank"}
                      rel={channel.type === "mail" ? undefined : "noopener noreferrer"}
                      className="flex items-center gap-3 rounded-xl border border-border/50 px-3 py-2 hover:border-accent/40 hover:text-foreground"
                    >
                      <Icon size={16} className="text-accent" />
                      {channel.label}
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl border border-dashed border-border/50 bg-muted/15 p-5 text-sm text-muted-foreground">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{copy.support.label}</p>
              <ul className="space-y-2 text-foreground/80">
                {copy.support.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
