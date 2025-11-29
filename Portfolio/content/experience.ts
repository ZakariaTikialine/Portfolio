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
    heading: "Where logistics, AI, and UX intersect",
    subheading: "Impact Track",
    description: "Each experience blends reliable operations, human collaboration, and data-informed software craft.",
    impactLabel: "Impact",
    facts: [
      { label: "Participants served", value: "75+" },
      { label: "Projects shipped", value: "10" },
      { label: "Years active", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "Logistics Lead & Web Developer",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "Oversaw the club's logistics backbone while delivering internal web initiatives that kept members aligned.",
        achievements: [
          "Coordinated daily inventory flows and venue readiness with zero downtime.",
          "Designed tooling that tracked material usage during the \"NexZero.FTC\" event with 75+ attendees.",
          "Created shared rituals with technical teams and sponsors to keep execution on track.",
        ],
        metrics: [
          { label: "Participants", value: "75+" },
          { label: "Scope", value: "Club Ops" },
          { label: "Stack", value: "Next.js" },
        ],
        tags: ["Ops", "Product"],
      },
      {
        id: 2,
        title: "Logistics Manager",
        company: "NexZero.FTC Event",
        period: "May 2025",
        description: "Handled end-to-end logistics for a multi-day technology event hosting more than 75 participants.",
        achievements: [
          "Directed inbound, storage, and distribution streams to keep hardware accessible.",
          "Synced daily with technical teams and vendors to guarantee a smooth schedule.",
          "Reviewed post-event metrics to highlight concrete improvements for the next edition.",
        ],
        metrics: [
          { label: "Event days", value: "3" },
          { label: "Vendors", value: "10+" },
          { label: "Logistics", value: "End-to-end" },
        ],
        tags: ["Ops", "Delivery"],
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
    heading: "Là où logistique, IA et UX se rencontrent",
    subheading: "Impact Track",
    description: "Chaque expérience associe opérations fiables, collaboration humaine et logiciel piloté par la donnée.",
    impactLabel: "Impact",
    facts: [
      { label: "Participants accompagnés", value: "75+" },
      { label: "Projets livrés", value: "10" },
      { label: "Années actives", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "Lead logistique & développeur web",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "Pilotage de la logistique du club et réalisation d'outils web internes pour garder les membres alignés.",
        achievements: [
          "Coordination quotidienne des inventaires et préparation des lieux sans interruption.",
          "Création d'un outil de suivi pour l'événement \"NexZero.FTC\" (75+ participants).",
          "Mise en place de rituels partagés avec les équipes techniques et les sponsors.",
        ],
        metrics: [
          { label: "Participants", value: "75+" },
          { label: "Périmètre", value: "Opérations" },
          { label: "Stack", value: "Next.js" },
        ],
        tags: ["Ops", "Produit"],
      },
      {
        id: 2,
        title: "Responsable logistique",
        company: "Événement NexZero.FTC",
        period: "Mai 2025",
        description: "Gestion bout en bout d'un événement technologique de plusieurs jours accueillant plus de 75 participants.",
        achievements: [
          "Direction des flux d'entrée, de stockage et de distribution du matériel.",
          "Synchronisation quotidienne avec les équipes techniques et les fournisseurs.",
          "Analyse post-événement pour préparer les améliorations de la prochaine édition.",
        ],
        metrics: [
          { label: "Jours", value: "3" },
          { label: "Fournisseurs", value: "10+" },
          { label: "Logistique", value: "End-to-end" },
        ],
        tags: ["Ops", "Exécution"],
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
    heading: "حيث تلتقي اللوجستيات والذكاء الاصطناعي وتجربة المستخدم",
    subheading: "مسار الأثر",
    description: "كل تجربة تمزج بين تشغيل موثوق، تعاون بشري، وبرمجيات مدفوعة بالبيانات.",
    impactLabel: "الأثر",
    facts: [
      { label: "عدد المشاركين", value: "75+" },
      { label: "المشاريع المنجزة", value: "10" },
      { label: "سنوات النشاط", value: "3" },
    ],
    entries: [
      {
        id: 1,
        title: "قائد لوجستي ومطور ويب",
        company: "Nexus Security Club",
        period: "2024 - 2025",
        description: "إدارة البنية اللوجستية للنادي مع تطوير أدوات ويب داخلية تحافظ على تماسك الأعضاء.",
        achievements: [
          "تنسيق الجرد اليومي وتجهيز الأماكن دون توقف.",
          "بناء أداة متابعة لفعالية \"NexZero.FTC\" التي احتضنت أكثر من 75 مشاركاً.",
          "تنظيم طقوس مشتركة مع الفرق التقنية والرعاة لضمان جودة التنفيذ.",
        ],
        metrics: [
          { label: "المشاركون", value: "75+" },
          { label: "النطاق", value: "تشغيل النادي" },
          { label: "التقنيات", value: "Next.js" },
        ],
        tags: ["عمليات", "منتج"],
      },
      {
        id: 2,
        title: "مدير لوجستي",
        company: "حدث NexZero.FTC",
        period: "ماي 2025",
        description: "مسؤولية كاملة عن لوجستيات حدث تقني متعدد الأيام يضم أكثر من 75 مشاركاً.",
        achievements: [
          "إدارة تدفقات الاستلام والتخزين والتوزيع لضمان توفر العتاد.",
          "تنسيق يومي مع الفرق التقنية والمورّدين للحفاظ على جدول سلس.",
          "تحليل مؤشرات ما بعد الحدث لتحديد التحسينات القادمة.",
        ],
        metrics: [
          { label: "أيام الحدث", value: "3" },
          { label: "المورّدون", value: "10+" },
          { label: "نطاق العمل", value: "شامل" },
        ],
        tags: ["عمليات", "تنفيذ"],
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
