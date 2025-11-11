import { Code2, Database, Brain, Wrench } from "lucide-react"

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Backend",
      icon: Database,
      skills: ["Node.js", "Express.js", "Go", "PostgreSQL", "Railway"],
    },
    {
      title: "Data & AI",
      icon: Brain,
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"],
    },
    {
      title: "Tools & DevOps",
      icon: Wrench,
      skills: ["Git", "Docker", "Vercel", "Railway", "System Design"],
    },
  ]

  return (
    <section id="skills" className="py-20 md:py-32 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Skills & Tech Stack</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className="p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 hover:bg-card/80 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={24} className="text-accent group-hover:text-secondary transition-colors" />
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
