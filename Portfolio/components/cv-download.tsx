"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { useTranslations } from "next-intl"

export default function CVDownload() {
  const t = useTranslations("cta")
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
      className="flex items-center cursor-pointer gap-2 rounded-lg border border-accent bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-shadow hover:shadow-lg hover:shadow-accent/50"
    >
      <Download size={16} />
      {t("downloadCv")}
    </motion.button>
  )
}
