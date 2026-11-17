import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/next"
import { getDictionary, profile } from "@/content"
import { direction, intlLocale, locales, routing } from "@/i18n/routing"
import { fontVariables } from "@/lib/fonts"
import { siteUrl } from "@/lib/site"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Assistant } from "@/features/assistant/assistant"

interface LayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: "#070d1f",
  colorScheme: "dark light",
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) return {}
  const { meta } = getDictionary(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "profile",
      firstName: "Zakaria",
      lastName: "Tikialine",
      locale: intlLocale[locale].split("-u-")[0],
      url: `/${locale}`,
      siteName: profile.name.latin,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    authors: [{ name: profile.name.latin, url: siteUrl }],
    creator: profile.name.latin,
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const dict = getDictionary(locale)

  return (
    <html lang={locale} dir={direction[locale]} className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        <ThemeProvider>
          <NextIntlClientProvider messages={null}>
            <a
              href="#main"
              className="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4"
            >
              {dict.a11y.skipToContent}
            </a>
            <Header locale={locale} dict={dict} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} dict={dict} />
            <Assistant
              locale={locale}
              labels={dict.assistant}
              sectionLabels={dict.nav}
              email={profile.email}
            />
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  )
}
