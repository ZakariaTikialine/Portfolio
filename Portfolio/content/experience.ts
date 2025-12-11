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
  en: {
    heading: "Where code, AI, and community intersect",
    subheading: "Impact Track",
    description: "Each experience blends fullstack development, AI exploration, and collaborative team projects.",
    impactLabel: "Impact",
    facts: [
      { label: "Projects shipped", value: "10+" },
      { label: "Club members impacted", value: "75+" },
      { label: "Years active", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "Web Developer & Active Member",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "Building web solutions for club events and contributing to cybersecurity awareness initiatives.",
        achievements: [
          "Developed internal web tools to manage event registrations and member coordination.",
          "Built the event management system for \"NexZero.FTC\" hackathon with 75+ participants.",
          "Collaborated with technical teams on cybersecurity workshops and coding sessions.",
        ],
        metrics: [
          { label: "Participants", value: "75+" },
          { label: "Role", value: "Web Dev" },
          { label: "Stack", value: "Next.js" },
        ],
        tags: ["Fullstack", "Community"],
      },
      {
        id: 2,
        title: "Tech Team Contributor",
        company: "NexZero.FTC Hackathon",
        period: "May 2025",
        description: "Contributed to the technical organization of a multi-day hackathon hosting 75+ participants.",
        achievements: [
          "Built web-based registration and check-in system for seamless participant onboarding.",
          "Collaborated with organizers to ensure smooth technical setup and event execution.",
          "Supported participants with technical guidance during coding challenges.",
        ],
        metrics: [
          { label: "Event days", value: "3" },
          { label: "Teams", value: "15+" },
          { label: "Role", value: "Tech Support" },
        ],
        tags: ["Event", "Fullstack"],
      },
      {
        id: 3,
        title: "Web Developer Intern",
        company: "Naftal (DCSI)",
        period: "July - August 2025",
        description: "Designed and built a full-stack web app to manage annual employee travel with automation and reporting.",
        achievements: [
          "Stack: Next.js, Node.js, PostgreSQL, Express.js.",
          "Delivered incremental features through agile cadences and weekly demos.",
          "Pushed the digitization of travel approvals and scheduling analytics.",
        ],
        metrics: [
          { label: "Users", value: "2k+" },
          { label: "Duration", value: "2 mo" },
          { label: "Method", value: "Agile" },
        ],
        tags: ["Fullstack", "AI-ready"],
      },
    ],
  },
  fr: {
    heading: "Là où le code, l'IA et la communauté se rencontrent",
    subheading: "Impact Track",
    description: "Chaque expérience mêle développement fullstack, exploration de l'IA et projets collaboratifs.",
    impactLabel: "Impact",
    facts: [
      { label: "Projets livrés", value: "10+" },
      { label: "Membres impactés", value: "75+" },
      { label: "Années actives", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "Développeur web & membre actif",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "Création de solutions web pour les événements du club et contribution aux initiatives de sensibilisation à la cybersécurité.",
        achievements: [
          "Développement d'outils web internes pour gérer les inscriptions et la coordination des membres.",
          "Construction du système de gestion pour le hackathon \"NexZero.FTC\" (75+ participants).",
          "Collaboration avec les équipes techniques sur des ateliers cybersécurité et sessions de code.",
        ],
        metrics: [
          { label: "Participants", value: "75+" },
          { label: "Rôle", value: "Web Dev" },
          { label: "Stack", value: "Next.js" },
        ],
        tags: ["Fullstack", "Communauté"],
      },
      {
        id: 2,
        title: "Contributeur équipe technique",
        company: "Hackathon NexZero.FTC",
        period: "Mai 2025",
        description: "Contribution à l'organisation technique d'un hackathon de plusieurs jours accueillant 75+ participants.",
        achievements: [
          "Développement du système d'inscription et check-in web pour un onboarding fluide.",
          "Collaboration avec les organisateurs pour une mise en place technique sans accroc.",
          "Accompagnement des participants avec des conseils techniques pendant les défis.",
        ],
        metrics: [
          { label: "Jours", value: "3" },
          { label: "Équipes", value: "15+" },
          { label: "Rôle", value: "Support tech" },
        ],
        tags: ["Événement", "Fullstack"],
      },
      {
        id: 3,
        title: "Stagiaire développeur web",
        company: "Naftal (DCSI)",
        period: "Juillet - Août 2025",
        description: "Conception d'une application fullstack pour automatiser la gestion des voyages annuels des employés.",
        achievements: [
          "Stack : Next.js, Node.js, PostgreSQL, Express.js.",
          "Livraisons incrémentales en agile avec démonstrations hebdomadaires.",
          "Digitalisation des validations de voyages et des tableaux de bord.",
        ],
        metrics: [
          { label: "Utilisateurs", value: "2k+" },
          { label: "Durée", value: "2 mois" },
          { label: "Méthode", value: "Agile" },
        ],
        tags: ["Fullstack", "IA"],
      },
    ],
  },
  ar: {
    heading: "حيث يلتقي الكود والذكاء الاصطناعي والمجتمع",
    subheading: "مسار الأثر",
    description: "كل تجربة تمزج بين تطوير الويب المتكامل واستكشاف الذكاء الاصطناعي والمشاريع التعاونية.",
    impactLabel: "الأثر",
    facts: [
      { label: "المشاريع المنجزة", value: "+10" },
      { label: "الأعضاء المستفيدون", value: "+75" },
      { label: "سنوات النشاط", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "مطور ويب وعضو فعّال",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "بناء حلول ويب لفعاليات النادي والمساهمة في مبادرات التوعية بالأمن السيبراني.",
        achievements: [
          "تطوير أدوات ويب داخلية لإدارة التسجيلات وتنسيق الأعضاء.",
          "بناء نظام إدارة لهاكاثون \"NexZero.FTC\" الذي استقطب أكثر من 75 مشاركاً.",
          "التعاون مع الفرق التقنية في ورش الأمن السيبراني وجلسات البرمجة.",
        ],
        metrics: [
          { label: "المشاركون", value: "+75" },
          { label: "الدور", value: "مطور ويب" },
          { label: "التقنيات", value: "Next.js" },
        ],
        tags: ["Fullstack", "مجتمع"],
      },
      {
        id: 2,
        title: "مساهم في الفريق التقني",
        company: "هاكاثون NexZero.FTC",
        period: "ماي 2025",
        description: "المساهمة في التنظيم التقني لهاكاثون متعدد الأيام يستضيف أكثر من 75 مشاركاً.",
        achievements: [
          "بناء نظام تسجيل وتسجيل دخول إلكتروني لاستقبال المشاركين بسلاسة.",
          "التعاون مع المنظمين لضمان إعداد تقني سلس وتنفيذ ناجح.",
          "دعم المشاركين بإرشادات تقنية خلال تحديات البرمجة.",
        ],
        metrics: [
          { label: "أيام الحدث", value: "3" },
          { label: "الفرق", value: "+15" },
          { label: "الدور", value: "دعم تقني" },
        ],
        tags: ["فعالية", "Fullstack"],
      },
      {
        id: 3,
        title: "متدرب مطوّر ويب",
        company: "Naftal (DCSI)",
        period: "جويلية - أوت 2025",
        description: "تصميم وبناء تطبيق متكامل لإدارة رحلات الموظفين السنوية مع الأتمتة والتقارير.",
        achievements: [
          "المكدس: Next.js، Node.js، PostgreSQL، Express.js.",
          "تسليم ميزات تدريجية عبر إيقاع Agile وعروض أسبوعية.",
          "دفع رقمنة الموافقات وتحليلات الجداول.",
        ],
        metrics: [
          { label: "المستخدمون", value: "2k+" },
          { label: "المدة", value: "شهران" },
          { label: "المنهجية", value: "Agile" },
        ],
        tags: ["Fullstack", "جاهز للذكاء الاصطناعي"],
      },
    ],
  },
}

export function getExperienceContent(locale: Locale): ExperienceContent {
  return experienceContent[locale] ?? experienceContent.en
}
