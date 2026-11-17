import type { Layer, ProjectFacts, RoleFacts } from "./types"

/**
 * Language-independent facts. Source of truth: public/ZakariaTikialineCV.pdf and the linked
 * repositories. Do not add a number here unless the CV or a repository backs it.
 */

const GITHUB = "https://github.com/ZakariaTikialine"

export const profile = {
  name: {
    latin: "Zakaria Tikialine",
    arabic: "زكرياء تيكيالين",
  },
  email: "zakariatikia@gmail.com",
  links: {
    github: GITHUB,
    linkedin: "https://www.linkedin.com/in/zakaria-tikialine",
    cv: "/ZakariaTikialineCV.pdf",
    source: `${GITHUB}/Portfolio`,
  },
  portrait: "/professional-developer-portrait.png",

  /**
   * Tools per layer, as listed on the CV, most important first. The hero shows the first few;
   * the skills section shows them all.
   */
  stack: {
    interface: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML & CSS"],
    api: ["Node.js", "Express.js", "Go", "REST APIs", "RBAC", "JWT", "WebSockets"],
    model: ["Python", "scikit-learn", "Regression", "Classification", "Feature engineering"],
    data: [
      "PostgreSQL",
      "MongoDB",
      "Pandas",
      "NumPy",
      "Talend (ETL)",
      "SQL",
      "Oracle",
      "Matplotlib",
    ],
  } as const satisfies Record<Layer, readonly string[]>,

  tooling: ["Git", "Docker", "Linux", "Vercel", "Railway"],

  projects: [
    {
      slug: "tahwisa",
      layers: ["interface", "api", "data"],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Express.js",
        "Node.js",
        "PostgreSQL",
        "JWT",
      ],
      featured: true,
      period: { start: "2025-06", end: "2025-07" },
      demo: "https://tahwisa.vercel.app",
      repos: [
        { label: "Frontend", url: `${GITHUB}/Tahwisa-frontend` },
        { label: "Backend", url: `${GITHUB}/Tahwisa-backend` },
      ],
    },
    {
      slug: "guardly",
      layers: ["api", "data"],
      stack: ["Go", "Gin", "GORM", "PostgreSQL", "JWT", "Firebase", "Docker"],
      featured: true,
      repos: [{ label: "Backend", url: `${GITHUB}/Guardly-Backend` }],
    },
    {
      slug: "graph-ml",
      layers: ["model", "data"],
      stack: ["Python", "Node2Vec", "Jupyter"],
      featured: true,
      repos: [{ label: "Notebooks", url: `${GITHUB}/email-eu-core-graph-ml` }],
    },
    {
      slug: "maze-solver",
      layers: ["interface"],
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      featured: false,
      repos: [{ label: "Source", url: `${GITHUB}/maze-solver-robot` }],
    },
  ] as const satisfies readonly ProjectFacts[],

  experience: [
    {
      id: "egor",
      organization: "Egor Gaming",
      url: "https://egorgaming.com",
      period: { start: "2026-05", end: null },
      layers: ["interface"],
      stack: ["Next.js", "React", "TypeScript"],
    },
    {
      id: "naftal",
      organization: "NAFTAL",
      period: { start: "2025-06", end: "2025-07" },
      layers: ["interface", "api", "data"],
      stack: ["Next.js", "TypeScript", "Express.js", "PostgreSQL"],
      project: "tahwisa",
    },
  ] as const satisfies readonly RoleFacts[],

  community: [
    {
      id: "school-of-ai",
      organization: "School of AI Club, Bejaia",
      period: { start: "2026-01", end: null },
    },
    {
      id: "nexus",
      organization: "Nexus Security Club, ESTIN",
      period: { start: "2024-08", end: "2025-08" },
    },
  ],

  education: {
    institution: "ESTIN",
    url: "https://estin.dz",
    period: { start: "2022-09", end: "2027-06" },
  },

  certifications: [
    {
      id: "datacamp-ads",
      issuer: "DataCamp",
      evidence: `${GITHUB}/HouseSales-Assosiate-Data-Scientist-Exam-DP501`,
    },
  ],
} as const

export type ProjectSlug = (typeof profile.projects)[number]["slug"]
export type RoleId = (typeof profile.experience)[number]["id"]
export type CommunityId = (typeof profile.community)[number]["id"]
