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
    subjectLabel: string
    subjectPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitLabel: string
    sendingLabel: string
    sentLabel: string
    successMessage: string
    errorMessage: string
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
    label: "ZakariaTikialine",
    href: "https://github.com/ZakariaTikialine",
  },
  linkedin: {
    type: "linkedin" as const,
    label: "ZakariaTikialine",
    href: "https://linkedin.com/in/zakaria-tikialine-68857025b",
  },
}

const contactContent: Record<Locale, ContactContent> = {
  en: {
    badge: "Contact",
    heading: "Let's build something great together",
    description:
      "Have a project in mind? I'd love to hear about it. Share your vision, and let's turn ideas into reality.",
    form: {
      nameLabel: "Your name",
      namePlaceholder: "Zakaria Tikialine",
      emailLabel: "Email address",
      emailPlaceholder: "zakaria@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Project inquiry / Collaboration / Other",
      messageLabel: "Your message",
      messagePlaceholder: "Tell me about your project, timeline, and goals...",
      submitLabel: "Send Message",
      sendingLabel: "Sending...",
      sentLabel: "Message Sent!",
      successMessage: "Thank you! I'll get back to you within 24 hours.",
      errorMessage: "Something went wrong. Please try again or email me directly.",
    },
    direct: {
      label: "Prefer direct contact?",
      response: "I typically respond within 24 hours",
      channels: [channels.mail, channels.github, channels.linkedin],
    },
    support: {
      label: "What I can help with",
      bullets: [
        "Full-stack web applications (Next.js, React, Go)",
        "AI-powered tools and integrations",
        "Data visualization dashboards",
        "Technical consulting and code reviews",
      ],
    },
  },
  fr: {
    badge: "Contact",
    heading: "Construisons quelque chose de génial ensemble",
    description:
      "Vous avez un projet en tête ? J'aimerais en savoir plus. Partagez votre vision et transformons vos idées en réalité.",
    form: {
      nameLabel: "Votre nom",
      namePlaceholder: "Zakaria Tikialine",
      emailLabel: "Adresse email",
      emailPlaceholder: "zakaria@exemple.com",
      subjectLabel: "Sujet",
      subjectPlaceholder: "Demande de projet / Collaboration / Autre",
      messageLabel: "Votre message",
      messagePlaceholder: "Parlez-moi de votre projet, délais et objectifs...",
      submitLabel: "Envoyer",
      sendingLabel: "Envoi...",
      sentLabel: "Message envoyé !",
      successMessage: "Merci ! Je vous répondrai sous 24 heures.",
      errorMessage: "Une erreur s'est produite. Réessayez ou contactez-moi directement.",
    },
    direct: {
      label: "Préférez un contact direct ?",
      response: "Je réponds généralement sous 24h",
      channels: [channels.mail, channels.github, channels.linkedin],
    },
    support: {
      label: "Comment je peux vous aider",
      bullets: [
        "Applications web full-stack (Next.js, React, Go)",
        "Outils et intégrations IA",
        "Tableaux de bord de visualisation de données",
        "Consulting technique et revues de code",
      ],
    },
  },
  ar: {
    badge: "تواصل",
    heading: "لنبني شيئًا رائعًا معًا",
    description:
      "هل لديك مشروع في ذهنك؟ يسعدني سماع المزيد عنه. شارك رؤيتك ولنحول الأفكار إلى واقع.",
    form: {
      nameLabel: "اسمك",
      namePlaceholder: "زكرياء تيكيالين",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "zakaria@example.com",
      subjectLabel: "الموضوع",
      subjectPlaceholder: "استفسار عن مشروع / تعاون / آخر",
      messageLabel: "رسالتك",
      messagePlaceholder: "أخبرني عن مشروعك والجدول الزمني والأهداف...",
      submitLabel: "إرسال الرسالة",
      sendingLabel: "جاري الإرسال...",
      sentLabel: "تم الإرسال!",
      successMessage: "شكرًا لك! سأرد عليك خلال 24 ساعة.",
      errorMessage: "حدث خطأ ما. حاول مرة أخرى أو راسلني مباشرة.",
    },
    direct: {
      label: "تفضّل التواصل المباشر؟",
      response: "أردّ عادةً خلال 24 ساعة",
      channels: [channels.mail, channels.github, channels.linkedin],
    },
    support: {
      label: "كيف يمكنني مساعدتك",
      bullets: [
        "تطبيقات ويب متكاملة (Next.js, React, Go)",
        "أدوات وتكاملات الذكاء الاصطناعي",
        "لوحات معلومات تصور البيانات",
        "استشارات تقنية ومراجعات الكود",
      ],
    },
  },
}

export function getContactContent(locale: Locale): ContactContent {
  return contactContent[locale] ?? contactContent.en
}
