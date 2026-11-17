import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/next"
import { getDictionary } from "@/content"
import { direction, locales, routing } from "@/i18n/routing"
import { fontVariables } from "@/lib/fonts"
import { siteUrl } from "@/lib/site"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ThemeProvider } from "@/components/layout/theme-provider"

interface LayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e18" },
  ],
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
              className="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
            >
              {dict.a11y.skipToContent}
            </a>
            <Header locale={locale} dict={dict} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} dict={dict} />
          </NextIntlClientProvider>
        </ThemeProvider>
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  )
}
