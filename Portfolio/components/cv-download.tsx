"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"

export default function CVDownload() {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/Zakaria_CV.pdf"
    link.download = "Zakaria_CV.pdf"
    link.click()
  }

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-accent to-secondary text-background rounded-lg font-mono text-sm hover:shadow-lg hover:shadow-accent/50 transition-shadow cursor-pointer"
    >
      <Download size={16} />
      Download CV
    </motion.button>
  )
}
