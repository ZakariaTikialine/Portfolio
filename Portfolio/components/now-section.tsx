"use client"

import { motion } from "framer-motion"

export default function NowSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-lg border border-accent/20 bg-gradient-to-br from-accent/10 to-secondary/10 p-6 backdrop-blur-sm"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <h3 className="font-mono text-sm font-semibold text-accent">now/</h3>
        </div>
        <div className="space-y-2 font-mono text-sm text-muted-foreground">
          <p>Learning: Advanced System Design & Go</p>
          <p>Exploring: AI Agent Architectures</p>
          <p>Building: Next-generation Data Pipelines</p>
          <p className="text-xs text-accent/70">Last updated: Just now</p>
        </div>
      </div>
    </motion.div>
  )
}
