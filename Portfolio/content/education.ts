import type { Locale } from "@/navigation"

export interface EducationEntry {
  id: number
  degree: string
  institution: string
  year: string
  details: string
  highlights: string[]
  tag: string
}

export interface EducationContent {
  badge: string
  heading: string
  description: string
  facts: { label: string; value: string }[]
  entries: EducationEntry[]
  highlightLabel: string
}

const educationContent: Record<Locale, EducationContent> = {
  en: {
    badge: "Education",
    heading: "Academic path designed for AI leadership",
    description:
      "ESTIN's engineer track, competitive prep years, and a mathematics-focused baccalaureate provide the structure for deep work across AI, data, and systems.",
    highlightLabel: "Highlight",
    facts: [
      { label: "Focus", value: "AI × Data Science" },
      { label: "Average", value: "16.76 / 20" },
      { label: "Core", value: "Maths + Systems" },
      { label: "Location", value: "Algeria" },
    ],
    entries: [
      {
        id: 1,
        degree: "Engineer Cycle - AI & DS",
        institution:
          "Ecole Supérieure en Sciences et Technologies de l'Informatique et du Numérique (ESTIN)",
        year: "2024 - Present",
        details:
          "Graduate track focused on artificial intelligence, data science, and large-scale software craftsmanship.",
        highlights: [
          "Applied AI labs and research sprints",
          "Systems design, optimization, and MLOps",
          "Community initiatives around responsible AI",
        ],
        tag: "Graduate program",
      },
      {
        id: 2,
        degree: "Preparatory classes in Computer Science",
        institution:
          "Ecole Supérieure en Sciences et Technologies de l'Informatique et du Numérique (ESTIN)",
        year: "2022 - 2024",
        details:
          "Selective two-year curriculum emphasizing mathematical rigor, algorithms, and competitive programming.",
        highlights: [
          "Advanced calculus, algebra, and probability",
          "Algorithmic problem-solving under time constraints",
          "Collaborative projects bridging theory and practice",
        ],
        tag: "Prep classes",
      },
      {
        id: 3,
        degree: "Mathematics Baccalaureate",
        institution: "Lycée Mohamed Ben Teftifa, Blida",
        year: "2022",
        details: "Graduated with a 16.76 / 20 score, ranking among the top of the cohort.",
        highlights: [
          "Mathematics-focused national curriculum",
          "Physics and computer science electives",
          "Leadership in STEM-focused student clubs",
        ],
        tag: "High school",
      },
    ],
  },
  fr: {
    badge: "Formation",
    heading: "Parcours académique pensé pour le leadership IA",
    description:
      "Le cycle ingénieur de l'ESTIN, les classes préparatoires et un baccalauréat mathématiques dessinent un socle solide pour l'IA, la data et les systèmes.",
    highlightLabel: "Point clé",
    facts: [
      { label: "Spécialité", value: "IA × Data Science" },
      { label: "Moyenne", value: "16,76 / 20" },
      { label: "Cœur", value: "Maths + Systèmes" },
      { label: "Lieu", value: "Algérie" },
    ],
    entries: [
      {
        id: 1,
        degree: "Cycle ingénieur - IA & DS",
        institution:
          "Ecole Supérieure en Sciences et Technologies de l'Informatique et du Numérique (ESTIN)",
        year: "2024 - présent",
        details:
          "Parcours graduate consacré à l'intelligence artificielle, la science des données et l'ingénierie logicielle à grande échelle.",
        highlights: [
          "Labs IA appliqués et sprints de recherche",
          "Conception de systèmes, optimisation et MLOps",
          "Initiatives communautaires autour de l'IA responsable",
        ],
        tag: "Cycle ingénieur",
      },
      {
        id: 2,
        degree: "Classes préparatoires en informatique",
        institution:
          "Ecole Supérieure en Sciences et Technologies de l'Informatique et du Numérique (ESTIN)",
        year: "2022 - 2024",
        details:
          "Formation sélective de deux ans axée sur la rigueur mathématique, les algorithmes et la programmation compétitive.",
        highlights: [
          "Analyse avancée, algèbre et probabilités",
          "Résolution algorithmique sous contrainte",
          "Projets collaboratifs reliant théorie et pratique",
        ],
        tag: "Classes prépas",
      },
      {
        id: 3,
        degree: "Baccalauréat mathématiques",
        institution: "Lycée Mohamed Ben Teftifa, Blida",
        year: "2022",
        details: "Mention avec une moyenne de 16,76 / 20, dans le top de la promotion.",
        highlights: [
          "Programme national orienté mathématiques",
          "Options physique et informatique",
          "Leadership dans des clubs scientifiques",
        ],
        tag: "Lycée",
      },
    ],
  },
  ar: {
    badge: "التعليم",
    heading: "مسار أكاديمي موجه لقيادة الذكاء الاصطناعي",
    description:
      "يوفر مسار الهندسة في ESTIN مع السنتين التحضيريتين وبكالوريا الرياضيات قاعدة متينة للعمل العميق في الذكاء الاصطناعي والبيانات والأنظمة.",
    highlightLabel: "أبرز ما فيها",
    facts: [
      { label: "التركيز", value: "ذكاء اصطناعي × علم البيانات" },
      { label: "المعدل", value: "16.76 / 20" },
      { label: "الأساس", value: "رياضيات + أنظمة" },
      { label: "الموقع", value: "الجزائر" },
    ],
    entries: [
      {
        id: 1,
        degree: "الطور الهندسي - ذكاء اصطناعي وبيانات",
        institution:
          "المدرسة العليا لعلوم وتكنولوجيات الإعلام الآلي والرقمية (ESTIN)",
        year: "2024 - الآن",
        details:
          "مسار دراسات عليا يركز على الذكاء الاصطناعي، علم البيانات وهندسة البرمجيات على نطاق واسع.",
        highlights: [
          "مختبرات IA تطبيقية وسبر أبحاث",
          "تصميم أنظمة، تحسين و MLOps",
          "مبادرات مجتمعية حول الذكاء الاصطناعي المسؤول",
        ],
        tag: "دراسات عليا",
      },
      {
        id: 2,
        degree: "أقسام تحضيرية في الإعلام الآلي",
        institution:
          "المدرسة العليا لعلوم وتكنولوجيات الإعلام الآلي والرقمية (ESTIN)",
        year: "2022 - 2024",
        details:
          "برنامج انتقائي لمدة عامين يركز على الصرامة الرياضية والخوارزميات والبرمجة التنافسية.",
        highlights: [
          "تحليل متقدم وجبر واحتمالات",
          "حل مسائل خوارزمية تحت الضغط",
          "مشاريع تعاونية تربط النظرية بالتطبيق",
        ],
        tag: "أقسام تحضيرية",
      },
      {
        id: 3,
        degree: "بكالوريا رياضيات",
        institution: "ثانوية محمد بن تيفتفة، البليدة",
        year: "2022",
        details: "معدل 16.76 / 20 ضمن الأوائل على الدفعة.",
        highlights: [
          "منهاج وطني يركز على الرياضيات",
          "اختيارات في الفيزياء والإعلام الآلي",
          "قيادة نواد علمية",
        ],
        tag: "ثانوي",
      },
    ],
  },
}

export function getEducationContent(locale: Locale): EducationContent {
  return educationContent[locale] ?? educationContent.en
}
