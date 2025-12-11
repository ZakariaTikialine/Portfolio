import { Locale } from "@/navigation"

export interface HeroStat {
  label: string
  value: string
  detail: string
}

export interface HeroContent {
  badge: string
  name: string
  taglineLead: string
  typingLines: string[]
  description: string
  primaryCta: string
  stats: HeroStat[]
  focusAreas: string[]
  nowShippingTitle: string
  nowShippingDescription: string
  focusTitle: string
}

const heroContent: Record<Locale, HeroContent> = {
  en: {
    badge: "Crafting with Zakaria Tikialine",
    name: "",
    taglineLead: "I build and help you ship",
    typingLines: ["Smart Systems.", "Clean Code.", "Real Impact."],
    description:
      "Fullstack developer and AI/Data Science student who builds and ships education, civic, and product ideas into digital experiences with measurable impact.",
    primaryCta: "View my work",
    stats: [
      { label: "Projects", value: "10+", detail: "Shipped across AI & web" },
      { label: "Studies", value: "AI & DS", detail: "ESTIN, 2024 →" },
      { label: "Focus", value: "Systems", detail: "Reliability + UX" },
    ],
    focusAreas: [
      "Fullstack web apps",
      "Machine learning",
      "Deep learning & AI",
    ],
    nowShippingTitle: "Now learning",
    nowShippingDescription:
      "Exploring machine learning, deep learning, and AI while shipping fullstack web apps with modern frameworks.",
    focusTitle: "Focus areas",
  },
  fr: {
    badge: "En création avec Zakaria Tikialine",
    name: "",
    taglineLead: "Je construis et vous aide à livrer",
    typingLines: ["Systèmes intelligents.", "Code propre.", "Impact réel."],
    description:
      "Développeur fullstack et étudiant en IA/Data Science qui conçoit et livre des idées éducatives, civiques et produits en expériences numériques à impact mesurable.",
    primaryCta: "Voir mes projets",
    stats: [
      { label: "Projets", value: "10+", detail: "Déployés en IA & web" },
      { label: "Études", value: "IA & DS", detail: "ESTIN, 2024 →" },
      { label: "Focus", value: "Systèmes", detail: "Fiabilité + UX" },
    ],
    focusAreas: [
      "Applications web fullstack",
      "Machine learning",
      "Deep learning & IA",
    ],
    nowShippingTitle: "En apprentissage",
    nowShippingDescription:
      "Exploration du machine learning, deep learning et IA tout en livrant des apps web fullstack avec des frameworks modernes.",
    focusTitle: "Axes de focus",
  },
  ar: {
    badge: "أبني مع زكرياء تيكيالين",
    name: "",
    taglineLead: "أبني وأساعدك على إطلاق",
    typingLines: ["أنظمة ذكية.", "كودًا نظيفًا.", "أثرًا حقيقيًا."],
    description:
      "مطوّر ويب وطالب في الذكاء الاصطناعي وعلوم البيانات يبني ويطلق أفكار تعليمية وخدمات مدنية ومنتجات كتجارب رقمية ذات أثر ملموس.",
    primaryCta: "استكشف أعمالي",
    stats: [
      { label: "المشاريع", value: "10+", detail: "منتجات في مجالي الويب والذكاء الاصطناعي" },
      { label: "الدراسة", value: "ذكاء اصطناعي وبيانات", detail: "ESTIN، 2024 →" },
      { label: "التركيز", value: "الأنظمة", detail: "الاعتمادية وتجربة المستخدم" },
    ],
    focusAreas: [
      "تطبيقات ويب متكاملة",
      "التعلم الآلي",
      "التعلم العميق والذكاء الاصطناعي",
    ],
    nowShippingTitle: "أتعلم حالياً",
    nowShippingDescription:
      "أستكشف التعلم الآلي والتعلم العميق والذكاء الاصطناعي مع بناء تطبيقات ويب متكاملة بأطر حديثة.",
    focusTitle: "مسارات التركيز",
  },
}

export function getHeroContent(locale: Locale): HeroContent {
  return heroContent[locale] ?? heroContent.en
}
