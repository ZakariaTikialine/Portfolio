"use client"

import { Download } from "lucide-react"

export default function CVDownloadSimple() {
    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = "/Zakaria_CV.pdf" // place your CV file inside /public
        link.download = "Zakaria_CV.pdf"
        link.click()
    }

    return (
        <button
        onClick={handleDownload}
        className="flex items-center gap-2 border border-border/50 rounded-full px-8 py-3 hover:bg-muted bg-transparent cursor-pointer text-sm font-medium transition-all"
        >
        <Download size={16} />
        Download CV
        </button>
    )
}
