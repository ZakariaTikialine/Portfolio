import type {Locale} from "@/navigation"

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export interface TestimonialsContent {
  heading: string
  testimonials: Testimonial[]
}

const testimonialsContent: Record<Locale, TestimonialsContent> = {
  en: {
    heading: "Client testimonials",
    testimonials: [
      {
        name: "Mustapha Khelifa Allali",
        role: "Project Manager",
        content:
          "Zakaria delivered exceptional work on our project. His attention to detail and technical expertise were invaluable.",
        rating: 5,
      },
    ],
  },
  fr: {
    heading: "Témoignages clients",
    testimonials: [
      {
        name: "Mustapha Khelifa Allali",
        role: "Chef de projet",
        content:
          "Zakaria a fourni un travail exceptionnel. Son sens du détail et son expertise technique ont fait la différence.",
        rating: 5,
      },
    ],
  },
  ar: {
    heading: "شهادات العملاء",
    testimonials: [
      {
        name: "مصطفى خليفة العلالي",
        role: "مدير مشروع",
        content:
          "قدّم زكرياء عملاً مميزًا في مشروعنا. دقته وخبرته التقنية كانتا أساسيتين.",
        rating: 5,
      },
    ],
  },
}

export function getTestimonialsContent(locale: Locale): TestimonialsContent {
  return testimonialsContent[locale] ?? testimonialsContent.en
}
