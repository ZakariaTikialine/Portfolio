"use client"

import { Download } from "lucide-react"
import { useTranslations } from "next-intl"

export default function CVDownloadSimple() {
    const t = useTranslations("cta")
    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = "/Zakaria_CV.pdf" // place your CV file inside /public
        link.download = "Zakaria_CV.pdf"
        link.click()
    }

    return (
        <button
        onClick={handleDownload}
        className="flex items-center gap-2 rounded-full border border-accent bg-accent px-8 text-sm font-medium cursor-pointer text-accent-foreground transition-all hover:bg-accent/90"
        >
        <Download size={16} />
        {t("downloadCv")}
        </button>
    )
}
