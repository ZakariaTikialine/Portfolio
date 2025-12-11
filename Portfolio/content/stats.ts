import type { Locale } from "@/navigation"

export type StatIcon = "folder" | "trophy" | "users" | "code"

export interface StatItem {
  label: string
  value: string
  icon: StatIcon
}

const statsByLocale: Record<Locale, StatItem[]> = {
  en: [
    { label: "Projects completed", value: "10+", icon: "folder" },
    { label: "Years experience", value: "2+", icon: "trophy" },
    { label: "Happy clients", value: "1", icon: "users" },
    { label: "Code commits", value: "+1k", icon: "code" },
  ],
  fr: [
    { label: "Projets livrés", value: "10+", icon: "folder" },
    { label: "Années d'expérience", value: "2+", icon: "trophy" },
    { label: "Clients satisfaits", value: "1", icon: "users" },
    { label: "Commits", value: "+1k", icon: "code" },
  ],
  ar: [
    { label: "المشاريع المكتملة", value: "+10", icon: "folder" },
    { label: "سنوات الخبرة", value: "+2", icon: "trophy" },
    { label: "العملاء الراضون", value: "1", icon: "users" },
    { label: "سجلات الشيفرة", value: "+1k", icon: "code" },
  ],
}

export function getStats(locale: Locale): StatItem[] {
  return statsByLocale[locale] ?? statsByLocale.en
}
