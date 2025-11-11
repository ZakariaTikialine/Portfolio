"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    id: 1,
    title: "Senior Fullstack Developer",
    company: "Tech Innovators Inc.",
    period: "2023 - Present",
    description:
      "Leading development of scalable web applications using Next.js and Node.js. Mentoring junior developers and architecting microservices.",
    achievements: ["Built 5+ production apps", "Led team of 4 developers", "Improved performance by 40%"],
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "AI Solutions Ltd.",
    period: "2021 - 2023",
    description: "Developed ML models for predictive analytics and data visualization dashboards.",
    achievements: ["Created 3 ML models", "Processed 100GB+ data", "Achieved 95% accuracy"],
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "Web Concepts",
    period: "2020 - 2021",
    description: "Built responsive web applications and maintained legacy codebases.",
    achievements: ["Developed 10+ websites", "Improved load time by 50%", "Fixed 200+ bugs"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Experience</h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 pb-8 border-l-2 border-accent/30 hover:border-accent/60 transition-colors"
            >
              <div className="absolute -left-3 top-0 w-4 h-4 rounded-full bg-accent border-4 border-background" />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-accent">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
                <p className="text-foreground/80 mt-3">{exp.description}</p>
                <ul className="mt-3 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
