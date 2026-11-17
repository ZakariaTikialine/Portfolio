import type { ReactNode } from "react"
import "./globals.css"

/** The <html> element is rendered by app/[locale]/layout.tsx so it can carry lang and dir. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
