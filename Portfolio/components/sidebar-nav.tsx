"use client"

import { useState, useEffect, memo } from "react"
import { useLocale, useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  Award,
  Mail,
  FileText,
  Code,
  Menu,
  X,
} from "lucide-react"
import { Link, usePathname } from "@/navigation"
import ThemeToggle from "./theme-toggle"
import SocialLinks from "./social-links"
import CVDownload from "./cv-download"
import LanguageSwitcher from "./language-switcher"

interface NavItem {
  id: string
  icon: React.ReactNode
  href: string
}

const navItems: NavItem[] = [
  { id: "home", icon: <Home size={20} />, href: "/" },
  { id: "about", icon: <User size={20} />, href: "/about" },
  { id: "experience", icon: <Briefcase size={20} />, href: "/experience" },
  { id: "education", icon: <BookOpen size={20} />, href: "/education" },
  { id: "skills", icon: <Code size={20} />, href: "/skills" },
  { id: "projects", icon: <FileText size={20} />, href: "/projects" },
  { id: "blog", icon: <Award size={20} />, href: "/blog" },
  { id: "contact", icon: <Mail size={20} />, href: "/contact" },
]

const SECTION_LABELS = {
  en: { nav: "Navigation", quick: "Quick actions", status: "Available for freelance" },
  fr: { nav: "Navigation", quick: "Actions rapides", status: "Disponible en freelance" },
  ar: { nav: "التنقل", quick: "إجراءات سريعة", status: "متاح للعمل الحر" },
} as const

export default function SidebarNav() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const isRTL = locale === "ar"
  const labels = SECTION_LABELS[locale as keyof typeof SECTION_LABELS] ?? SECTION_LABELS.en
  const normalizedPath = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "") || "/"
  const activeId = navItems.find((item) => item.href === normalizedPath)?.id || "home"
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const slideOffset = isRTL ? 300 : -300
  const sidebarAnchorClass = isRTL ? "right-0 border-l border-border/50" : "left-0 border-r border-border/50"
  const navAlignmentClass = isRTL ? "text-right" : "text-left"
  const navFlowClass = isRTL ? "flex-row-reverse" : "flex-row"
  const expandedProps = isOpen ? ({ "aria-expanded": "true" as const } as const) : undefined
  const mobileTopOffset = "top-16 h-[calc(100vh-4rem)]"
  const closedTranslateClass = isRTL ? "translate-x-full" : "-translate-x-full"

  // Ensure hydration-safe mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid mismatch until client renders

  return (
    <>
      {/* Mobile Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border/50 bg-background/90 px-4 py-3 backdrop-blur-md lg:hidden ${
          isRTL ? "flex-row-reverse" : "flex-row"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded-md border border-border/40 p-2 hover:bg-muted"
            aria-label="Toggle navigation"
            type="button"
            {...expandedProps}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-mono text-base font-semibold text-accent">&lt;Zakaria /&gt;</h1>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher onSelect={() => setIsOpen(false)} />
          <CVDownload />
          <ThemeToggle className="p-2" />
        </div>
      </div>

      {/* Sidebar (desktop + overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-x-0 top-16 bottom-0 z-30 bg-black/40 backdrop-blur-[1px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isOpen || mounted) && (
          <motion.aside
            key="sidebar"
            initial={{ x: slideOffset }}
            animate={{ x: 0 }}
            exit={{ x: slideOffset }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className={`fixed z-40 flex w-full max-w-xs flex-col bg-background/95 backdrop-blur-md shadow-[0_20px_45px_rgba(15,23,42,0.35)] lg:max-w-none lg:w-64 ${
              sidebarAnchorClass
            } ${isOpen ? "translate-x-0" : closedTranslateClass} ${isOpen ? "pointer-events-auto" : "pointer-events-none"} ${mobileTopOffset} lg:top-0 lg:h-screen lg:translate-x-0 lg:pointer-events-auto`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Profile */}
            <div className="hidden border-b border-border/40 px-6 py-7 lg:block">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="h-16 w-16 overflow-hidden rounded-full border border-border/60 ring-2 ring-accent/50">
                  <Image 
                    src="/professional-developer-portrait.png" 
                    alt="Profile" 
                    width={64} 
                    height={64}
                    priority
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-base font-semibold text-accent">&lt;Zakaria /&gt;</p>
                  <p className="text-sm text-muted-foreground">Full-stack engineer</p>
                  <p className="text-xs text-muted-foreground/70">Algeria · Remote</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  <span>{labels.status}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="custom-scrollbar flex-1 overflow-y-auto px-5 py-6">
              <p className={`text-xs uppercase tracking-[0.25em] text-muted-foreground/70 ${navAlignmentClass}`}>
                {labels.nav}
              </p>
              <ul className={`mt-4 space-y-2.5 ${navAlignmentClass}`}>
                {navItems.map((item) => {
                  const isActive = activeId === item.id
                  return (
                    <li key={item.id}>
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <motion.div
                          className={`group relative flex ${navFlowClass} w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-accent/10 text-foreground"
                              : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                          }`}
                          whileHover={{ x: isRTL ? -4 : 4 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isActive && (
                            <motion.div
                              className={`absolute ${isRTL ? "right-2" : "left-2"} top-1 bottom-1 w-1 rounded-full bg-accent`}
                              layoutId="activeIndicator"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                              isActive ? "border-accent/40 text-accent" : "border-border/50"
                            } ${isRTL ? "order-2" : "order-0"}`}
                          >
                            {item.icon}
                          </span>
                          <span className={`flex-1 text-sm ${isRTL ? "text-right" : "text-left"}`}>{t(item.id)}</span>
                        </motion.div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="hidden space-y-4 border-t border-border/40 px-5 py-5 lg:block">
              <p className={`text-xs uppercase tracking-[0.25em] text-muted-foreground/70 ${navAlignmentClass}`}>
                {labels.quick}
              </p>
              <div className="flex flex-col gap-3">
                <CVDownload />
                <div className="flex items-center justify-between gap-3">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>
              <div className="flex justify-center pt-2">
                <SocialLinks />
              </div>
              <p className="text-center text-xs font-mono text-muted-foreground">© 2025 ZakariaTikialine</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
