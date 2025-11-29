import type { Locale } from "@/navigation"

export interface ProjectCard {
  id: number
  title: string
  description: string
  tech: string[]
  deployment: string
  github: string
  demo: string
}

export interface ProjectsContent {
  badge: string
  heading: string
  description: string
  tags: string[]
  stats: { label: string; value: string; detail: string }[]
  projects: ProjectCard[]
  codeLabel: string
  demoLabel: string
  stackLabel: string
}

const sharedProjects: ProjectCard[] = [
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
      "Python-based Constraint Satisfaction solver with AC-3, backtracking, and forward checking algorithms.",
    tech: ["Python", "Constraint Solving", "Algorithm Design"],
    deployment: "GitHub",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Maze Pathfinding Visualizer",
    description:
      "Interactive Next.js + TypeScript experience visualizing pathfinding algorithms with smooth animations.",
    tech: ["Next.js", "TypeScript", "React", "Framer Motion"],
    deployment: "Vercel",
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Spurious Correlation Analysis",
    description:
      "Data science notebook exploring misleading statistical correlations using pandas, matplotlib, and hypothesis testing.",
    tech: ["Python", "Pandas", "Matplotlib", "Statistics"],
    deployment: "GitHub",
    github: "#",
    demo: "#",
  },
]

const projectsContent: Record<Locale, ProjectsContent> = {
  en: {
    badge: "Featured Lab",
    heading: "Systems that went from idea to impact",
    description:
      "Selected initiatives ranging from constraint solvers to AI-powered logistics, built with production deployment in mind.",
    tags: ["Fullstack", "AI", "Data", "Tools"],
    stats: [
      { label: "Projects", value: "12+", detail: "Fullstack & AI" },
      { label: "Deployments", value: "6", detail: "Production" },
      { label: "In progress", value: "3", detail: "Research" },
    ],
    projects: sharedProjects,
    codeLabel: "Code",
    demoLabel: "Demo",
    stackLabel: "Stack overview",
  },
  fr: {
    badge: "Lab sélectionné",
    heading: "Des systèmes passés de l'idée à l'impact",
    description:
      "Quelques initiatives, des solveurs de contraintes aux logistiques IA, pensées pour la mise en production.",
    tags: ["Fullstack", "IA", "Données", "Outils"],
    stats: [
      { label: "Projets", value: "12+", detail: "Fullstack & IA" },
      { label: "Déploiements", value: "6", detail: "Production" },
      { label: "En cours", value: "3", detail: "Recherche" },
    ],
    projects: sharedProjects,
    codeLabel: "Code",
    demoLabel: "Démo",
    stackLabel: "Stack technique",
  },
  ar: {
    badge: "مختبر مميز",
    heading: "أنظمة انتقلت من الفكرة إلى الأثر",
    description:
      "مختارات من المبادرات، من محللات القيود إلى اللوجستيات المدعومة بالذكاء الاصطناعي، جاهزة للإطلاق.",
    tags: ["متكامل", "ذكاء اصطناعي", "بيانات", "أدوات"],
    stats: [
      { label: "المشاريع", value: "12+", detail: "منتجات متكاملة وذكاء اصطناعي" },
      { label: "النشرات", value: "6", detail: "جاهز للإنتاج" },
      { label: "قيد العمل", value: "3", detail: "بحث" },
    ],
    projects: sharedProjects,
    codeLabel: "الشيفرة",
    demoLabel: "عرض حي",
    stackLabel: "نظرة على المكدس",
  },
}

export function getProjectsContent(locale: Locale): ProjectsContent {
  return projectsContent[locale] ?? projectsContent.en
}
