"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  deployment: string
  github: string
  demo: string
}

const Projects = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const projects: Project[] = [
    {
      id: 1,
      title: "Tahwisa NAFTAL",
      description:
        "Fullstack web app for company trip registrations with RBAC, CSV export, winner auto-generation, and admin dashboards.",
      tech: ["Next.js", "Express.js", "PostgreSQL", "React", "TypeScript"],
      deployment: "Railway",
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "University Timetable Scheduler",
      description:
        "Python-based Constraint Satisfaction Problem solver with AC-3, backtracking, and forward checking algorithms.",
      tech: ["Python", "Constraint Solving", "Algorithm Design"],
      deployment: "GitHub",
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "Maze Pathfinding Visualizer",
      description:
        "Interactive Next.js + TypeScript project visualizing pathfinding algorithms with smooth animations and step-by-step execution.",
      tech: ["Next.js", "TypeScript", "React", "Framer Motion"],
      deployment: "Vercel",
      github: "#",
      demo: "#",
    },
    {
      id: 4,
      title: "Spurious Correlation Analysis",
      description:
        "Data science notebook analyzing misleading statistical correlations using pandas, matplotlib, and statistical testing.",
      tech: ["Python", "Pandas", "Matplotlib", "Statistics"],
      deployment: "GitHub",
      github: "#",
      demo: "#",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="projects" className="py-20 md:py-32 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 opacity-20 h-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-l border-accent/20" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full" />
          <p className="text-muted-foreground mt-4">
            A collection of projects showcasing expertise in fullstack development, data science, and algorithm design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm hover:border-accent/50 hover:bg-card/60 transition-all duration-300 overflow-hidden"
            >
              {/* Animated background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.1), transparent 80%)`,
                }}
              />

              {/* Number badge */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-sm font-bold text-accent-foreground opacity-80 group-hover:opacity-100 transition-opacity">
                {String(project.id).padStart(2, "0")}
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-border/50 hover:bg-muted flex-1 bg-transparent"
                  >
                    <Github size={14} className="mr-1" />
                    Code
                  </Button>
                  <Button size="sm" className="text-xs bg-accent hover:bg-accent/90 text-accent-foreground flex-1">
                    <ExternalLink size={14} className="mr-1" />
                    Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
