import type { Locale } from "@/navigation"

export interface ExperienceMetric {
  label: string
  value: string
}

export interface ExperienceEntry {
  id: number
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
  metrics: ExperienceMetric[]
  tags: string[]
}

export interface ExperienceContent {
  heading: string
  subheading: string
  description: string
  facts: ExperienceMetric[]
  entries: ExperienceEntry[]
  impactLabel: string
}

const experienceContent: Record<Locale, ExperienceContent> = {
  // English
  en: {
    heading: "Where Code, AI, and Community Converge",
    subheading: "Impact Track",
    description: "Each experience demonstrates fullstack development, AI exploration, and collaborative teamwork to deliver real-world impact.",
    impactLabel: "Impact",
    facts: [
      { label: "Projects Delivered", value: "10+" },
      { label: "Club Members Impacted", value: "75+" },
      { label: "Years Active", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "Logistics Manager",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "Assisted in organizing club events and coordinating activities to support cybersecurity awareness.",
        achievements: [
          "Helped manage member registrations and event coordination.",
          "Supported the organization of NexZero.FTC Hackathon (75+ participants).",
          "Collaborated with teams on workshops and coding sessions.",
        ],
        metrics: [
          { label: "Participants", value: "75+" },
          { label: "Role", value: "Logistics" },
        ],
        tags: ["Community", "Event"],
      },
      {
        id: 2,
        title: "Logistics Manager",
        company: "NexZero.FTC CTF",
        period: "May 2025",
        description: "Assisted with the technical organization of a 3-days CTF for 75+ participants.",
        achievements: [
          "Supported registration and check-in processes for participants.",
          "Coordinated with organizers for smooth technical setup and event execution.",
        ],
        metrics: [
          { label: "Event Days", value: "3" },
          { label: "Teams", value: "15+" },
          { label: "Role", value: "Support" },
        ],
        tags: ["Event", "Support"],
      },
      {
        id: 3,
        title: "Web Development Intern",
        company: "Naftal (DCSI)",
        period: "July - August 2025",
        description: "Designed and developed a full-stack web app for managing annual employee travel with automation and analytics.",
        achievements: [
          "Stack: Next.js, Node.js, PostgreSQL, Express.js.",
          "Delivered incremental features using Agile methodology with weekly demos.",
          "Digitized travel approvals and reporting dashboards.",
        ],
        metrics: [
          { label: "Users", value: "2k+" },
          { label: "Duration", value: "2 months" },
          { label: "Methodology", value: "Agile" },
        ],
        tags: ["Fullstack"],
      },
    ],
  },

  // French
  fr: {
    heading: "Là où le code, l’IA et la communauté se rejoignent",
    subheading: "Parcours d'Impact",
    description: "Chaque expérience illustre le développement fullstack, l'exploration de l’IA et le travail collaboratif pour un impact concret.",
    impactLabel: "Impact",
    facts: [
      { label: "Projets livrés", value: "10+" },
      { label: "Membres impactés", value: "75+" },
      { label: "Années d'activité", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "Responsable Logistique",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "Aide à l'organisation des événements du club et à la coordination des activités de sensibilisation à la cybersécurité.",
        achievements: [
          "Aide à la gestion des inscriptions et à la coordination des événements.",
          "Soutien à l’organisation du hackathon NexZero.FTC (75+ participants).",
          "Collaboration aux ateliers et sessions de code.",
        ],
        metrics: [
          { label: "Participants", value: "75+" },
          { label: "Rôle", value: "Logistique" },
        ],
        tags: ["Communauté", "Événement"],
      },
      {
        id: 2,
        title: "Responsable Logistique",
        company: "NexZero.FTC CTF",
        period: "Mai 2025",
        description: "Assistance à l'organisation technique d'un CTF de 3 jours pour plus de 75 participants.",
        achievements: [
          "Soutien aux processus d'inscription et d'accueil des participants.",
          "Coordination avec les organisateurs pour une mise en place technique fluide.",
        ],
        metrics: [
          { label: "Jours", value: "3" },
          { label: "Équipes", value: "15+" },
          { label: "Rôle", value: "Support" },
        ],
        tags: ["Événement", "Support"],
      },
      {
        id: 3,
        title: "Stagiaire Développeur Web",
        company: "Naftal (DCSI)",
        period: "Juillet - Août 2025",
        description: "Conception et développement d’une application fullstack pour gérer les voyages annuels des employés avec automatisation et tableaux de bord.",
        achievements: [
          "Stack : Next.js, Node.js, PostgreSQL, Express.js.",
          "Livraison incrémentale des fonctionnalités via Agile avec démonstrations hebdomadaires.",
          "Digitalisation des approbations de voyages et des rapports analytiques.",
        ],
        metrics: [
          { label: "Utilisateurs", value: "2k+" },
          { label: "Durée", value: "2 mois" },
          { label: "Méthodologie", value: "Agile" },
        ],
        tags: ["Fullstack"],
      },
    ],
  },

  // Arabic
  ar: {
    heading: "حيث يلتقي البرمجة والذكاء الاصطناعي والمجتمع",
    subheading: "مسار الأثر",
    description: "كل تجربة توضح تطوير الويب المتكامل، واستكشاف الذكاء الاصطناعي، والعمل الجماعي لإحداث تأثير فعلي.",
    impactLabel: "الأثر",
    facts: [
      { label: "المشاريع المنجزة", value: "10+" },
      { label: "الأعضاء المستفيدون", value: "75+" },
      { label: "سنوات النشاط", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "مسؤول اللوجستيك",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "المساعدة في تنظيم فعاليات النادي وتنسيق الأنشطة لدعم التوعية بالأمن السيبراني.",
        achievements: [
          "المساعدة في إدارة التسجيلات وتنسيق الفعاليات.",
          "دعم تنظيم هاكاثون NexZero.FTC (أكثر من 75 مشاركاً).",
          "التعاون مع الفرق في ورش العمل وجلسات البرمجة.",
        ],
        metrics: [
          { label: "المشاركون", value: "75+" },
          { label: "الدور", value: "لوجستي" },
        ],
        tags: ["مجتمع", "فعالية"],
      },
      {
        id: 2,
        title: "مسؤول اللوجستيك",
        company: "NexZero.FTC CTF",
        period: "ماي 2025",
        description: "المساعدة في التنظيم التقني لمسابقة CTF لمدة 3 أيام لأكثر من 75 مشاركاً.",
        achievements: [
          "دعم عمليات التسجيل واستقبال المشاركين.",
          "التنسيق مع المنظمين لضمان إعداد تقني سلس.",
        ],
        metrics: [
          { label: "الأيام", value: "3" },
          { label: "الفرق", value: "15+" },
          { label: "الدور", value: "دعم" },
        ],
        tags: ["فعالية", "دعم"],
      },
      {
        id: 3,
        title: "متدرب مطوّر ويب",
        company: "Naftal (DCSI)",
        period: "جويلية - أوت 2025",
        description: "تصميم وتطوير تطبيق ويب متكامل لإدارة الرحلات السنوية للموظفين مع الأتمتة ولوحات تحكم تحليلية.",
        achievements: [
          "المكدس: Next.js، Node.js، PostgreSQL، Express.js.",
          "تسليم تدريجي للميزات وفق منهجية Agile مع عروض أسبوعية.",
          "رقمنة الموافقات على الرحلات ولوحات التقارير التحليلية.",
        ],
        metrics: [
          { label: "المستخدمون", value: "2k+" },
          { label: "المدة", value: "شهران" },
          { label: "المنهجية", value: "Agile" },
        ],
        tags: ["Fullstack"],
      },
    ],
  },
}

export function getExperienceContent(locale: Locale): ExperienceContent {
  return experienceContent[locale] ?? experienceContent.en
}
