"use client"

import { motion } from "framer-motion"

const stats = [
  { label: "Projects Completed", value: "24", icon: "📦" },
  { label: "Years Experience", value: "3+", icon: "⚡" },
  { label: "Happy Clients", value: "15+", icon: "😊" },
  { label: "Code Commits", value: "1.2K", icon: "💾" },
]

export default function StatsDashboard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 bg-card border border-border/50 rounded-lg hover:border-accent/50 transition-colors text-center"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-accent">{stat.value}</div>
          <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
