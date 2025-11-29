import type {Locale} from "@/navigation"

export type ContactChannelType = "mail" | "github" | "linkedin"

export interface ContactContent {
  badge: string
  heading: string
  description: string
  form: {
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitLabel: string
  }
  direct: {
    label: string
    response: string
    channels: {
      type: ContactChannelType
      label: string
      href: string
    }[]
  }
  support: {
    label: string
    bullets: string[]
  }
}

const channels = {
  mail: {
    type: "mail" as const,
    label: "zakariatikia@gmail.com",
    href: "mailto:zakariatikia@gmail.com",
  },
  github: {
    type: "github" as const,
    label: "github.com/ZakariaTikialine",
    href: "https://github.com/ZakariaTikialine",
  },
  linkedin: {
    type: "linkedin" as const,
    label: "linkedin.com/in/zakaria-tikialine-68857025b",
    href: "https://linkedin.com/in/zakaria-tikialine-68857025b",
  },
}

const contactContent: Record<Locale, ContactContent> = {
  en: {
    badge: "Contact",
    heading: "Let's design the next iteration together",
    description:
      "Share the context, constraints, and ambition. I'll bring structured collaboration, rapid prototyping, and measurable outcomes.",
    form: {
      nameLabel: "Your name",
      namePlaceholder: "Your name",
      emailLabel: "Work email",
      emailPlaceholder: "you@email.com",
      messageLabel: "Project or idea",
      messagePlaceholder: "Tell me about your project or idea...",
      submitLabel: "Send message",
    },
    direct: {
      label: "Direct channels",
      response: "I reply within 24h",
      channels: [channels.mail, channels.github, channels.linkedin],
    },
    support: {
      label: "How I can help",
      bullets: [
        "Audits & strategy for AI-assisted tooling",
        "Fullstack product sprints (Next.js + Go)",
        "Logistics / education platforms with data viz",
      ],
    },
  },
  fr: {
    badge: "Contact",
    heading: "Co-concevons la prochaine itération",
    description:
      "Donnez-moi le contexte, les contraintes et la vision. J'apporte la collaboration structurée, le prototypage rapide et des résultats mesurables.",
    form: {
      nameLabel: "Votre nom",
      namePlaceholder: "Votre nom",
      emailLabel: "Email pro",
      emailPlaceholder: "vous@email.com",
      messageLabel: "Projet ou idée",
      messagePlaceholder: "Parlez-moi de votre projet ou idée...",
      submitLabel: "Envoyer",
    },
    direct: {
      label: "Canaux directs",
      response: "Je réponds sous 24h",
      channels: [channels.mail, channels.github, channels.linkedin],
    },
    support: {
      label: "Comment j'interviens",
      bullets: [
        "Audits & stratégie pour outils assistés par IA",
        "Sprints produit fullstack (Next.js + Go)",
        "Plateformes logistique / éducation avec data viz",
      ],
    },
  },
  ar: {
    badge: "تواصل",
    heading: "لنصمم النسخة التالية معًا",
    description:
      "شارك السياق والقيود والطموح. سأقدّم تعاونًا منظمًا، ونماذج أولية سريعة، ونتائج قابلة للقياس.",
    form: {
      nameLabel: "اسمك",
      namePlaceholder: "اكتب اسمك",
      emailLabel: "بريد العمل",
      emailPlaceholder: "you@email.com",
      messageLabel: "المشروع أو الفكرة",
      messagePlaceholder: "أخبرني عن مشروعك أو فكرتك...",
      submitLabel: "أرسل الرسالة",
    },
    direct: {
      label: "قنوات مباشرة",
      response: "أرد خلال 24 ساعة",
      channels: [channels.mail, channels.github, channels.linkedin],
    },
    support: {
      label: "كيف أستطيع المساعدة",
      bullets: [
        "تدقيقات واستراتيجيات لأدوات مدعومة بالذكاء الاصطناعي",
        "سباقات تطوير متكاملة (Next.js + Go)",
        "منصات لوجستية / تعليمية مع رسوم بيانية",
      ],
    },
  },
}

export function getContactContent(locale: Locale): ContactContent {
  return contactContent[locale] ?? contactContent.en
}
