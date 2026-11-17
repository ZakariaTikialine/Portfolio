import type { Locale } from "@/i18n/routing"
import { ar } from "./i18n/ar"
import { en } from "./i18n/en"
import { fr } from "./i18n/fr"
import type { Dictionary } from "./types"

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export { profile } from "./profile"
export * from "./types"
