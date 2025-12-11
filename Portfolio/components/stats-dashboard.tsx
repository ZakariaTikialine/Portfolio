"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Folder, Trophy, Users, Code2 } from "lucide-react"
import { useLocale } from "next-intl"
import type { Locale } from "@/navigation"
import type { ReactElement } from "react"
import { getStats } from "@/content/stats"

const icons: Record<string, ReactElement> = {
  folder: <Folder size={32} className="text-accent" />,
  trophy: <Trophy size={32} className="text-accent" />,
  users: <Users size={32} className="text-accent" />,
  code: <Code2 size={32} className="text-accent" />,
}

function StatsDashboard() {
  const locale = useLocale() as Locale
  const stats = getStats(locale)

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 md:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center justify-center rounded-xl border border-border/20 bg-linear-to-tr from-accent/5 to-secondary/5 p-4 sm:p-6 text-center shadow-lg transition-all duration-300 hover:border-accent/50 hover:shadow-xl"
        >
          <div className="mb-2 sm:mb-3">{icons[stat.icon] ?? icons.folder}</div>
          <div className="mb-1 text-2xl sm:text-3xl font-extrabold text-accent">{stat.value}</div>
          <div className="font-mono text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default memo(StatsDashboard)
