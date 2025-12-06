"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Folder, Trophy, Users, Code2 } from "lucide-react"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import type { ReactElement } from "react"

const statCopies: Record<Locale, { label: string; value: string; icon: ReactElement }[]> = {
  en: [
    { label: "Projects completed", value: "20", icon: <Folder size={32} className="text-accent" /> },
    { label: "Years experience", value: "2+", icon: <Trophy size={32} className="text-accent" /> },
    { label: "Happy clients", value: "1", icon: <Users size={32} className="text-accent" /> },
    { label: "Code commits", value: "+1k", icon: <Code2 size={32} className="text-accent" /> },
  ],
  fr: [
    { label: "Projets livrés", value: "20", icon: <Folder size={32} className="text-accent" /> },
    { label: "Années d'expérience", value: "2+", icon: <Trophy size={32} className="text-accent" /> },
    { label: "Clients satisfaits", value: "1", icon: <Users size={32} className="text-accent" /> },
    { label: "Commits", value: "+1k", icon: <Code2 size={32} className="text-accent" /> },
  ],
  ar: [
    { label: "المشاريع المكتملة", value: "20", icon: <Folder size={32} className="text-accent" /> },
    { label: "سنوات الخبرة", value: "+2", icon: <Trophy size={32} className="text-accent" /> },
    { label: "العملاء الراضون", value: "1", icon: <Users size={32} className="text-accent" /> },
    { label: "سجلات الشيفرة", value: "+1k", icon: <Code2 size={32} className="text-accent" /> },
  ],
}

function StatsDashboard() {
  const locale = useLocale() as Locale
  const stats = statCopies[locale]

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center justify-center rounded-xl border border-border/20 bg-linear-to-tr from-accent/5 to-secondary/5 p-6 text-center shadow-lg transition-all duration-300 hover:border-accent/50 hover:shadow-xl"
        >
          <div className="mb-3">{stat.icon}</div>
          <div className="mb-1 text-3xl font-extrabold text-accent">{stat.value}</div>
          <div className="font-mono text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default memo(StatsDashboard)
