export const locales = ["en", "fr", "ar"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"
export const localePrefix = "always" as const
