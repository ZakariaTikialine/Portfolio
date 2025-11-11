"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content:
      "Zakaria delivered exceptional work on our project. His attention to detail and technical expertise was invaluable.",
    rating: 5,
  },
  {
    name: "Alex Chen",
    role: "CEO",
    content: "Professional, responsive, and highly skilled. We look forward to working together again.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Design Lead",
    content: "Great collaboration and creative solutions. Highly recommended for any project.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold font-mono mb-6">Client Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((test, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-card border border-border/50 rounded-lg hover:border-accent/50 transition-colors"
          >
            <div className="flex gap-1 mb-3">
              {[...Array(test.rating)].map((_, j) => (
                <Star key={j} size={16} className="fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm mb-4 text-muted-foreground">{test.content}</p>
            <div>
              <p className="font-mono font-semibold text-sm">{test.name}</p>
              <p className="text-xs text-muted-foreground">{test.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
