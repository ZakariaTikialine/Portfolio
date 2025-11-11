"use client"

import { motion } from "framer-motion"

const educationList = [
  {
    id: 1,
    degree: "Master of Science in Data Science",
    institution: "University of Technology",
    year: "2019 - 2021",
    details: "Specialized in Machine Learning and AI. GPA: 3.9/4.0",
    courses: ["Advanced ML", "Deep Learning", "Data Engineering", "AI Ethics"],
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    year: "2015 - 2019",
    details: "Foundation in software engineering and computer science principles.",
    courses: ["Data Structures", "Algorithms", "Web Development", "Databases"],
  },
  {
    id: 3,
    degree: "Full Stack Web Development Bootcamp",
    institution: "Dev Academy",
    year: "2020",
    details: "Intensive 12-week bootcamp focusing on modern web technologies.",
    courses: ["React", "Node.js", "MongoDB", "AWS"],
  },
]

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Education</h2>
        </motion.div>

        <div className="space-y-8">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-lg border border-border/30 hover:border-accent/50 transition-all hover:bg-accent/5"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-accent mt-1">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {edu.year}
                  </span>
                </div>

                <p className="text-foreground/80 text-sm mt-3">{edu.details}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {edu.courses.map((course) => (
                    <span
                      key={course}
                      className="text-xs px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
