import type { Dictionary } from "../types"

export const en: Dictionary = {
  meta: {
    title: "Zakaria Tikialine · Full-Stack Developer, AI & Data Science",
    description:
      "Full-stack developer and final-year AI & Data Science engineering student. Next.js, Node.js, Go, PostgreSQL and machine learning in Python. Based in Algeria, open to remote work.",
  },
  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Switch between light and dark theme",
    language: "Language",
    backToTop: "Back to top",
    opensInNewTab: "opens in a new tab",
  },
  nav: {
    work: "Work",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    role: "Full-Stack Developer · AI & Data Science",
    summary:
      "I build production web apps with Next.js and Node.js, and machine-learning pipelines in Python. Currently Front-End Developer at Egor Gaming.",
    status: "Final-year engineering student · Graduating June\u00A02027",
    availability: "Open to opportunities",
    location: "Blida, Algeria · Remote",
    ctaCv: "Download CV",
    ctaContact: "Contact me",
  },
  layers: {
    interface: "Interface",
    api: "API",
    model: "Model",
    data: "Data",
  },
  stack: {
    title: "The stack I work across",
    hint: "Hover or tap a layer to see where I've used it.",
    projectCount: { one: "# project", other: "# projects" },
  },
  projects: {
    tahwisa: {
      title: "Tahwisa",
      summary:
        "Employee travel platform used across multiple NAFTAL centers. REST API with role-based access control, PostgreSQL schema and Next.js frontend.",
    },
    guardly: {
      title: "Guardly",
      summary:
        "Go backend for an AI anomaly-detection system. It receives model events, stores them in PostgreSQL and alerts users by push notification and email.",
    },
    "graph-ml": {
      title: "Email Network Graph ML",
      summary:
        "Node2Vec embeddings on the Email-EU-Core network for department classification and link prediction (AUC 0.74).",
    },
    "maze-solver": {
      title: "Maze Solver",
      summary: "Interactive visualizer that compares BFS, DFS and A* pathfinding step by step.",
    },
  },
  footer: {
    rights: "All rights reserved.",
    source: "Source on GitHub",
  },
}
