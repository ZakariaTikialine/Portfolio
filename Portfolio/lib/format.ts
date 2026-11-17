import type { Period, YearMonth } from "@/content/types"
import { intlLocale, type Locale } from "@/i18n/routing"

function toDate(value: YearMonth): Date {
  const [year, month] = value.split("-").map(Number)
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, 1))
}

/** "Jun 2025", "juin 2025", "يونيو 2025". */
export function formatMonth(locale: Locale, value: YearMonth): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(toDate(value))
}

/** "Jun 2025 – Jul 2025", or "May 2026 – Present" for an ongoing period. */
export function formatPeriod(locale: Locale, period: Period, presentLabel: string): string {
  const start = formatMonth(locale, period.start)
  const end = period.end ? formatMonth(locale, period.end) : presentLabel
  return `${start} – ${end}`
}
