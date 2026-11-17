import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { getDictionary } from "@/content"
import { routing } from "@/i18n/routing"
import { Contact } from "@/features/contact/contact"
import { Education } from "@/features/education/education"
import { Experience } from "@/features/experience/experience"
import { Hero } from "@/features/hero/hero"
import { Skills } from "@/features/skills/skills"
import { Work } from "@/features/work/work"
import { PersonJsonLd } from "@/features/seo/person-json-ld"

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const dict = getDictionary(locale)

  return (
    <>
      <PersonJsonLd locale={locale} dict={dict} />
      <Hero locale={locale} dict={dict} />
      <Work dict={dict} />
      <Experience locale={locale} dict={dict} />
      <Skills dict={dict} />
      <Education locale={locale} dict={dict} />
      <Contact dict={dict} />
    </>
  )
}
