"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CVDownloadProps {
  className?: string
  iconOnly?: boolean
}

export default function CVDownload({ className, iconOnly = false }: CVDownloadProps) {
  const t = useTranslations("cta")
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/Zakaria_CV.pdf"
    link.download = "Zakaria_CV.pdf"
    link.click()
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={handleDownload}
        size={iconOnly ? "icon" : "lg"}
        variant="default"
        className={cn(
          "rounded-full border border-accent bg-accent text-accent-foreground hover:bg-accent/90",
          !iconOnly && "px-4 sm:px-6 text-sm sm:text-base",
          className,
        )}
      >
        <Download size={16} />
        {!iconOnly && <span className="hidden sm:inline">{t("downloadCv")}</span>}
      </Button>
    </motion.div>
  )
}
