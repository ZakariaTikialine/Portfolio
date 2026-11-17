import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "fr", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
})

export type Locale = (typeof routing.locales)[number]

export const locales = routing.locales

/** Text direction per locale. */
export const direction: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fr: "ltr",
  ar: "rtl",
}

/** Each language's name written in that language, for the language switcher. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
}

/** BCP 47 tags used for date formatting. Arabic keeps Latin digits for readability. */
export const intlLocale: Record<Locale, string> = {
  en: "en-US",
  fr: "fr-FR",
  ar: "ar-u-nu-latn",
}
