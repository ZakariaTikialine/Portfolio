"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useLocale } from "next-intl"
import { getTestimonialsContent } from "@/content/testimonials"
import type { Locale } from "@/navigation"

function Testimonials() {
  const locale = useLocale() as Locale
  const copy = getTestimonialsContent(locale)

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-8">
        {copy.heading}
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {copy.testimonials.map((test, i) => (
          <motion.div
            key={`${test.name}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.15,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 25px rgba(6, 182, 212, 0.25)",
            }}
            className="relative p-6 rounded-xl border border-border/20 bg-linear-to-tr from-accent/5 to-secondary/5 hover:from-accent/10 hover:to-secondary/10 transition-all duration-300 backdrop-blur-sm"
          >
            <motion.div
              className="absolute inset-0 rounded-xl bg-accent/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              whileHover={{ opacity: 0.2 }}
            />

            <div className="flex gap-1 mb-4">
              {[...Array(test.rating)].map((_, j) => (
                <Star key={j} size={18} className="fill-accent text-accent" />
              ))}
            </div>

            <p className="text-sm md:text-base mb-4 text-muted-foreground leading-relaxed">
              {test.content}
            </p>

            <div className="mt-4">
              <p className="font-mono font-semibold text-sm md:text-base text-foreground">
                {test.name}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                {test.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default memo(Testimonials)
