"use client"

import { Download } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function CVDownloadSimple() {
    const t = useTranslations("cta")
    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = "/Zakaria_CV.pdf" // place your CV file inside /public
        link.download = "Zakaria_CV.pdf"
        link.click()
    }

    return (
        <Button
            onClick={handleDownload}
            size="lg"
            variant="default"
            className="rounded-full border border-accent bg-accent px-4 sm:px-6 text-sm sm:text-base text-accent-foreground hover:bg-accent/90"
        >
            <Download size={16} />
            <span className="hidden sm:inline">{t("downloadCv")}</span>
        </Button>
    )
}
