import type React from "react"
import type { Metadata } from "next"
import { Fira_Code, Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import SidebarNav from "@/components/sidebar-nav"
import ThemeToggle from "@/components/theme-toggle"
import AiTerminal from "@/components/ai-terminal"
import CommandPalette from "@/components/command-palette"
import NeuralBackground from "@/components/neural-background"
import DynamicTheme from "@/components/dynamic-theme"

const inter = Inter({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const firaCode = Fira_Code({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zakaria TIKIALINE - Fullstack Developer & Data Scientist",
  description: "Portfolio of Zakaria TIKIALINE | Building intelligent systems with Next.js, Python, and AI",
  generator: "v0.app",
  keywords: ["fullstack developer", "data scientist", "AI", "Next.js", "Python", "machine learning"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className={`${inter.className} antialiased`}>
        <DynamicTheme />
        <NeuralBackground />
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5" />

          <SidebarNav />

          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle />
          </div>

          <main className="relative ml-64 min-h-screen overflow-y-auto custom-scrollbar">{children}</main>

          <CommandPalette />

          <AiTerminal />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
