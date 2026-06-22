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
  terminalComment: string
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
    name: "Zakaria Tikialine",
    taglineLead: "I build and help you ship",
    typingLines: ["Smart Systems.", "Clean Code.", "Real Impact."],
    description:
      "Fullstack developer and AI/Data Science student who builds and ships education, civic, and product ideas into digital experiences with measurable impact.",
    terminalComment: "Front-End Developer @ Egor Gaming",
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
    nowShippingTitle: "Currently",
    nowShippingDescription:
      "Front-End Developer at Egor Gaming — shipping web interfaces with React & Next.js, while exploring machine learning and AI on the side.",
    focusTitle: "Focus areas",
  },
  fr: {
    badge: "En création avec Zakaria Tikialine",
    name: "Zakaria Tikialine",
    taglineLead: "Je construis et vous aide à livrer",
    typingLines: ["Systèmes intelligents.", "Code propre.", "Impact réel."],
    description:
      "Développeur fullstack et étudiant en IA/Data Science qui conçoit et livre des idées éducatives, civiques et produits en expériences numériques à impact mesurable.",
    terminalComment: "Développeur Front-End @ Egor Gaming",
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
    nowShippingTitle: "Actuellement",
    nowShippingDescription:
      "Développeur Front-End chez Egor Gaming — je livre des interfaces web avec React & Next.js, tout en explorant le machine learning et l'IA en parallèle.",
    focusTitle: "Axes de focus",
  },
  ar: {
    badge: "أبني مع زكرياء تيكيالين",
    name: "زكرياء تيكيالين",
    taglineLead: "أبني وأساعدك على إطلاق",
    typingLines: ["أنظمة ذكية.", "كودًا نظيفًا.", "أثرًا حقيقيًا."],
    description:
      "مطوّر ويب وطالب في الذكاء الاصطناعي وعلوم البيانات يبني ويطلق أفكار تعليمية وخدمات مدنية ومنتجات كتجارب رقمية ذات أثر ملموس.",
    terminalComment: "مطوّر واجهة أمامية @ Egor Gaming",
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
    nowShippingTitle: "حالياً",
    nowShippingDescription:
      "مطوّر واجهة أمامية في Egor Gaming — أبني واجهات ويب باستخدام React وNext.js، مع استكشاف التعلم الآلي والذكاء الاصطناعي بالتوازي.",
    focusTitle: "مسارات التركيز",
  },
}

export function getHeroContent(locale: Locale): HeroContent {
  return heroContent[locale] ?? heroContent.en
}
