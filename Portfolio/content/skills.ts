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
  blockIndexLabel: string
  stackLabel: string
  transversalTitle: string
  transversalSubtitle: string
  certificationsTitle: string
  certificationsSubtitle: string
  certificationsNote: string
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
      "From fullstack web development to AI exploration, every tool is chosen for building meaningful digital experiences.",
    stats: [
      { label: "Languages mastered", value: "3" },
      { label: "Core stack", value: "Fullstack" },
      { label: "Current focus", value: "AI & DS" },
    ],
    focusLabel: "Focus track",
    blockLabel: "Block",
    blockIndexLabel: "Block",
    stackLabel: "Stack & key tools",
    transversalTitle: "Transversal skills",
    transversalSubtitle: "Soft skills steering the way of working.",
    certificationsTitle: "Certifications & online courses",
    certificationsSubtitle: "Continuous learning and specialization.",
    certificationsNote: "Verified session and guided practice",
    focusTracks: [
      {
        title: "AI & Machine Learning",
        detail: "Building ML models, deep learning experiments, and data pipelines",
        stack: "Python, TensorFlow, scikit-learn",
      },
      {
        title: "Fullstack Development",
        detail: "End-to-end web apps with modern frameworks and clean architecture",
        stack: "Next.js, Node.js, PostgreSQL",
      },
      {
        title: "Data Visualization",
        detail: "Dashboards and insights for decision-makers",
        stack: "React, Tailwind CSS, Recharts",
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
        skills: ["Docker", "Linux", "Vercel", "Railway", "Git"],
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
      "Associate Data Scientist — DataCamp (Professional Certification)",
      "Machine Learning & Deep Learning Specializations",
    ],
  },
  fr: {
    badge: "Compétences",
    heading: "Une base technique solide, orientée impact",
    description:
      "Du développement fullstack à l'exploration de l'IA, chaque outil est choisi pour créer des expériences numériques significatives.",
    stats: [
      { label: "Langues maîtrisées", value: "3" },
      { label: "Stack principal", value: "Fullstack" },
      { label: "Focus actuel", value: "IA & DS" },
    ],
    focusLabel: "Piste focus",
    blockLabel: "Bloc",
    blockIndexLabel: "Bloc",
    stackLabel: "Stack & outils principaux",
    transversalTitle: "Compétences transversales",
    transversalSubtitle: "Soft skills qui pilotent la manière de travailler.",
    certificationsTitle: "Certifications & cours en ligne",
    certificationsSubtitle: "Veille technique et spécialisation continue.",
    certificationsNote: "Session vérifiée et pratique guidée",
    focusTracks: [
      {
        title: "IA & Machine Learning",
        detail: "Construction de modèles ML, expérimentations deep learning et pipelines de données",
        stack: "Python, TensorFlow, scikit-learn",
      },
      {
        title: "Développement Fullstack",
        detail: "Applications web complètes avec frameworks modernes et architecture propre",
        stack: "Next.js, Node.js, PostgreSQL",
      },
      {
        title: "Visualisation de données",
        detail: "Tableaux de bord et insights pour décideurs",
        stack: "React, Tailwind CSS, Recharts",
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
        skills: ["Docker", "Linux", "Vercel", "Railway", "Git"],
      },
    ],
    transversal: [
      "Gestion du temps et sens de l'organisation",
      "Travail en équipe et communication efficace",
      "Esprit d'analyse et résolution de problèmes",
      "Curiosité intellectuelle et apprentissage continu",
      "Adaptabilité et autonomie",
    ],
    certifications: [
      "Associate Data Scientist — DataCamp (Certification Professionnelle)",
      "Machine Learning & Deep Learning Specializations",
    ],
  },
  ar: {
    badge: "المهارات",
    heading: "قاعدة تقنية متينة موجّهة للأثر",
    description:
      "من تطوير الويب المتكامل إلى استكشاف الذكاء الاصطناعي، تُختار الأدوات لبناء تجارب رقمية ذات معنى.",
    stats: [
      { label: "اللغات المتقنة", value: "3" },
      { label: "المكدس الأساسي", value: "Fullstack" },
      { label: "التركيز الحالي", value: "ذكاء اصطناعي وبيانات" },
    ],
    focusLabel: "مسار تركيز",
    blockLabel: "الوحدة",
    blockIndexLabel: "الوحدة",
    stackLabel: "التقنيات والأدوات",
    transversalTitle: "مهارات شخصية",
    transversalSubtitle: "قدرات تنظّم أسلوب العمل.",
    certificationsTitle: "شهادات ودورات عبر الإنترنت",
    certificationsSubtitle: "تعلّم مستمر وتخصص متدرج.",
    certificationsNote: "جلسة موثقة وتدريب موجه",
    focusTracks: [
      {
        title: "الذكاء الاصطناعي والتعلم الآلي",
        detail: "بناء نماذج ML، تجارب التعلم العميق، وخطوط بيانات",
        stack: "Python، TensorFlow، scikit-learn",
      },
      {
        title: "تطوير ويب متكامل",
        detail: "تطبيقات ويب كاملة بأطر حديثة ومعمارية نظيفة",
        stack: "Next.js، Node.js، PostgreSQL",
      },
      {
        title: "تصور البيانات",
        detail: "لوحات تحكم ورؤى لصانعي القرار",
        stack: "React، Tailwind CSS، Recharts",
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
        skills: ["Docker", "Linux", "Vercel", "Railway", "Git"],
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
      "عالم بيانات مشارك معتمد — DataCamp (شهادة مهنية)",
      "تخصصات التعلم الآلي والتعلم العميق",
    ],
  },
}

export function getSkillsContent(locale: Locale): SkillsContent {
  return skillsContent[locale] ?? skillsContent.en
}
