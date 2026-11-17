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
    home: "Home",
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
    status: "Final-year engineering student · Graduating June 2027",
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
  work: {
    eyebrow: "Work",
    title: "Selected projects",
    intro:
      "Products I build and ship: a live esports platform, an internship app in production, and backend and machine-learning work.",
    featured: "Featured",
    alsoBuilt: "Also built",
    live: { demo: "Live demo", platform: "Live platform" },
    repoKinds: {
      frontend: "Frontend code",
      backend: "Backend code",
      source: "Source code",
      notebooks: "Notebooks",
    },
    moreOnGitHub: "More on GitHub",
    layersLabel: "Layers",
  },
  projects: {
    egor: {
      title: "Egor Gaming",
      role: "Front-End Developer · current role",
      summary:
        "Algeria's esports platform for tournaments, arenas, teams and rankings. I build and maintain its Next.js frontend as part of the product team.",
      points: [
        "Typed React components in TypeScript across the live platform",
        "Moved the frontend from a flat components folder to a feature-based architecture",
        "Migrated most product domains and documented the approach for the team",
      ],
      imageAlt: "Egor Gaming arenas page: esports communities and tournaments",
    },
    tahwisa: {
      title: "Tahwisa",
      role: "Full-stack · NAFTAL internship",
      summary:
        "Employee travel-management platform used across multiple NAFTAL centers for seasonal campaigns. I built it end to end and helped ship it to production.",
      points: [
        "REST API with JWT authentication and role-based access control",
        "PostgreSQL schema designed for consistent data and responsive queries",
        "Next.js and TypeScript frontend with admin dashboards",
        "Automated participant selection for each campaign",
      ],
      imageAlt: "Tahwisa home page: travel rewards for NAFTAL employees",
    },
    guardly: {
      title: "Guardly",
      role: "Backend",
      summary:
        "Go backend for an AI anomaly-detection system. It receives events from a model running on users' machines, stores them and alerts the right people.",
      points: [
        "REST endpoint that ingests anomaly events into PostgreSQL",
        "JWT-protected routes, event filtering and a statistics endpoint",
        "Push notifications with Firebase and email alerts over SMTP",
        "Packaged with Docker",
      ],
    },
    "graph-ml": {
      title: "Email Network Graph ML",
      role: "Machine learning",
      summary:
        "Graph machine learning on the Email-EU-Core network: Node2Vec embeddings used to classify researchers by department and to predict links.",
      points: [
        "Node2Vec embeddings learned from the email graph",
        "Department classification from the embeddings",
        "Link prediction with cosine similarity, AUC 0.74",
      ],
    },
    "maze-solver": {
      title: "Maze Solver",
      role: "Frontend · algorithms",
      summary: "Interactive visualizer that compares BFS, DFS and A* pathfinding step by step.",
      points: ["Live metrics: path length, nodes visited and run time"],
    },
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've worked",
    present: "Present",
    current: "Current",
    communityTitle: "Community & leadership",
  },
  roles: {
    egor: {
      title: "Front-End Developer",
      context: "Algeria's esports platform: tournaments, teams and leaderboards",
      location: "Remote",
      points: [
        "Build and maintain the frontend of the live Next.js platform with typed React components in TypeScript.",
        "Reorganized the frontend from a flat components folder into a feature-based structure that is easier to navigate and extend.",
        "Moved most of the app's domains to the new structure and documented the approach for the team.",
      ],
    },
    naftal: {
      title: "Full-Stack Web Developer Intern",
      context: "Central Information Systems Directorate",
      location: "Algeria",
      points: [
        "Built and deployed Tahwisa, an employee travel-management app used across multiple centers.",
        "Set up the REST API with authentication and role-based access control.",
        "Designed the PostgreSQL schema and tuned queries for consistency and speed.",
        "Developed the Next.js and TypeScript frontend and helped ship it to production.",
      ],
    },
  },
  community: {
    "school-of-ai": {
      title: "Technical Assistant",
      summary:
        "Help run workshops on machine learning, deep learning and backend development, and guide participants through hands-on Python sessions.",
    },
    nexus: {
      title: "Logistics Manager",
      summary:
        "Ran logistics and technical setup for cybersecurity competitions with 75+ participants.",
    },
  },
  skills: {
    eyebrow: "Skills",
    title: "The full stack",
    intro: "Everything I work with, grouped by the layer of the system it belongs to.",
    tooling: "Tooling",
    spokenLanguages: "Languages",
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "French", level: "B2 · TCF" },
      { name: "English", level: "Professional" },
    ],
  },
  education: {
    eyebrow: "Education",
    title: "Education & certification",
    degree: "State Engineer in Computer Science",
    field: "Artificial Intelligence & Data Science",
    institution: "École Supérieure en Sciences et Technologies de l'Informatique (ESTIN)",
    note: "Final year · final project defense in June 2027",
    certificationLabel: "Certification",
    certification: "Associate Data Scientist",
    certificationNote: "Professional certification in Python, statistics and machine learning",
    evidence: "Exam project",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's work together",
    intro:
      "I'm open to full-time roles, internships and freelance work. Email is the fastest way to reach me.",
    emailLabel: "Email",
    copy: "Copy",
    copied: "Copied",
    elsewhere: "Elsewhere",
    form: {
      title: "Send a message",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      success: "Thanks, your message was sent. I'll reply by email.",
      error: "The message couldn't be sent. Please email me directly instead.",
    },
  },
  notFound: {
    title: "This page doesn't exist",
    body: "The link may be outdated, or the page has moved.",
    home: "Go to the homepage",
  },
  footer: {
    rights: "All rights reserved.",
    source: "Source on GitHub",
  },
}
