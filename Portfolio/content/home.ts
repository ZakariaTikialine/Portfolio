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
    badge: "Currently crafting",
    name: "Zakaria Tikialine",
    taglineLead: "Human-centered engineers build",
    typingLines: ["Smart Systems.", "Clean Code.", "Real Impact."],
    description:
      "Fullstack developer and AI practitioner turning complex logistics, education, and civic challenges into thoughtful digital products with measurable impact.",
    primaryCta: "View my work",
    stats: [
      { label: "Projects", value: "20+", detail: "Shipped across AI & web" },
      { label: "Research", value: "AI & DS", detail: "ESTIN, 2024 →" },
      { label: "Focus", value: "Systems", detail: "Reliability + UX" },
    ],
    focusAreas: [
      "AI copilots for operations",
      "Developer tooling for teams",
      "Data stories that inspire action",
    ],
    nowShippingTitle: "Now shipping",
    nowShippingDescription:
      "AI-driven logistics systems, developer experience tooling, and data storytelling for civic tech communities.",
    focusTitle: "Focus areas",
  },
  fr: {
    badge: "En création",
    name: "Zakaria Tikialine",
    taglineLead: "Les ingénieurs centrés sur l'humain construisent",
    typingLines: ["Systèmes intelligents.", "Code propre.", "Impact réel."],
    description:
      "Développeur fullstack et praticien IA qui transforme les défis logistiques, éducatifs et civiques en produits numériques mesurables.",
    primaryCta: "Voir mes projets",
    stats: [
      { label: "Projets", value: "20+", detail: "Déployés en IA & web" },
      { label: "Recherche", value: "IA & DS", detail: "ESTIN, 2024 →" },
      { label: "Focus", value: "Systèmes", detail: "Fiabilité + UX" },
    ],
    focusAreas: [
      "Copilotes IA pour l'opérationnel",
      "Outils développeurs pour les équipes",
      "Data stories qui déclenchent l'action",
    ],
    nowShippingTitle: "Livraisons en cours",
    nowShippingDescription:
      "Systèmes logistiques augmentés, outils DX et récits data pour les communautés civic tech.",
    focusTitle: "Axes de focus",
  },
  ar: {
    badge: "أعمل حالياً على",
    name: "زكريا تيكيالين",
    taglineLead: "المهندسون المتمحورون حول الإنسان يصنعون",
    typingLines: ["أنظمة ذكية.", "كوداً نظيفاً.", "أثراً حقيقياً."],
    description:
      "مطوّر متكامل وممارس للذكاء الاصطناعي يحوّل تحديات اللوجستيات والتعليم والخدمات المدنية إلى منتجات رقمية ذات أثر ملموس.",
    primaryCta: "استكشف أعمالي",
    stats: [
      { label: "المشاريع", value: "20+", detail: "منتجات في مجالي الويب والذكاء الاصطناعي" },
      { label: "البحث", value: "ذكاء اصطناعي وبيانات", detail: "ESTIN، 2024 →" },
      { label: "التركيز", value: "الأنظمة", detail: "الاعتمادية وتجربة المستخدم" },
    ],
    focusAreas: [
      "مساعدو عمليات مدعومون بالذكاء الاصطناعي",
      "أدوات للمطورين داخل الفرق",
      "قصص بيانات تحفّز القرارات",
    ],
    nowShippingTitle: "أبني حالياً",
    nowShippingDescription:
      "منصات لوجستية مدعومة بالذكاء الاصطناعي، أدوات إنتاجية للمطورين، وسرديات بيانات للمجتمع المدني.",
    focusTitle: "مسارات التركيز",
  },
}

export function getHeroContent(locale: Locale): HeroContent {
  return heroContent[locale] ?? heroContent.en
}
