"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
]

export default function SocialLinks() {
  return (
    <div className="flex gap-3">
      {socials.map((social, i) => {
        const Icon = social.icon
        return (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-muted/50 hover:bg-accent/20 border border-border/50 hover:border-accent/50 transition-colors"
            title={social.label}
          >
            <Icon size={18} />
          </motion.a>
        )
      })}
    </div>
  )
}
