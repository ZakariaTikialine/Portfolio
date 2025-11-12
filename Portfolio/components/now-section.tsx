"use client"

import { motion } from "framer-motion"

export default function NowSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5 p-6 backdrop-blur-md shadow-md max-w-xl mx-auto"
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
          <p>
            <span className="font-semibold text-foreground">Learning:</span> System Design, Go & AI-powered Applications
          </p>
          <p>
            <span className="font-semibold text-foreground">Exploring:</span> AI Architectures, Next.js 16 with Turbopack
          </p>
          <p>
            <span className="font-semibold text-foreground">Building:</span> Fullstack Web Apps & Data Pipelines
          </p>
          <p>
            <span className="font-semibold text-foreground">Sharing:</span> Writing blogs on AI, Data Science & WebDev
          </p>
          <p className="text-xs text-accent/70">Last updated: Today</p>
        </div>
      </div>
    </motion.div>
  )
}
