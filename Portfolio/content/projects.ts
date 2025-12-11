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

const projectsEn: ProjectCard[] = [
  {
    id: 1,
    title: "Tahwisa NAFTAL Frontend",
    description:
      "Fullstack web app for company trip registrations with RBAC, CSV export, winner auto-generation, and admin dashboards.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "CSS"],
    deployment: "Vercel",
    github: "https://github.com/ZakariaTikialine/Tahwisa-frontend",
    demo: "https://tahwisa.vercel.app/",
  },
  {
    id: 2,
    title: "Tahwisa NAFTAL Backend",
    description:
      "RESTful API backend for trip management system with authentication, role-based access control, and database management.",
    tech: ["Express.js", "PostgreSQL", "Node.js", "JWT", "JavaScript"],
    deployment: "Railway",
    github: "https://github.com/ZakariaTikialine/Tahwisa-backend",
    demo: "https://github.com/ZakariaTikialine/Tahwisa-backend",
  },
]

const projectsFr: ProjectCard[] = [
  {
    id: 1,
    title: "Tahwisa NAFTAL Frontend",
    description:
      "Application web fullstack pour les inscriptions aux voyages d'entreprise avec RBAC, export CSV, génération automatique des gagnants et tableaux de bord admin.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "CSS"],
    deployment: "Vercel",
    github: "https://github.com/ZakariaTikialine/Tahwisa-frontend",
    demo: "https://tahwisa.vercel.app/",
  },
  {
    id: 2,
    title: "Tahwisa NAFTAL Backend",
    description:
      "API backend RESTful pour le système de gestion des voyages avec authentification, contrôle d'accès basé sur les rôles et gestion de base de données.",
    tech: ["Express.js", "PostgreSQL", "Node.js", "JWT", "JavaScript"],
    deployment: "Railway",
    github: "https://github.com/ZakariaTikialine/Tahwisa-backend",
    demo: "https://github.com/ZakariaTikialine/Tahwisa-backend",
  },
]

const projectsAr: ProjectCard[] = [
  {
    id: 1,
    title: "تحويسة نفطال - الواجهة الأمامية",
    description:
      "تطبيق ويب متكامل لتسجيل رحلات الشركة مع التحكم بالصلاحيات، تصدير CSV، توليد الفائزين تلقائياً، ولوحات تحكم المسؤولين.",
    tech: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS", "CSS"],
    deployment: "Vercel",
    github: "https://github.com/ZakariaTikialine/Tahwisa-frontend",
    demo: "https://tahwisa.vercel.app/",
  },
  {
    id: 2,
    title: "تحويسة نفطال - الخادم الخلفي",
    description:
      "واجهة برمجة تطبيقات RESTful لنظام إدارة الرحلات مع المصادقة والتحكم بالوصول المبني على الأدوار وإدارة قواعد البيانات.",
    tech: ["Express.js", "PostgreSQL", "Node.js", "JWT", "JavaScript"],
    deployment: "Railway",
    github: "https://github.com/ZakariaTikialine/Tahwisa-backend",
    demo: "https://github.com/ZakariaTikialine/Tahwisa-backend",
  },
]

const projectsContent: Record<Locale, ProjectsContent> = {
  en: {
    badge: "Featured Lab",
    heading: "Systems that went from idea to impact",
    description:
      "Selected projects ranging from fullstack web apps to AI experiments, built with production deployment in mind.",
    tags: ["Fullstack", "AI", "Data", "Tools"],
    stats: [
      { label: "Projects", value: "10+", detail: "Fullstack & AI" },
      { label: "Deployments", value: "5", detail: "Production" },
      { label: "In progress", value: "...", detail: "Research" },
    ],
    projects: projectsEn,
    codeLabel: "Code",
    demoLabel: "Demo",
    stackLabel: "Stack overview",
  },
  fr: {
    badge: "Lab sélectionné",
    heading: "Des systèmes passés de l'idée à l'impact",
    description:
      "Projets sélectionnés allant des apps web fullstack aux expérimentations IA, pensés pour la mise en production.",
    tags: ["Fullstack", "IA", "Données", "Outils"],
    stats: [
      { label: "Projets", value: "10+", detail: "Fullstack & IA" },
      { label: "Déploiements", value: "5", detail: "Production" },
      { label: "En cours", value: "...", detail: "Recherche" },
    ],
    projects: projectsFr,
    codeLabel: "Code",
    demoLabel: "Démo",
    stackLabel: "Stack technique",
  },
  ar: {
    badge: "مختبر مميز",
    heading: "أنظمة انتقلت من الفكرة إلى الأثر",
    description:
      "مشاريع مختارة تتراوح بين تطبيقات ويب متكاملة وتجارب ذكاء اصطناعي، جاهزة للإطلاق.",
    tags: ["متكامل", "ذكاء اصطناعي", "بيانات", "أدوات"],
    stats: [
      { label: "المشاريع", value: "+10", detail: "متكامل وذكاء اصطناعي" },
      { label: "النشرات", value: "5", detail: "جاهز للإنتاج" },
      { label: "قيد العمل", value: "...", detail: "بحث" },
    ],
    projects: projectsAr,
    codeLabel: "الشيفرة",
    demoLabel: "عرض حي",
    stackLabel: "نظرة على المكدس",
  },
}

export function getProjectsContent(locale: Locale): ProjectsContent {
  return projectsContent[locale] ?? projectsContent.en
}
