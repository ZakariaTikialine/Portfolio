"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const categories = ["All", "Web", "Mobile", "Data Science", "AI"]

export default function ProjectFilter({ onFilter }: { onFilter: (category: string) => void }) {
  const [active, setActive] = useState("All")

  const handleFilter = (category: string) => {
    setActive(category)
    onFilter(category)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => handleFilter(cat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
            active === cat ? "bg-accent text-background" : "bg-muted/50 text-foreground hover:bg-muted"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  )
}
