import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { getDictionary } from "@/content"
import { routing } from "@/i18n/routing"
import { Hero } from "@/features/hero/hero"

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const dict = getDictionary(locale)

  return <Hero locale={locale} dict={dict} />
}
