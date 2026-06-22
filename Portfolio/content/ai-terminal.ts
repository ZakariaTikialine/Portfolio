import type {Locale} from "@/navigation"

export interface AiResponse {
  phrases: string[]
  answer: string
}

export interface AiTerminalContent {
  introMessage: string
  headerTitle: string
  statusLabel: string
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
    introMessage: "Hey! I'm Zakaria's AI assistant. He's a Front-End Developer at Egor Gaming. Ask me about his skills, projects, or experience!",
    headerTitle: "Ask Zakaria's AI",
    statusLabel: "Online",
    openLabel: "Open AI assistant",
    closeLabel: "Close AI assistant",
    minimizeLabel: "Minimize chat",
    maximizeLabel: "Expand chat",
    fullscreenLabel: "Go full screen",
    exitFullscreenLabel: "Exit full screen",
    placeholder: "Ask about skills, projects…",
    errorMessage: "I couldn't reach the live model. Here's a quick recap instead:",
    suggestions: [
      "Tell me about your role at Egor Gaming",
      "What's your DataCamp certification?",
      "Are you available for remote work?",
    ],
    defaultResponses: [
      "That's an interesting question! Could you be more specific about what you'd like to know?",
      "Great question! Feel free to ask about my skills, projects, or experience with specific technologies.",
      "I'm happy to help! Try asking about my projects, tech stack, or availability.",
    ],
    responses: [
      {
        phrases: ["egor", "egor gaming", "current job", "current role", "front-end", "frontend"],
        answer:
          "Zakaria is currently a Front-End Developer at Egor Gaming (since May 2026), building and shipping game-facing web interfaces with React, Next.js, and TypeScript as part of a product team — developing responsive, accessible UI components and collaborating with design and backend teams.",
      },
      {
        phrases: ["skills", "stack", "what are your skills", "technologies"],
        answer:
          "I excel in Python, TypeScript, JavaScript, Golang, and SQL. Frontend: React.js, Next.js, Tailwind CSS. Backend: Node.js, Express.js, REST APIs with RBAC. Databases: PostgreSQL, MongoDB, Oracle. ML: Scikit-learn with regression, classification, and feature engineering. What interests you most?",
      },
      {
        phrases: ["projects", "tell me about projects", "portfolio"],
        answer:
          "Key projects: Tahwisa (NAFTAL employee travel management with Next.js, Express, PostgreSQL, RBAC authentication), Student Performance Prediction Model (end-to-end ML pipeline, R² > 0.70 using Scikit-learn), CSP timetable scheduler, and interactive maze visualizer. Each demonstrates different technical expertise.",
      },
      {
        phrases: ["education", "university", "degree", "studying"],
        answer:
          "I'm pursuing State Engineer in Computer Science at ESTIN, specializing in Artificial Intelligence & Data Science (2022-2027). I'm also a DataCamp Certified Associate Data Scientist with professional certification.",
      },
      {
        phrases: ["experience", "work", "internship", "job"],
        answer:
          "Currently a Front-End Developer at Egor Gaming (May 2026-Present), building web interfaces with React, Next.js & TypeScript. Previously a Full Stack Web Developer Intern at NAFTAL (Jun-Jul 2025), where I built the Tahwisa platform with secure REST APIs, optimized PostgreSQL schemas, and automated selection logic. On the community side, I'm a Technical Assistant at the School of AI Club (teaching ML/DL workshops) and was Logistics Manager at Nexus Security Club.",
      },
      {
        phrases: ["naftal", "tahwisa", "internship"],
        answer:
          "At NAFTAL, I designed and deployed Tahwisa—a full-stack employee travel management system. Built secure RESTful APIs with RBAC, optimized PostgreSQL schemas, developed responsive Next.js frontend with TypeScript, and automated participant selection for production deployment.",
      },
      {
        phrases: ["ai", "artificial intelligence", "machine learning", "ml"],
        answer:
          "I'm deeply interested in ML fundamentals and practical AI applications. As a DataCamp Certified Associate Data Scientist, I work with Scikit-learn for regression, classification, and feature engineering. Built a Student Performance Prediction Model achieving R² > 0.70 with cross-validation and error metrics.",
      },
      {
        phrases: ["data science", "data analysis", "pandas", "numpy"],
        answer:
          "I work extensively with data analysis, statistical modeling, and ML pipelines using Pandas, NumPy, and Matplotlib. I'm certified as an Associate Data Scientist and have built end-to-end ML projects with exploratory data analysis, feature engineering, and model evaluation.",
      },
      {
        phrases: ["go", "golang", "backend"],
        answer:
          "Go is my focus for building performant, scalable backend systems. Combined with my Node.js and Express.js expertise (REST APIs, WebSockets, Authentication, RBAC), I architect secure and efficient server-side applications. I'm learning goroutines, channels, and systems design patterns.",
      },
      {
        phrases: ["database", "postgresql", "mongodb", "sql"],
        answer:
          "I work with PostgreSQL, MongoDB, and Oracle. At NAFTAL, I modeled and optimized PostgreSQL relational schemas for efficient querying and data consistency. I design normalized schemas and write optimized queries for production systems.",
      },
      {
        phrases: ["certification", "datacamp", "certified"],
        answer:
          "I'm a DataCamp Certified Associate Data Scientist with professional certification. This validates my expertise in Python, Pandas, NumPy, Scikit-learn, statistical modeling, and ML model evaluation.",
      },
      {
        phrases: ["languages", "french", "english", "arabic"],
        answer:
          "I'm trilingual: Arabic (Native), French (B2 level – TCF certified), and English (Professional proficiency). This enables me to work effectively in international and multilingual environments.",
      },
      {
        phrases: ["location", "remote", "where", "algeria"],
        answer:
          "I'm based in Blida, Algeria, and available for remote work worldwide. I have experience with distributed teams and modern remote collaboration tools (Git, Docker, Vercel, Railway).",
      },
      {
        phrases: ["contact", "email", "hire", "reach"],
        answer:
          "Reach me at z_tikialine@estin.dz or +213 698 31 07 10. Find me on LinkedIn (linkedin.com/in/zakaria-tikialine) or GitHub (github.com/ZakariaTikialine). I'm open to fullstack development, data science projects, ML implementations, or technical consulting opportunities.",
      },
      {
        phrases: ["work with you", "collaborate", "available", "freelance"],
        answer:
          "I'd love to collaborate! I'm available for fullstack projects (React, Next.js, Node.js, PostgreSQL), data analysis, ML implementations, or technical consulting. I can work remotely and deliver production-ready solutions.",
      },
    ],
  },
  fr: {
    introMessage: "Salut ! Je suis l'assistant IA de Zakaria. Il est Développeur Front-End chez Egor Gaming. Posez-moi des questions sur ses compétences, projets ou son expérience !",
    headerTitle: "Parlez à l'IA de Zakaria",
    statusLabel: "En ligne",
    openLabel: "Ouvrir l'assistant IA",
    closeLabel: "Fermer l'assistant IA",
    minimizeLabel: "Réduire la fenêtre",
    maximizeLabel: "Agrandir la fenêtre",
    fullscreenLabel: "Passer en plein écran",
    exitFullscreenLabel: "Quitter le plein écran",
    placeholder: "Demandez des infos sur les compétences, projets…",
    errorMessage: "Impossible de joindre le modèle en direct. Voici un rappel rapide :",
    suggestions: [
      "Parle-moi de ton rôle chez Egor Gaming",
      "Quelle est ta certification DataCamp ?",
      "Es-tu disponible pour le travail à distance ?",
    ],
    defaultResponses: [
      "Question intéressante ! Pouvez-vous préciser ce que vous cherchez ?",
      "N'hésitez pas à demander ses compétences, ses projets ou une techno précise.",
      "Ravi d'aider ! Parlez projets, stack ou disponibilité.",
    ],
    responses: [
      {
        phrases: ["egor", "egor gaming", "poste actuel", "rôle actuel", "front-end", "frontend"],
        answer:
          "Zakaria est actuellement Développeur Front-End chez Egor Gaming (depuis mai 2026), où il conçoit et déploie des interfaces web orientées jeu avec React, Next.js et TypeScript au sein d'une équipe produit — développement de composants UI responsifs et accessibles, et collaboration avec les équipes design et backend.",
      },
      {
        phrases: ["competences", "compétences", "skills", "stack", "technologies"],
        answer:
          "Il maîtrise Python, TypeScript, JavaScript, Golang et SQL. Frontend: React.js, Next.js, Tailwind CSS. Backend: Node.js, Express.js, REST APIs avec RBAC. Bases de données: PostgreSQL, MongoDB, Oracle. ML: Scikit-learn avec régression, classification et feature engineering. Qu'est-ce qui vous intéresse ?",
      },
      {
        phrases: ["projets", "projects", "portfolio"],
        answer:
          "Projets clés : Tahwisa (gestion des déplacements NAFTAL avec Next.js, Express, PostgreSQL, authentification RBAC), Modèle de Prédiction de Performance Étudiante (pipeline ML complet, R² > 0.70 avec Scikit-learn), planificateur CSP et visualiseur de labyrinthe. Chaque projet démontre une expertise technique différente.",
      },
      {
        phrases: ["formation", "études", "université", "diplôme"],
        answer:
          "Il poursuit un diplôme d'Ingénieur d'État en Informatique à l'ESTIN, spécialisé en Intelligence Artificielle & Data Science (2022-2027). Il est également certifié Associate Data Scientist par DataCamp.",
      },
      {
        phrases: ["expérience", "travail", "stage", "emploi"],
        answer:
          "Actuellement Développeur Front-End chez Egor Gaming (Mai 2026-Présent), il livre des interfaces web avec React, Next.js et TypeScript. Précédemment Stagiaire Développeur Web Full Stack chez NAFTAL (Juin-Juil 2025), où il a construit la plateforme Tahwisa avec APIs REST sécurisées, schémas PostgreSQL optimisés et logique de sélection automatisée. Côté communauté, il est Assistant Technique au School of AI Club (ateliers ML/DL) et a été Responsable Logistique au Nexus Security Club.",
      },
      {
        phrases: ["naftal", "tahwisa", "stage"],
        answer:
          "Chez NAFTAL, il a conçu et déployé Tahwisa—un système de gestion des déplacements des employés. Construction d'APIs RESTful sécurisées avec RBAC, optimisation des schémas PostgreSQL, développement frontend responsive avec Next.js et TypeScript, et automatisation de la sélection pour le déploiement en production.",
      },
      {
        phrases: ["ia", "intelligence artificielle", "machine learning", "ml"],
        answer:
          "Il se passionne pour les fondamentaux ML et les applications pratiques de l'IA. Certifié Associate Data Scientist par DataCamp, il travaille avec Scikit-learn pour la régression, classification et feature engineering. A construit un Modèle de Prédiction de Performance Étudiante atteignant R² > 0.70 avec validation croisée.",
      },
      {
        phrases: ["data science", "analyse de données", "pandas", "numpy"],
        answer:
          "Il travaille extensivement avec l'analyse de données, la modélisation statistique et les pipelines ML utilisant Pandas, NumPy et Matplotlib. Certifié Associate Data Scientist, il a construit des projets ML de bout en bout avec analyse exploratoire, feature engineering et évaluation de modèles.",
      },
      {
        phrases: ["go", "golang", "backend"],
        answer:
          "Go est son focus pour construire des systèmes backend performants et scalables. Combiné avec son expertise Node.js et Express.js (REST APIs, WebSockets, Authentication, RBAC), il architecture des applications serveur sécurisées et efficaces. Il approfondit goroutines, channels et patterns de conception système.",
      },
      {
        phrases: ["base de données", "postgresql", "mongodb", "sql"],
        answer:
          "Il travaille avec PostgreSQL, MongoDB et Oracle. Chez NAFTAL, il a modélisé et optimisé des schémas PostgreSQL pour des requêtes efficaces et la cohérence des données. Il conçoit des schémas normalisés et écrit des requêtes optimisées pour des systèmes de production.",
      },
      {
        phrases: ["certification", "datacamp", "certifié"],
        answer:
          "Il est certifié Associate Data Scientist par DataCamp avec certification professionnelle. Cela valide son expertise en Python, Pandas, NumPy, Scikit-learn, modélisation statistique et évaluation de modèles ML.",
      },
      {
        phrases: ["langues", "français", "anglais", "arabe"],
        answer:
          "Il est trilingue : Arabe (Natif), Français (niveau B2 – certifié TCF) et Anglais (compétence professionnelle). Cela lui permet de travailler efficacement dans des environnements internationaux et multilingues.",
      },
      {
        phrases: ["localisation", "remote", "où", "algérie"],
        answer:
          "Il est basé à Blida, Algérie, et disponible pour le travail à distance dans le monde entier. Il a de l'expérience avec les équipes distribuées et les outils de collaboration modernes (Git, Docker, Vercel, Railway).",
      },
      {
        phrases: ["contact", "email", "embaucher", "joindre"],
        answer:
          "Contactez-le à z_tikialine@estin.dz ou au +213 698 31 07 10. Retrouvez-le sur LinkedIn (linkedin.com/in/zakaria-tikialine) ou GitHub (github.com/ZakariaTikialine). Il est ouvert aux opportunités de développement fullstack, projets data science, implémentations ML ou conseil technique.",
      },
      {
        phrases: ["travailler", "collaborer", "disponible", "freelance"],
        answer:
          "Il serait ravi de collaborer ! Il est disponible pour des projets fullstack (React, Next.js, Node.js, PostgreSQL), analyse de données, implémentations ML ou conseil technique. Il peut travailler à distance et livrer des solutions prêtes pour la production.",
      },
    ],
  },
  ar: {
    introMessage: "مرحبًا! أنا مساعد زكرياء الذكي. إنه مطوّر واجهة أمامية في Egor Gaming. اسألني عن مهاراته، مشاريعه أو خبرته!",
    headerTitle: "تحدث مع مساعد زكرياء",
    statusLabel: "متصل",
    openLabel: "افتح المساعد الذكي",
    closeLabel: "أغلق المساعد",
    minimizeLabel: "تصغير النافذة",
    maximizeLabel: "تكبير النافذة",
    fullscreenLabel: "عرض بملء الشاشة",
    exitFullscreenLabel: "الخروج من العرض الكامل",
    placeholder: "اسأل عن المهارات أو المشاريع…",
    errorMessage: "تعذّر الاتصال بالذكاء الاصطناعي الآن. إليك ملخص سريع بدلاً من ذلك:",
    suggestions: [
      "أخبرني عن دورك في Egor Gaming",
      "ما هي شهادة DataCamp الخاصة بك؟",
      "هل أنت متاح للعمل عن بُعد؟",
    ],
    defaultResponses: [
      "سؤال جميل! هل يمكنك التحديد أكثر؟",
      "لا تتردّد في السؤال عن المهارات أو المشاريع أو تقنية معيّنة.",
      "يسعدني مساعدتك! جرّب السؤال عن المشاريع أو التقنيات أو التوفّر.",
    ],
    responses: [
      {
        phrases: ["egor", "egor gaming", "الوظيفة الحالية", "الدور الحالي", "واجهة أمامية", "front-end"],
        answer:
          "زكرياء حاليًا مطوّر واجهة أمامية في Egor Gaming (منذ ماي 2026)، حيث يبني ويطلق واجهات ويب موجهة للألعاب باستخدام React و Next.js و TypeScript ضمن فريق منتج — تطوير مكونات واجهة متجاوبة وسهلة الوصول والتعاون مع فرق التصميم والواجهة الخلفية.",
      },
      {
        phrases: ["مهارات", "skills", "stack", "تقنيات"],
        answer:
          "يتقن Python و TypeScript و JavaScript و Golang و SQL. الواجهات الأمامية: React.js و Next.js و Tailwind CSS. الخلفية: Node.js و Express.js و REST APIs مع RBAC. قواعد البيانات: PostgreSQL و MongoDB و Oracle. ML: Scikit-learn مع الانحدار والتصنيف وهندسة الميزات. ما الذي يهمك؟",
      },
      {
        phrases: ["مشاريع", "projects", "أعمال"],
        answer:
          "المشاريع الرئيسية: Tahwisa (إدارة تنقلات موظفي NAFTAL مع Next.js و Express و PostgreSQL ومصادقة RBAC)، نموذج التنبؤ بأداء الطلاب (خط ML متكامل، R² > 0.70 باستخدام Scikit-learn)، مخطط جداول CSP ومصور متاهة تفاعلي. كل مشروع يُظهر خبرة تقنية مختلفة.",
      },
      {
        phrases: ["تعليم", "دراسة", "جامعة", "شهادة"],
        answer:
          "يتابع شهادة مهندس دولة في علوم الحاسوب في ESTIN، متخصص في الذكاء الاصطناعي وعلوم البيانات (2022-2027). كما أنه حاصل على شهادة DataCamp المعتمدة كعالم بيانات مشارك.",
      },
      {
        phrases: ["خبرة", "عمل", "تدريب", "وظيفة"],
        answer:
          "حاليًا مطوّر واجهة أمامية في Egor Gaming (ماي 2026-الحالي)، يبني واجهات ويب باستخدام React و Next.js و TypeScript. سابقًا متدرب مطور ويب Full Stack في NAFTAL (يونيو-يوليو 2025)، حيث بنى منصة Tahwisa مع APIs REST آمنة ومخططات PostgreSQL محسّنة ومنطق اختيار آلي. على صعيد المجتمع، هو مساعد تقني في نادي School of AI (ورش عمل ML/DL) وكان مدير لوجستيات في نادي Nexus Security.",
      },
      {
        phrases: ["نفطال", "naftal", "tahwisa", "تدريب"],
        answer:
          "في NAFTAL، صمم ونشر Tahwisa—نظام إدارة تنقلات الموظفين. بناء APIs RESTful آمنة مع RBAC، تحسين مخططات PostgreSQL، تطوير واجهة أمامية متجاوبة مع Next.js و TypeScript، وأتمتة الاختيار للنشر الإنتاجي.",
      },
      {
        phrases: ["ذكاء اصطناعي", "ai", "تعلم آلي", "ml"],
        answer:
          "مهتم بعمق بأساسيات ML والتطبيقات العملية للذكاء الاصطناعي. حاصل على شهادة DataCamp كعالم بيانات مشارك، يعمل مع Scikit-learn للانحدار والتصنيف وهندسة الميزات. بنى نموذج التنبؤ بأداء الطلاب محققًا R² > 0.70 مع التحقق المتقاطع ومقاييس الخطأ.",
      },
      {
        phrases: ["علوم البيانات", "تحليل البيانات", "pandas", "numpy"],
        answer:
          "يعمل بشكل مكثف مع تحليل البيانات والنمذجة الإحصائية وخطوط ML باستخدام Pandas و NumPy و Matplotlib. معتمد كعالم بيانات مشارك وبنى مشاريع ML متكاملة مع تحليل استكشافي وهندسة ميزات وتقييم نماذج.",
      },
      {
        phrases: ["go", "golang", "خلفية", "backend"],
        answer:
          "Go هو تركيزه لبناء أنظمة خلفية عالية الأداء وقابلة للتوسع. بالاقتران مع خبرته في Node.js و Express.js (REST APIs و WebSockets و Authentication و RBAC)، يبني تطبيقات خادم آمنة وفعالة. يتعلم goroutines و channels وأنماط تصميم الأنظمة.",
      },
      {
        phrases: ["قاعدة بيانات", "postgresql", "mongodb", "sql"],
        answer:
          "يعمل مع PostgreSQL و MongoDB و Oracle. في NAFTAL، صمم وحسّن مخططات PostgreSQL العلائقية لاستعلامات فعالة واتساق البيانات. يصمم مخططات طبيعية ويكتب استعلامات محسّنة لأنظمة الإنتاج.",
      },
      {
        phrases: ["شهادة", "datacamp", "معتمد"],
        answer:
          "حاصل على شهادة DataCamp المعتمدة كعالم بيانات مشارك مع شهادة مهنية. هذا يتحقق من خبرته في Python و Pandas و NumPy و Scikit-learn والنمذجة الإحصائية وتقييم نماذج ML.",
      },
      {
        phrases: ["لغات", "فرنسية", "إنجليزية", "عربية"],
        answer:
          "متعدد اللغات: العربية (الأم)، الفرنسية (مستوى B2 – معتمد TCF)، والإنجليزية (كفاءة مهنية). هذا يمكّنه من العمل بفعالية في بيئات دولية ومتعددة اللغات.",
      },
      {
        phrases: ["موقع", "remote", "أين", "الجزائر"],
        answer:
          "مقره في البليدة، الجزائر، ومتاح للعمل عن بُعد في جميع أنحاء العالم. لديه خبرة مع الفرق الموزعة وأدوات التعاون الحديثة (Git و Docker و Vercel و Railway).",
      },
      {
        phrases: ["اتصال", "بريد", "توظيف", "التواصل"],
        answer:
          "تواصل معه على z_tikialine@estin.dz أو 0698310710+213. جده على LinkedIn (linkedin.com/in/zakaria-tikialine) أو GitHub (github.com/ZakariaTikialine). مفتوح لفرص التطوير fullstack ومشاريع علوم البيانات وتنفيذات ML أو الاستشارات التقنية.",
      },
      {
        phrases: ["عمل", "تعاون", "collaborate", "متاح", "freelance"],
        answer:
          "يسعده التعاون! متاح لمشاريع fullstack (React و Next.js و Node.js و PostgreSQL)، تحليل البيانات، تنفيذات ML أو الاستشارات التقنية. يمكنه العمل عن بُعد وتقديم حلول جاهزة للإنتاج.",
      },
    ],
  },
}

export function getAiTerminalContent(locale: Locale): AiTerminalContent {
  return aiTerminalContent[locale] ?? aiTerminalContent.en
}
