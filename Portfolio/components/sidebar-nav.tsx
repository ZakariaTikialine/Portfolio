"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
import ThemeToggleEnhanced from "./theme-toggle-enhanced"
import SocialLinks from "./social-links"
import CVDownload from "./cv-download"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },
  { id: "about", label: "About", icon: <User size={20} />, href: "/about" },
  { id: "experience", label: "Experience", icon: <Briefcase size={20} />, href: "/experience" },
  { id: "education", label: "Education", icon: <BookOpen size={20} />, href: "/education" },
  { id: "skills", label: "Skills", icon: <Code size={20} />, href: "/skills" },
  { id: "projects", label: "Projects", icon: <FileText size={20} />, href: "/projects" },
  { id: "blog", label: "Blog", icon: <Award size={20} />, href: "/blog" },
  { id: "contact", label: "Contact", icon: <Mail size={20} />, href: "/contact" },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const activeId = navItems.find((item) => item.href === pathname)?.id || "home"
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure hydration-safe mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoid mismatch until client renders

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md border border-border/40 hover:bg-muted"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-mono text-sm font-semibold text-accent">&lt;Zakaria /&gt;</h1>
        </div>

        <div className="flex items-center gap-3">
          <CVDownload />
          <ThemeToggleEnhanced />
        </div>
      </div>

      {/* Sidebar (desktop + overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 lg:hidden"
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
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-background to-background/95 border-r border-border/50 backdrop-blur-sm z-40 flex flex-col ${
              isOpen ? "lg:translate-x-0" : "hidden lg:flex"
            }`}
          >
            {/* Profile */}
            <div className="p-6 border-b border-border/50">
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent/50 shadow-lg shadow-accent/20">
                  <img
                    src="/professional-developer-portrait.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h1 className="font-mono text-lg font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                    &lt;Zakaria /&gt;
                  </h1>
                  <p className="text-xs text-muted-foreground font-mono">fullstack_dev.ts</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      <motion.div
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative group cursor-pointer ${
                          activeId === item.id
                            ? "text-accent bg-accent/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {activeId === item.id && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-secondary rounded-r"
                            layoutId="activeIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border/50 space-y-4">
              <div className="flex justify-center gap-2">
                <SocialLinks />
              </div>
              <div className="flex justify-center">
                <CVDownload />
              </div>
              <div className="flex justify-center">
                <ThemeToggleEnhanced />
              </div>
              <p className="text-xs text-muted-foreground text-center font-mono">© 2025 ZT</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
