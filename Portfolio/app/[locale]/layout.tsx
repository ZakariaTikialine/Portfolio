import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Noto_Sans_Arabic, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import SidebarNav from "@/components/sidebar-nav"
import ThemeToggle from "@/components/theme-toggle"
import DynamicTheme from "@/components/dynamic-theme"
import { ThemeProvider } from "@/components/theme-provider"
import { AiTerminal, CommandPalette, NeuralBackground } from "@/components/client-components"
import { locales, type Locale } from "@/i18n"
import "@/app/globals.css"

const jetBrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-latin" })
const notoArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
})

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

function isSupportedLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "metadata" })
  return {
    title: t("title"),
    description: t("description"),
    generator: "Zakaria Tikialine",
    keywords: ["fullstack developer", "data scientist", "AI", "Next.js", "Python", "machine learning"],
    icons: {
      icon: "/icon.svg",
      apple: "/apple-icon.svg",
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const direction = locale === "ar" ? "rtl" : "ltr"
  const messages = await getMessages({ locale })
  const sidebarOffsetClass = locale === "ar" ? "lg:mr-64" : "lg:ml-64"
  const themeToggleAnchor = locale === "ar" ? "lg:left-6" : "lg:right-6"

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning className="custom-scrollbar">
      <head />
      <body className={`${jetBrains.variable} ${notoArabic.variable} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
            <DynamicTheme />
            <NeuralBackground />

            <div className="relative min-h-screen text-foreground" data-locale={locale}>
              <div className="fixed inset-0 -z-10 bg-linear-to-br from-accent/5 via-transparent to-secondary/5" />

              <SidebarNav />

              <div className={`hidden lg:fixed ${themeToggleAnchor} lg:top-6 lg:z-50 lg:block`}>
                <ThemeToggle />
              </div>

              <main
                className={`custom-scrollbar relative min-h-screen overflow-y-auto pb-24 pt-14 lg:pt-0 ${sidebarOffsetClass}`}
                dir={direction}
              >
                {children}
              </main>

              <CommandPalette />
              <div className="hidden lg:block">
                <AiTerminal />
              </div>
            </div>
          </NextIntlClientProvider>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
