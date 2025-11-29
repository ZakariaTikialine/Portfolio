import type { Locale } from "@/navigation"

export interface TechnicalBlock {
  title: string
  icon: string
  description: string
  skills: string[]
}

export interface FocusTrack {
  title: string
  detail: string
  stack: string
}

export interface SkillsContent {
  badge: string
  heading: string
  description: string
  stats: { label: string; value: string }[]
  focusTracks: FocusTrack[]
  technicalBlocks: TechnicalBlock[]
  transversal: string[]
  certifications: string[]
  focusLabel: string
  blockLabel: string
  stackLabel: string
  transversalTitle: string
  transversalSubtitle: string
  certificationsTitle: string
  certificationsSubtitle: string
}

const sharedTechnical = {
  languages: {
    icon: "globe",
  },
  frontend: { icon: "code" },
  backend: { icon: "server" },
  data: { icon: "brain" },
  database: { icon: "database" },
  collaboration: { icon: "users" },
  cloud: { icon: "cloud" },
}

const skillsContent: Record<Locale, SkillsContent> = {
  en: {
    badge: "Skills",
    heading: "A solid technical base built for impact",
    description:
      "From AI-augmented logistics to fullstack delivery, every tool is chosen for fast execution and quality.",
    stats: [
      { label: "Languages mastered", value: "3" },
      { label: "Core stack", value: "Fullstack" },
      { label: "Current focus", value: "AI & DS" },
    ],
    focusLabel: "Focus track",
    blockLabel: "Block",
    stackLabel: "Stack & key tools",
    transversalTitle: "Transversal skills",
    transversalSubtitle: "Soft skills steering the way of working.",
    certificationsTitle: "Certifications & online courses",
    certificationsSubtitle: "Continuous learning and specialization.",
    focusTracks: [
      {
        title: "AI × Operations",
        detail: "Automation for logistics, copilots, and dashboards",
        stack: "Next.js, Python, LLM APIs",
      },
      {
        title: "Developer Experience",
        detail: "Tooling, living docs, and design systems",
        stack: "Node.js, CLIs, Storybook",
      },
      {
        title: "Data Storytelling",
        detail: "Visualizations and insights for decision-makers",
        stack: "React, Tailwind CSS, DataViz",
      },
    ],
    technicalBlocks: [
      {
        title: "Languages",
        icon: sharedTechnical.languages.icon,
        description: "Trilingual communication",
        skills: ["Arabic — native", "English — intermediate", "French — B2 (TCF)"],
      },
      {
        title: "Frontend development",
        icon: sharedTechnical.frontend.icon,
        description: "Modern and accessible interfaces",
        skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
      },
      {
        title: "Backend development",
        icon: sharedTechnical.backend.icon,
        description: "Reliable and realtime services",
        skills: ["Node.js", "Express.js", "Go", "REST APIs", "WebSockets", "Socket.io"],
      },
      {
        title: "Data Science & AI",
        icon: sharedTechnical.data.icon,
        description: "Experimentation and ML prototyping",
        skills: ["Python", "Pandas", "NumPy", "scikit-learn", "Jupyter", "Matplotlib", "DataCamp (Intermediate)"]
      },
      {
        title: "Databases",
        icon: sharedTechnical.database.icon,
        description: "Structured and distributed storage",
        skills: ["MongoDB", "PostgreSQL", "Oracle SQL", "Distributed databases"],
      },
      {
        title: "Collaboration",
        icon: sharedTechnical.collaboration.icon,
        description: "Efficient team workflows",
        skills: ["Git", "GitHub", "Trello", "Discord"],
      },
      {
        title: "Cloud & Deployment",
        icon: sharedTechnical.cloud.icon,
        description: "Iterative production releases",
        skills: ["Vercel", "Heroku", "Railway"],
      },
    ],
    transversal: [
      "Time management and organization",
      "Teamwork and clear communication",
      "Analytical thinking and problem solving",
      "Intellectual curiosity and continuous learning",
      "Adaptability and autonomy",
    ],
    certifications: [
      "CS50 Introduction to AI",
      "Data Science in Python — DataCamp",
      "Machine Learning & Deep Learning",
    ],
  },
  fr: {
    badge: "Compétences",
    heading: "Une base technique solide, orientée impact",
    description:
      "De la logistique augmentée par l’IA à la livraison fullstack, chaque outil est aligné sur l’exécution rapide et la qualité.",
    stats: [
      { label: "Langues maîtrisées", value: "3" },
      { label: "Stack principal", value: "Fullstack" },
      { label: "Focus actuel", value: "IA & DS" },
    ],
    focusLabel: "Piste focus",
    blockLabel: "Bloc",
    stackLabel: "Stack & outils principaux",
    transversalTitle: "Compétences transversales",
    transversalSubtitle: "Soft skills qui pilotent la manière de travailler.",
    certificationsTitle: "Certifications & cours en ligne",
    certificationsSubtitle: "Veille technique et spécialisation continue.",
    focusTracks: [
      {
        title: "AI × Operations",
        detail: "Automatisation logistique, copilotes et dashboards",
        stack: "Next.js, Python, APIs LLM",
      },
      {
        title: "Developer Experience",
        detail: "Tooling, documentation vivante et design systems",
        stack: "Node.js, CLIs, Storybook",
      },
      {
        title: "Data Storytelling",
        detail: "Visualisations et insights pour décideurs",
        stack: "React, Tailwind CSS, DataViz",
      },
    ],
    technicalBlocks: [
      {
        title: "Langues",
        icon: sharedTechnical.languages.icon,
        description: "Communication trilingue",
        skills: ["Arabe — langue maternelle", "Anglais — intermédiaire", "Français — B2 (TCF)"],
      },
      {
        title: "Développement Frontend",
        icon: sharedTechnical.frontend.icon,
        description: "Interfaces modernes et accessibles",
        skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
      },
      {
        title: "Développement Backend",
        icon: sharedTechnical.backend.icon,
        description: "Services fiables et temps réel",
        skills: ["Node.js", "Express.js", "Golang", "API REST", "WebSockets", "Socket.io"],
      },
      {
        title: "Data Science & IA",
        icon: sharedTechnical.data.icon,
        description: "Expérimentation et prototypage ML",
        skills: ["Python", "Pandas", "NumPy", "scikit-learn", "Jupyter", "Matplotlib", "DataCamp (Intermédiaire)"]
      },
      {
        title: "Bases de données",
        icon: sharedTechnical.database.icon,
        description: "Stockage structuré et distribué",
        skills: ["MongoDB", "PostgreSQL", "Oracle SQL", "Bases de données distribuées"],
      },
      {
        title: "Collaboration",
        icon: sharedTechnical.collaboration.icon,
        description: "Flux d'équipes efficaces",
        skills: ["Git", "GitHub", "Trello", "Discord"],
      },
      {
        title: "Cloud & Déploiement",
        icon: sharedTechnical.cloud.icon,
        description: "Mise en production itérative",
        skills: ["Vercel", "Heroku", "Railway"],
      },
    ],
    transversal: [
      "Gestion du temps et sens de l’organisation",
      "Travail en équipe et communication efficace",
      "Esprit d’analyse et résolution de problèmes",
      "Curiosité intellectuelle et apprentissage continu",
      "Adaptabilité et autonomie",
    ],
    certifications: [
      "Introduction à l’IA avec CS50 — Harvard / edX",
      "Data Science en Python — DataCamp",
      "Machine Learning & Deep Learning",
    ],
  },
  ar: {
    badge: "المهارات",
    heading: "قاعدة تقنية متينة موجّهة للأثر",
    description:
      "من اللوجستيات المدعومة بالذكاء الاصطناعي إلى التسليم المتكامل، تُختار الأدوات بما يخدم السرعة والجودة.",
    stats: [
      { label: "اللغات المتقنة", value: "3" },
      { label: "المكدس الأساسي", value: "Fullstack" },
      { label: "التركيز الحالي", value: "ذكاء اصطناعي وبيانات" },
    ],
    focusLabel: "مسار تركيز",
    blockLabel: "الوحدة",
    stackLabel: "التقنيات والأدوات",
    transversalTitle: "مهارات عرضية",
    transversalSubtitle: "قدرات شخصية تنظّم طريقة العمل.",
    certificationsTitle: "شهادات ودورات عبر الإنترنت",
    certificationsSubtitle: "تعلّم مستمر وتخصص متدرج.",
    focusTracks: [
      {
        title: "الذكاء الاصطناعي × العمليات",
        detail: "أتمتة لوجستية، مساعدين ولوحات تحكم",
        stack: "Next.js، Python، واجهات LLM",
      },
      {
        title: "تجربة المطور",
        detail: "أدوات، توثيق حي، وأنظمة تصميم",
        stack: "Node.js، أدوات سطر الأوامر، Storybook",
      },
      {
        title: "سرد البيانات",
        detail: "تصوير ومعرفة لصانعي القرار",
        stack: "React، Tailwind CSS، DataViz",
      },
    ],
    technicalBlocks: [
      {
        title: "اللغات",
        icon: sharedTechnical.languages.icon,
        description: "تواصل بثلاث لغات",
        skills: ["العربية — لغة أم", "الإنجليزية — متوسط", "الفرنسية — B2"],
      },
      {
        title: "تطوير الواجهة الأمامية",
        icon: sharedTechnical.frontend.icon,
        description: "واجهات حديثة وسهلة الوصول",
        skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
      },
      {
        title: "تطوير الواجهة الخلفية",
        icon: sharedTechnical.backend.icon,
        description: "خدمات موثوقة وفي الزمن الحقيقي",
        skills: ["Node.js", "Express.js", "Golang", "واجهات REST", "WebSockets", "Socket.io"],
      },
      {
        title: "علم البيانات والذكاء الاصطناعي",
        icon: sharedTechnical.data.icon,
        description: "تجارب ونماذج أولية للتعلم الآلي",
        skills: ["Python", "Pandas", "NumPy", "scikit-learn", "Jupyter", "Matplotlib", "DataCamp (متوسط)"]
      },
      {
        title: "قواعد البيانات",
        icon: sharedTechnical.database.icon,
        description: "تخزين منظم وموزع",
        skills: ["MongoDB", "PostgreSQL", "Oracle SQL", "قواعد بيانات موزعة"],
      },
      {
        title: "التعاون",
        icon: sharedTechnical.collaboration.icon,
        description: "تدفقات عمل فعّالة",
        skills: ["Git", "GitHub", "Trello", "Discord"],
      },
      {
        title: "السحابة والنشر",
        icon: sharedTechnical.cloud.icon,
        description: "إطلاقات إنتاجية تدريجية",
        skills: ["Vercel", "Heroku", "Railway"],
      },
    ],
    transversal: [
      "إدارة الوقت والتنظيم",
      "العمل الجماعي والتواصل الواضح",
      "تفكير تحليلي وحل المشكلات",
      "فضول فكري وتعلّم مستمر",
      "قدرة على التكيّف والاستقلالية",
    ],
    certifications: [
      "CS50 مقدمة في الذكاء الاصطناعي",
      "علم البيانات بلغة Python — DataCamp",
      "التعلم الآلي والتعلم العميق",
    ],
  },
}

export function getSkillsContent(locale: Locale): SkillsContent {
  return skillsContent[locale] ?? skillsContent.en
}
