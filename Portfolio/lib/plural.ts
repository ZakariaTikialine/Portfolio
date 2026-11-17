import type { PluralForms } from "@/content/types"
import { intlLocale, type Locale } from "@/i18n/routing"

/** Pick the right plural form for `count` and substitute it for `#`. */
export function formatCount(locale: Locale, forms: PluralForms, count: number): string {
  const category = new Intl.PluralRules(intlLocale[locale]).select(count)
  const template = forms[category] ?? forms.other
  return template.replace("#", new Intl.NumberFormat(intlLocale[locale]).format(count))
}
