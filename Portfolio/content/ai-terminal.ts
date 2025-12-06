import type {Locale} from "@/navigation"

export interface AiResponse {
  phrases: string[]
  answer: string
}

export interface AiTerminalContent {
  introMessage: string
  headerTitle: string
  openLabel: string
  closeLabel: string
  minimizeLabel: string
  maximizeLabel: string
  fullscreenLabel: string
  exitFullscreenLabel: string
  placeholder: string
  errorMessage: string
  suggestions: string[]
  defaultResponses: string[]
  responses: AiResponse[]
}

const aiTerminalContent: Record<Locale, AiTerminalContent> = {
  en: {
    introMessage: "Hey! I'm Zakaria's AI assistant. Ask me about skills, projects, or how I can help with your next build!",
    headerTitle: "Ask Zakaria's AI",
    openLabel: "Open AI assistant",
    closeLabel: "Close AI assistant",
    minimizeLabel: "Minimize chat",
    maximizeLabel: "Expand chat",
    fullscreenLabel: "Go full screen",
    exitFullscreenLabel: "Exit full screen",
    placeholder: "Ask about skills, projects…",
    errorMessage: "I couldn't reach the live model. Here's a quick recap instead:",
    suggestions: [
      "What projects are you proud of?",
      "Which stack do you use most?",
      "Are you open for freelance work?",
    ],
    defaultResponses: [
      "That's an interesting question! Could you be more specific about what you'd like to know?",
      "Great question! Feel free to ask about my skills, projects, or experience with specific technologies.",
      "I'm happy to help! Try asking about my projects, tech stack, or availability.",
    ],
    responses: [
      {
        phrases: ["skills", "stack", "what are your skills"],
        answer:
          "I excel in frontend (React, Next.js, TypeScript), backend (Node.js, Express, Go), and data science (Python, ML). What interests you most?",
      },
      {
        phrases: ["projects", "tell me about projects"],
        answer:
          "Recent highlights include Tahwisa NAFTAL (fullstack trip management), a CSP timetable scheduler, and a maze visualization—each shows different expertise.",
      },
      {
        phrases: ["ai", "artificial intelligence"],
        answer:
          "I'm deeply interested in ML fundamentals, AI applications in business, and ethical considerations. I'm exploring TensorFlow and building practical projects.",
      },
      {
        phrases: ["go", "backend", "go backend"],
        answer:
          "Go is my current focus for building performant, scalable backend systems. I'm learning about goroutines, channels, and systems design patterns.",
      },
      {
        phrases: ["data", "data science"],
        answer:
          "I work with data analysis, statistical modeling, and ML pipelines. Pandas, NumPy, and Scikit-learn are my go-to tools.",
      },
      {
        phrases: ["work with you", "collaborate", "available"],
        answer:
          "I'd love to collaborate! I'm available for fullstack projects, data analysis, ML implementations, or technical consulting.",
      },
    ],
  },
  fr: {
    introMessage: "Salut ! Je suis l'assistant IA de Zakaria. Posez-moi des questions sur ses compétences, projets ou la manière dont il peut vous aider.",
    headerTitle: "Parlez à l'IA de Zakaria",
    openLabel: "Ouvrir l'assistant IA",
    closeLabel: "Fermer l'assistant IA",
    minimizeLabel: "Réduire la fenêtre",
    maximizeLabel: "Agrandir la fenêtre",
    fullscreenLabel: "Passer en plein écran",
    exitFullscreenLabel: "Quitter le plein écran",
    placeholder: "Demandez des infos sur les compétences, projets…",
    errorMessage: "Impossible de joindre le modèle en direct. Voici un rappel rapide :",
    suggestions: [
      "Quels sont tes derniers projets ?",
      "Quelles technologies maîtrises-tu ?",
      "Es-tu disponible pour une mission ?",
    ],
    defaultResponses: [
      "Question intéressante ! Pouvez-vous préciser ce que vous cherchez ?",
      "N'hésitez pas à demander ses compétences, ses projets ou une techno précise.",
      "Ravi d'aider ! Parlez projets, stack ou disponibilité.",
    ],
    responses: [
      {
        phrases: ["competences", "compétences", "skills", "stack"],
        answer:
          "Il maîtrise le frontend (React, Next.js, TypeScript), le backend (Node.js, Express, Go) et la data science (Python, ML). Qu'est-ce qui vous intéresse ?",
      },
      {
        phrases: ["projets", "projects"],
        answer:
          "Parmi les récents : Tahwisa NAFTAL, un scheduler CSP et un visualiseur de labyrinthe. Chaque projet illustre une facette différente.",
      },
      {
        phrases: ["ia", "intelligence artificielle", "ai"],
        answer:
          "Il se passionne pour les fondamentaux ML, les usages business et l'éthique. Il explore TensorFlow et construit des projets concrets.",
      },
      {
        phrases: ["go", "backend"],
        answer:
          "Go est son focus actuel pour des backends performants. Il approfondit goroutines, channels et patterns d'architecture.",
      },
      {
        phrases: ["data", "data science"],
        answer:
          "Analyse de données, modélisation statistique et pipelines ML avec Pandas, NumPy et Scikit-learn sont au menu.",
      },
      {
        phrases: ["travailler", "collaborer", "disponible"],
        answer:
          "Il est ouvert aux missions fullstack, à la data, au ML ou au conseil technique. Parlons-en !",
      },
    ],
  },
  ar: {
    introMessage: "مرحبًا! أنا مساعد زكريا الذكي. اسألني عن مهاراته، مشاريعه، أو كيف يمكنه دعم فكرتك القادمة.",
    headerTitle: "تحدث مع مساعد زكريا",
    openLabel: "افتح المساعد الذكي",
    closeLabel: "أغلق المساعد",
    minimizeLabel: "تصغير النافذة",
    maximizeLabel: "تكبير النافذة",
    fullscreenLabel: "عرض بملء الشاشة",
    exitFullscreenLabel: "الخروج من العرض الكامل",
    placeholder: "اسأل عن المهارات أو المشاريع…",
    errorMessage: "تعذّر الاتصال بالذكاء الاصطناعي الآن. إليك ملخص سريع بدلاً من ذلك:",
    suggestions: [
      "ما هي أبرز مشاريعك؟",
      "ما التقنيات التي تستخدمها يوميًا؟",
      "هل أنت متاح للتعاون عن بعد؟",
    ],
    defaultResponses: [
      "سؤال جميل! هل يمكنك التحديد أكثر؟",
      "لا تتردد في الطلب عن المهارات أو المشاريع أو تقنية معينة.",
      "يسعدني المساعدة! جرّب السؤال عن المشاريع أو التكديس التقني أو التوفر.",
    ],
    responses: [
      {
        phrases: ["مهارات", "skills", "stack"],
        answer:
          "يتقن الواجهات الأمامية (React، Next.js، TypeScript)، والخلفيات (Node.js، Express، Go)، وعلوم البيانات (Python، ML). ما الذي يهمك؟",
      },
      {
        phrases: ["مشاريع", "projects"],
        answer:
          "من أبرز أعماله Tahwisa NAFTAL، وجدول زمني قائم على CSP، ومصور متاهة تفاعلي—كل مشروع يبرز مهارة مختلفة.",
      },
      {
        phrases: ["ذكاء اصطناعي", "ai"],
        answer:
          "مهتم بعمق بأساسيات التعلم الآلي، وتطبيقات الذكاء الاصطناعي العملية، والجوانب الأخلاقية. يستكشف TensorFlow ويبني حلولًا عملية.",
      },
      {
        phrases: ["go", "خلفية", "backend"],
        answer:
          "يركز حاليًا على Go لبناء أنظمة خلفية عالية الأداء، مع الاهتمام بالـ goroutines والـ channels وأنماط التصميم.",
      },
      {
        phrases: ["بيانات", "data"],
        answer:
          "يعمل على تحليل البيانات، النمذجة الإحصائية، وخطوط ML باستخدام Pandas وNumPy وScikit-learn.",
      },
      {
        phrases: ["عمل", "collaborate", "متاح"],
        answer:
          "مستعد للتعاون في مشاريع متكاملة، أو تحليلات بيانات، أو تنفيذ ML، أو استشارات تقنية.",
      },
    ],
  },
}

export function getAiTerminalContent(locale: Locale): AiTerminalContent {
  return aiTerminalContent[locale] ?? aiTerminalContent.en
}
