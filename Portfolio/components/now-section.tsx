"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"

const nowContent: Record<Locale, { label: string; value: string }[]> = {
  en: [
    { label: "Learning", value: "System Design, Go & AI-powered Applications" },
    { label: "Exploring", value: "AI architectures, Next.js 16 with Turbopack" },
    { label: "Building", value: "Fullstack web apps & data pipelines" },
    { label: "Sharing", value: "Writing blogs on AI, data science & web dev" },
  ],
  fr: [
    { label: "Apprentissage", value: "Architecture système, Go et applications IA" },
    { label: "Exploration", value: "Architectures IA, Next.js 16 + Turbopack" },
    { label: "Construction", value: "Applications fullstack et pipelines data" },
    { label: "Partage", value: "Articles sur l'IA, la data science et le web" },
  ],
  ar: [
    { label: "أتعلّم", value: "تصميم الأنظمة، Go، وتطبيقات مدعومة بالذكاء الاصطناعي" },
    { label: "أستكشف", value: "معماريات الذكاء الاصطناعي و Next.js 16 مع Turbopack" },
    { label: "أبني", value: "تطبيقات ويب متكاملة وخطوط بيانات" },
    { label: "أشارك", value: "مقالات حول الذكاء الاصطناعي والبيانات وتطوير الويب" },
  ],
}

const lastUpdatedCopy: Record<Locale, string> = {
  en: "Last updated: Today",
  fr: "Dernière mise à jour : aujourd'hui",
  ar: "آخر تحديث: اليوم",
}

function NowSection() {
  const locale = useLocale() as Locale
  const entries = nowContent[locale]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mx-auto max-w-xl rounded-xl border border-accent/20 bg-linear-to-br from-accent/5 to-secondary/5 p-6 shadow-md backdrop-blur-md"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <h3 className="font-mono text-sm font-semibold text-accent uppercase tracking-wide">
            now/
          </h3>
        </div>

        {/* Content */}
        <div className="space-y-2 font-mono text-sm text-muted-foreground">
          {entries.map((entry) => (
            <p key={entry.label}>
              <span className="font-semibold text-foreground">{entry.label}:</span> {entry.value}
            </p>
          ))}
          <p className="text-xs text-accent/70">{lastUpdatedCopy[locale]}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(NowSection)
