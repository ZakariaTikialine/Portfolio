import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Cairo, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import SidebarNav from "@/components/sidebar-nav"
import ThemeToggle from "@/components/theme-toggle"
import AiTerminal from "@/components/ai-terminal"
import CommandPalette from "@/components/command-palette"
import NeuralBackground from "@/components/neural-background"
import DynamicTheme from "@/components/dynamic-theme"
import { locales, type Locale } from "@/i18n"
import "@/app/globals.css"

const jetBrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-latin" })
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-arabic" })

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
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${jetBrains.variable} ${cairo.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
          <DynamicTheme />
          <NeuralBackground />

          <div className="relative min-h-screen overflow-hidden bg-background text-foreground" data-locale={locale}>
            <div className="fixed inset-0 -z-10 bg-linear-to-br from-accent/5 via-transparent to-secondary/5" />

            <SidebarNav />

            <div className={`hidden lg:fixed ${themeToggleAnchor} lg:top-6 lg:z-50 lg:block`}>
              <ThemeToggle />
            </div>

            <main
              className={`custom-scrollbar relative min-h-screen overflow-y-auto pt-20 lg:pt-0 ${sidebarOffsetClass}`}
              dir={direction}
            >
              {children}
            </main>

            <CommandPalette />
            <AiTerminal />
          </div>
        </NextIntlClientProvider>

        <Analytics />
      </body>
    </html>
  )
}
