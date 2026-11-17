import "server-only"
import { profile } from "@/content"
import { getDictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { formatMonth } from "@/lib/format"

type Topic = "pitch" | "experience" | "projects" | "skills" | "education" | "ai" | "contact"

/**
 * Keywords per topic in the three site languages. Order matters: the first topic with a match
 * wins, so the more specific topics come first.
 */
const TOPIC_KEYWORDS: [Topic, string[]][] = [
  [
    "pitch",
    [
      "why",
      "hire",
      "recommend",
      "suggest",
      "worth",
      "good fit",
      "should we",
      "pourquoi",
      "recruter",
      "embaucher",
      "recommand",
      "conseill",
      "لماذا",
      "توظيف",
      "أنصح",
      "تنصح",
    ],
  ],
  [
    "contact",
    [
      "contact",
      "email",
      "mail",
      "reach",
      "available",
      "availability",
      "remote",
      "joindre",
      "disponible",
      "disponibilité",
      "distance",
      "تواصل",
      "بريد",
      "متاح",
      "توفر",
    ],
  ],
  [
    "ai",
    [
      "ai",
      "artificial",
      "machine learning",
      "ml",
      "data science",
      "model",
      "node2vec",
      "datacamp",
      "ia",
      "intelligence",
      "apprentissage",
      "modèle",
      "ذكاء",
      "تعلم",
      "التعلّم",
      "بيانات",
      "نموذج",
    ],
  ],
  [
    "education",
    [
      "education",
      "study",
      "studies",
      "degree",
      "university",
      "school",
      "graduate",
      "estin",
      "formation",
      "études",
      "diplôme",
      "école",
      "تعليم",
      "دراسة",
      "شهادة",
      "جامعة",
      "تخرج",
      "التخرّج",
    ],
  ],
  [
    "skills",
    [
      "skill",
      "stack",
      "technolog",
      "tool",
      "language",
      "framework",
      "compétence",
      "outil",
      "langage",
      "مهارات",
      "تقنيات",
      "أدوات",
      "لغات",
    ],
  ],
  [
    "projects",
    [
      "project",
      "built",
      "portfolio",
      "tahwisa",
      "guardly",
      "maze",
      "projet",
      "réalis",
      "مشروع",
      "مشاريع",
      "أعمال",
    ],
  ],
  [
    "experience",
    [
      "experience",
      "work",
      "job",
      "role",
      "egor",
      "naftal",
      "intern",
      "company",
      "expérience",
      "travail",
      "poste",
      "stage",
      "entreprise",
      "خبرة",
      "عمل",
      "وظيفة",
      "تربص",
      "شركة",
      "نفطال",
    ],
  ],
]

/** Short Latin keywords ("ai", "ml") must match a whole word, or "email" would count as "ai". */
function matches(text: string, keyword: string): boolean {
  if (keyword.length <= 3 && /^[a-z]+$/.test(keyword)) {
    return new RegExp(`\\b${keyword}\\b`).test(text)
  }
  return text.includes(keyword)
}

function detectTopic(question: string): Topic | null {
  const text = question.toLowerCase()
  for (const [topic, keywords] of TOPIC_KEYWORDS) {
    if (keywords.some((keyword) => matches(text, keyword))) return topic
  }
  return null
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

/** A deterministic, content-grounded answer used when no AI model can be reached. */
export function offlineAnswer(locale: Locale, question: string): string {
  const dict = getDictionary(locale)
  const templates = dict.assistant.offline
  const egor = profile.experience.find((role) => role.id === "egor")
  const values: Record<string, string> = {
    email: profile.email,
    egorTitle: dict.roles.egor.title,
    egorStart: egor ? formatMonth(locale, egor.period.start) : "",
    naftalTitle: dict.roles.naftal.title,
    interface: profile.stack.interface.join(", "),
    api: profile.stack.api.join(", "),
    model: profile.stack.model.join(", "),
    data: profile.stack.data.join(", "),
  }
  const topic = detectTopic(question)
  return fill(topic ? templates[topic] : templates.fallback, values)
}
