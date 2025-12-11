import type {Locale} from "@/navigation"

export interface BlogContent {
  badge: string
  heading: string
  description: string
  exploringLabel: string
  exploringTitle: string
  exploringSummary: string
  tags: string[]
  prepLabel: string
  prepTitle: string
  prepBody: string
}

const sharedTags = ["Event-driven architecture", "Tracing & metrics", "gRPC & WebSockets"]

const blogContent: Record<Locale, BlogContent> = {
  en: {
    badge: "Learning log",
    heading: "Building in public, one concept at a time",
    description:
      "Short notes on what I'm actively exploring. Full write-ups will land here as soon as they're worth sharing.",
    exploringLabel: "Currently exploring",
    exploringTitle: "Go + System Design Patterns",
    exploringSummary:
      "Practicing distributed coordination, resiliency patterns, and observability while crafting utilities for the rest of my projects.",
    tags: sharedTags,
    prepLabel: "Articles in progress",
    prepTitle: "Tight synth notes before deep dives",
    prepBody:
      "No published posts yet—I prefer to master the material first. Expect detailed write-ups on applied AI, CSPs, and developer tooling soon.",
  },
  fr: {
    badge: "Journal d'apprentissage",
    heading: "Construire en public, un concept à la fois",
    description:
      "Notes rapides sur ce que j'explore en ce moment. Les articles complets arriveront dès qu'ils en vaudront la peine.",
    exploringLabel: "Exploration en cours",
    exploringTitle: "Go + Patterns d'architecture",
    exploringSummary:
      "Je pratique la coordination distribuée, les patterns de résilience et l'observabilité tout en forgeant des utilitaires pour mes projets.",
    tags: ["Architecture événementielle", "Tracing & métriques", "gRPC & WebSockets"],
    prepLabel: "Articles en préparation",
    prepTitle: "Notes synthétiques avant publications longues",
    prepBody:
      "Pas encore de billets publiés. Je préfère apprendre à fond avant d'écrire. Revenez bientôt pour des articles détaillés sur l'IA appliquée, les CSP et les outils développeurs.",
  },
  ar: {
    badge: "دفتر التعلم",
    heading: "أبني علانيةً، فكرة تلو الأخرى",
    description:
      "ملاحظات قصيرة حول ما أدرسه حاليًا. المقالات الكاملة ستُنشر هنا فور جاهزيتها.",
    exploringLabel: "أستكشف الآن",
    exploringTitle: "أنماط Go وتصميم الأنظمة",
    exploringSummary:
      "أتدرّب على التنسيق الموزع، وأنماط الموثوقية، والمراقبة مع تطوير أدوات تدعم بقية مشاريعي.",
    tags: ["هندسة مدفوعة بالأحداث", "التتبّع والقياسات", "gRPC و WebSockets"],
    prepLabel: "مقالات قيد التحضير",
    prepTitle: "ملاحظات مركّزة قبل المقالات المفصّلة",
    prepBody:
      "لا توجد تدوينات منشورة بعد؛ أفضّل الإتقان قبل الكتابة. ترقّبوا مقالات مفصّلة عن الذكاء الاصطناعي التطبيقي ومسائل الإرضاء بالقيود وأدوات المطورين قريبًا.",
  },
}

export function getBlogContent(locale: Locale): BlogContent {
  return blogContent[locale] ?? blogContent.en
}
