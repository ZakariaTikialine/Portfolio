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
  communityHeading: string
  communitySubtitle: string
  community: ExperienceEntry[]
}

const experienceContent: Record<Locale, ExperienceContent> = {
  // English
  en: {
    heading: "Where Code, AI, and Community Converge",
    subheading: "Impact Track",
    description: "Each experience demonstrates fullstack development, AI exploration, and collaborative teamwork to deliver real-world impact.",
    impactLabel: "Impact",
    communityHeading: "Community & Leadership",
    communitySubtitle: "Volunteering, teaching, and event organization alongside my professional work.",
    facts: [
      { label: "Projects Delivered", value: "10+" },
      { label: "Club Members Impacted", value: "75+" },
      { label: "Years Active", value: "3" },
    ],
    entries: [
      {
        id: 5,
        title: "Front-End Developer",
        company: "Egor Gaming",
        period: "May 2026 - Present",
        description: "Building and shipping game-facing web interfaces with React, Next.js, and TypeScript as part of a product team.",
        achievements: [
          "Building and maintaining the frontend of a live Next.js gaming platform with typed React components in TypeScript.",
          "Reorganized the frontend from a flat components/ folder into a feature-based features/ structure for easier navigation and scaling.",
          "Migrated most domains to the new structure and documented the approach for the team.",
        ],
        metrics: [
          { label: "Role", value: "Front-End" },
          { label: "Stack", value: "React / Next.js" },
          { label: "Status", value: "Current" },
        ],
        tags: ["Frontend", "React", "Next.js"],
      },
      {
        id: 4,
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
    community: [
      {
        id: 1,
        title: "Technical Assistant",
        company: "School of AI Club - Bejaia",
        period: "January 2026 - Present",
        description: "Organizing and delivering workshops on Machine Learning, Deep Learning, and backend development to upskill community members.",
        achievements: [
          "Teaching ML/DL workshops with hands-on Python sessions.",
          "Mentoring participants in data preprocessing and model training.",
          "Developing practical exercises for real-world AI applications.",
        ],
        metrics: [
          { label: "Workshops", value: "10+" },
          { label: "Role", value: "Instructor" },
        ],
        tags: ["Teaching", "AI/ML", "Community"],
      },
      {
        id: 2,
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
        id: 3,
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
    ],
  },

  // French
  fr: {
    heading: "Là où le code, l’IA et la communauté se rejoignent",
    subheading: "Parcours d'Impact",
    description: "Chaque expérience illustre le développement fullstack, l'exploration de l’IA et le travail collaboratif pour un impact concret.",
    impactLabel: "Impact",
    communityHeading: "Communauté & Engagement",
    communitySubtitle: "Bénévolat, enseignement et organisation d'événements en parallèle de mon activité professionnelle.",
    facts: [
      { label: "Projets livrés", value: "10+" },
      { label: "Membres impactés", value: "75+" },
      { label: "Années d'activité", value: "3" },
    ],
    entries: [
      {
        id: 5,
        title: "Développeur Front-End",
        company: "Egor Gaming",
        period: "Mai 2026 - Présent",
        description: "Conception et déploiement d'interfaces web orientées jeu avec React, Next.js et TypeScript au sein d'une équipe produit.",
        achievements: [
          "Développement et maintenance du frontend d'une plateforme de jeu Next.js en production, avec des composants React typés en TypeScript.",
          "Réorganisation du frontend d'un dossier components/ plat vers une structure features/ par fonctionnalité, plus simple à parcourir et à faire évoluer.",
          "Migration de la plupart des domaines vers la nouvelle structure et documentation de l'approche pour l'équipe.",
        ],
        metrics: [
          { label: "Rôle", value: "Front-End" },
          { label: "Stack", value: "React / Next.js" },
          { label: "Statut", value: "Actuel" },
        ],
        tags: ["Frontend", "React", "Next.js"],
      },
      {
        id: 4,
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
    community: [
      {
        id: 1,
        title: "Assistant Technique",
        company: "School of AI Club - Bejaia",
        period: "Janvier 2026 - Présent",
        description: "Organisation et animation d'ateliers sur le Machine Learning, Deep Learning et le développement backend pour former les membres de la communauté.",
        achievements: [
          "Animation d'ateliers ML/DL avec sessions pratiques Python.",
          "Mentorat des participants sur le prétraitement des données et l'entraînement de modèles.",
          "Développement d'exercices pratiques pour des applications IA réelles.",
        ],
        metrics: [
          { label: "Ateliers", value: "10+" },
          { label: "Rôle", value: "Formateur" },
        ],
        tags: ["Enseignement", "IA/ML", "Communauté"],
      },
      {
        id: 2,
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
        id: 3,
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
    ],
  },

  // Arabic
  ar: {
    heading: "حيث يلتقي البرمجة والذكاء الاصطناعي والمجتمع",
    subheading: "مسار الأثر",
    description: "كل تجربة توضح تطوير الويب المتكامل، واستكشاف الذكاء الاصطناعي، والعمل الجماعي لإحداث تأثير فعلي.",
    impactLabel: "الأثر",
    communityHeading: "المجتمع والقيادة",
    communitySubtitle: "العمل التطوعي والتدريس وتنظيم الفعاليات إلى جانب عملي المهني.",
    facts: [
      { label: "المشاريع المنجزة", value: "10+" },
      { label: "الأعضاء المستفيدون", value: "75+" },
      { label: "سنوات النشاط", value: "3" },
    ],
    entries: [
      {
        id: 5,
        title: "مطوّر واجهة أمامية",
        company: "Egor Gaming",
        period: "ماي 2026 - الحالي",
        description: "بناء وإطلاق واجهات ويب موجهة للألعاب باستخدام React وNext.js وTypeScript ضمن فريق منتج.",
        achievements: [
          "تطوير وصيانة واجهة منصة ألعاب مبنية على Next.js قيد التشغيل، باستخدام مكونات React مكتوبة بـ TypeScript.",
          "إعادة هيكلة الواجهة الأمامية من مجلد components/ مسطّح إلى بنية features/ قائمة على الميزات، أسهل للتصفح والتوسّع.",
          "نقل معظم المجالات إلى البنية الجديدة وتوثيق المنهجية للفريق.",
        ],
        metrics: [
          { label: "الدور", value: "واجهة أمامية" },
          { label: "التقنيات", value: "React / Next.js" },
          { label: "الحالة", value: "حالي" },
        ],
        tags: ["Frontend", "React", "Next.js"],
      },
      {
        id: 4,
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
    community: [
      {
        id: 1,
        title: "مساعد تقني",
        company: "School of AI Club - بجاية",
        period: "يناير 2026 - الحالي",
        description: "تنظيم وتقديم ورش عمل حول التعلم الآلي، التعلم العميق وتطوير الخلفية لتحسين مهارات أعضاء المجتمع.",
        achievements: [
          "تدريس ورش عمل ML/DL مع جلسات Python عملية.",
          "إرشاد المشاركين في معالجة البيانات وتدريب النماذج.",
          "تطوير تمارين عملية لتطبيقات الذكاء الاصطناعي الواقعية.",
        ],
        metrics: [
          { label: "الورش", value: "10+" },
          { label: "الدور", value: "مدرس" },
        ],
        tags: ["تدريس", "ذكاء اصطناعي", "مجتمع"],
      },
      {
        id: 2,
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
        id: 3,
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
    ],
  },
}

export function getExperienceContent(locale: Locale): ExperienceContent {
  return experienceContent[locale] ?? experienceContent.en
}
