"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { useRouter } from "@/navigation"

const socials = [
  { icon: Github, href: "https://github.com/ZakariaTikialine", label: "GitHub", external: true },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zakaria-tikialine-68857025b/", label: "LinkedIn", external: true },
  { icon: Mail, href: "/contact", label: "Contact", external: false },
]

export default function SocialLinks() {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external: boolean) => {
    if (!external) {
      e.preventDefault()
      router.push(href)
    }
  }

  return (
    <div className="flex gap-3">
      {socials.map((social, i) => {
        const Icon = social.icon
        return (
          <motion.a
            key={i}
            href={social.href}
            onClick={(e) => handleClick(e, social.href, social.external)}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-muted/50 hover:bg-accent/20 border border-border/50 hover:border-accent/50 transition-colors cursor-pointer"
            title={social.label}
            aria-label={social.label}
          >
            <Icon size={18} />
          </motion.a>
        )
      })}
    </div>
  )
}
