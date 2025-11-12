"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content:
      "Zakaria delivered exceptional work on our project. His attention to detail and technical expertise were invaluable.",
    rating: 5,
  },
  {
    name: "Alex Chen",
    role: "CEO",
    content:
      "Professional, responsive, and highly skilled. We look forward to collaborating again in the future.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Design Lead",
    content:
      "Great collaboration and creative solutions. Zakaria brings both technical depth and a strong design mindset.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold font-mono text-center mb-8">
        Client Testimonials
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, i) => (
          <motion.div
            key={i}
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
            className="relative p-6 rounded-xl border border-border/20 bg-gradient-to-tr from-accent/5 to-secondary/5 hover:from-accent/10 hover:to-secondary/10 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Glow accent on hover */}
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
              “{test.content}”
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
  );
}
