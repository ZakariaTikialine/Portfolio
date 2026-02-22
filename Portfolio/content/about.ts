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
    description: "I craft experiences where performant backends, polished interfaces, and intelligent automation meet. DataCamp Certified Associate Data Scientist.",
    story: [
      "I'm a passionate Full Stack Developer and DataCamp Certified Associate Data Scientist who thrives at the intersection of multiple disciplines. My journey combines rigorous backend engineering with thoughtful frontend design, enhanced by data-driven insights and machine learning innovation.",
      "I enjoy untangling complex challenges. Whether architecting resilient systems, refining algorithms, or prototyping AI features, I aim for solutions that feel simple without sacrificing depth.",
      "I'm fascinated by systems design, constraint satisfaction, and how AI can augment human decision-making. Great software starts with empathy for the problem, then blends precision, aesthetics, and measurable impact.",
    ],
    exploringLabel: "Currently exploring",
    exploringItems: [
      "Deep learning with TensorFlow & PyTorch",
      "Machine learning model deployment",
      "Neural networks and computer vision",
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
    description: "Je conçois des expériences où backends performants, interfaces soignées et automatisation intelligente se rencontrent. Certifié Associate Data Scientist par DataCamp.",
    story: [
      "Je suis un développeur Full Stack passionné et un Associate Data Scientist certifié par DataCamp qui s'épanouit à l'intersection de plusieurs disciplines. Mon parcours combine une ingénierie backend rigoureuse avec un design frontend réfléchi, amplifié par les analyses de données et l'innovation en apprentissage automatique.",
      "J'aime démêler les défis complexes. Qu'il s'agisse d'architecturer des systèmes résilients, d'affiner des algorithmes ou de prototyper des fonctionnalités IA, je vise des solutions simples sans perdre la profondeur.",
      "Je suis fasciné par le design système, la satisfaction de contraintes et la façon dont l'IA augmente la décision humaine. Un bon logiciel naît de l'empathie pour le problème, puis marie précision, esthétique et impact mesurable.",
    ],
    exploringLabel: "Explorations du moment",
    exploringItems: [
      "Deep learning avec TensorFlow & PyTorch",
      "Déploiement de modèles machine learning",
      "Réseaux de neurones et vision par ordinateur",
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
    badge: "عنّي",
    heading: "أبني أنظمة مدروسة من البداية إلى النهاية",
    description: "أصمّم تجارب تلتقي فيها الخلفيات عالية الأداء مع الواجهات المصقولة والأتمتة الذكية. عالم بيانات مشارك معتمد من DataCamp.",
    story: [
      "أنا مطوّر Full Stack شغوف وعالم بيانات مشارك معتمد من DataCamp، أزدهر عند تقاطع التخصصات. رحلتي تجمع بين هندسة خلفية صارمة وتصميم واجهات مدروس، مدعومة بالبصائر المستندة إلى البيانات وابتكارات التعلم الآلي.",
      "أستمتع بفك التعقيدات. سواء كنت أضع معمارية أنظمة مرنة، أو أحسّن الخوارزميات، أو أختبر ميزات ذكاء اصطناعي، أسعى إلى حلول تبدو بسيطة من دون فقدان العمق.",
      "أنا مفتون بتصميم الأنظمة، ومشكلات الإرضاء بالقيود، وكيف يمكن للذكاء الاصطناعي دعم قرارات البشر. يبدأ البرنامج الجيد بالتعاطف مع المشكلة ثم يمزج الدقة والجمال والأثر القابل للقياس.",
    ],
    exploringLabel: "أستكشف الآن",
    exploringItems: [
      "التعلم العميق باستخدام TensorFlow و PyTorch",
      "نشر نماذج التعلم الآلي",
      "الشبكات العصبية والرؤية الحاسوبية",
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
