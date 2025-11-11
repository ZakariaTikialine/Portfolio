"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, User, Briefcase, BookOpen, Award, Mail, FileText, Code } from "lucide-react"
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

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-background to-background/95 border-r border-border/50 backdrop-blur-sm z-40 flex flex-col">
      <div className="p-6 border-b border-border/50">
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent/50 shadow-lg shadow-accent/20">
            <img src="/professional-developer-portrait.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <h1 className="font-mono text-lg font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              &lt;Zakaria /&gt;
            </h1>
            <p className="text-xs text-muted-foreground font-mono">fullstack_dev.ts</p>
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>
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

      {/* Footer section */}
      <div className="p-4 border-t border-border/50 space-y-4">
        <div className="flex justify-center gap-2">
          <SocialLinks />
        </div>
        <div className="flex justify-center">
          <ThemeToggleEnhanced />
        </div>
        <div className="flex justify-center">
          <CVDownload />
        </div>
        <p className="text-xs text-muted-foreground text-center font-mono">© 2025 ZT</p>
      </div>
    </div>
  )
}
