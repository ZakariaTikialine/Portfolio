"use client";

import { motion } from "framer-motion";
import { Folder, Trophy, Users, Code2 } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "20", icon: <Folder size={32} className="text-accent" /> },
  { label: "Years Experience", value: "4+", icon: <Trophy size={32} className="text-accent" /> },
  { label: "Happy Clients", value: "4", icon: <Users size={32} className="text-accent" /> },
  { label: "Code Commits", value: "150", icon: <Code2 size={32} className="text-accent" /> },
];

export default function StatsDashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
          className="p-6 bg-gradient-to-tr from-accent/5 to-secondary/5 border border-border/20 rounded-xl shadow-lg hover:shadow-xl hover:border-accent/50 transition-all duration-300 text-center flex flex-col items-center justify-center"
        >
          <div className="mb-3">{stat.icon}</div>
          <div className="text-3xl font-extrabold text-accent mb-1">{stat.value}</div>
          <div className="text-sm text-muted-foreground font-mono">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
