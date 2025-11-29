import type {Locale} from "@/navigation"

export interface AboutContent {
  badge: string
  heading: string
  description: string
  story: string[]
  exploringLabel: string
  exploringItems: string[]
  principlesLabel: string
  principles: string[]
  highlightsLabel: string
  highlights: { value: string; detail: string }[]
}

const aboutContent: Record<Locale, AboutContent> = {
  en: {
    badge: "About",
    heading: "Building thoughtful systems end-to-end",
    description: "I craft experiences where performant backends, polished interfaces, and intelligent automation meet.",
    story: [
      "I'm a passionate developer and AI-focused student who thrives at the intersection of multiple disciplines. My journey combines rigorous backend engineering with thoughtful frontend design, enhanced by data-driven insights and machine learning innovation.",
      "I enjoy untangling complex challenges. Whether architecting resilient systems, refining algorithms, or prototyping AI features, I aim for solutions that feel simple without sacrificing depth.",
      "I'm fascinated by systems design, constraint satisfaction, and how AI can augment human decision-making. Great software starts with empathy for the problem, then blends precision, aesthetics, and measurable impact.",
    ],
    exploringLabel: "Currently exploring",
    exploringItems: [
      "Go-powered backend pipelines",
      "Responsible AI and ML fundamentals",
      "Design systems for data-heavy apps",
    ],
    principlesLabel: "Principles",
    principles: [
      "Design clarity first, aesthetics second.",
      "Ship measurable progress weekly.",
      "Automate intentional workflows, not everything.",
    ],
    highlightsLabel: "Highlights",
    highlights: [
      { value: "20+", detail: "Projects shipped" },
      { value: "5+", detail: "Tech stacks used" },
      { value: "∞", detail: "Always learning" },
    ],
  },
  fr: {
    badge: "À propos",
    heading: "Concevoir des systèmes réfléchis de bout en bout",
    description: "Je conçois des expériences où backends performants, interfaces soignées et automatisation intelligente se rencontrent.",
    story: [
      "Je suis un développeur passionné et étudiant spécialisé en IA qui s'épanouit à l'intersection de plusieurs disciplines. Mon parcours combine une ingénierie backend rigoureuse avec un design frontend réfléchi, amplifié par les insights data et l'innovation ML.",
      "J'aime démêler les défis complexes. Qu'il s'agisse d'architecturer des systèmes résilients, d'affiner des algorithmes ou de prototyper des fonctionnalités IA, je vise des solutions simples sans perdre la profondeur.",
      "Je suis fasciné par le design système, la satisfaction de contraintes et la façon dont l'IA augmente la décision humaine. Un bon logiciel naît de l'empathie pour le problème, puis marie précision, esthétique et impact mesurable.",
    ],
    exploringLabel: "Explorations du moment",
    exploringItems: [
      "Pipelines backend propulsés par Go",
      "Fondamentaux IA responsable et ML",
      "Design systems pour applications data-heavy",
    ],
    principlesLabel: "Principes",
    principles: [
      "La clarté avant l'esthétique.",
      "Livrer des progrès mesurables chaque semaine.",
      "Automatiser les workflows intentionnels, pas tout.",
    ],
    highlightsLabel: "Faits marquants",
    highlights: [
      { value: "20+", detail: "Projets livrés" },
      { value: "5+", detail: "Stacks techniques utilisées" },
      { value: "∞", detail: "Toujours en apprentissage" },
    ],
  },
  ar: {
    badge: "نبذة",
    heading: "أبني أنظمة مدروسة من البداية إلى النهاية",
    description: "أصمّم تجارب تلتقي فيها الخلفيات عالية الأداء مع الواجهات المصقولة والأتمتة الذكية.",
    story: [
      "أنا مطوّر شغوف وطالب يركز على الذكاء الاصطناعي، أزدهر عند تقاطع التخصصات. رحلتي تجمع بين هندسة خلفية صارمة وتصميم واجهات مدروس، مدعومة بالبصائر المستندة إلى البيانات وابتكارات التعلم الآلي.",
      "أستمتع بفك التعقيدات. سواء كنت أضع معمارية أنظمة مرنة، أو أحسّن الخوارزميات، أو أختبر ميزات ذكاء اصطناعي، أسعى إلى حلول تبدو بسيطة من دون فقدان العمق.",
      "أنا مفتون بتصميم الأنظمة، ومشكلات الإرضاء بالقيود، وكيف يمكن للذكاء الاصطناعي دعم قرارات البشر. يبدأ البرنامج الجيد بالتعاطف مع المشكلة ثم يمزج الدقة والجمال والأثر القابل للقياس.",
    ],
    exploringLabel: "أستكشف الآن",
    exploringItems: [
      "خطوط Backend تعمل بـ Go",
      "أساسيات الذكاء الاصطناعي المسؤول والتعلم الآلي",
      "أنظمة تصميم لتطبيقات مليئة بالبيانات",
    ],
    principlesLabel: "مبادئ",
    principles: [
      "الوضوح قبل الجماليات.",
      "تقديم تقدم ملموس كل أسبوع.",
      "أتمتة التدفقات المقصودة فقط.",
    ],
    highlightsLabel: "أبرز الأرقام",
    highlights: [
      { value: "20+", detail: "مشاريع منفذة" },
      { value: "5+", detail: "أطر تقنية مستخدمة" },
      { value: "∞", detail: "أتعلم باستمرار" },
    ],
  },
}

export function getAboutContent(locale: Locale): AboutContent {
  return aboutContent[locale] ?? aboutContent.en
}
