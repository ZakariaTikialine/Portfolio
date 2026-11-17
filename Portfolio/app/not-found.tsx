import Link from "next/link"
import { fontVariables } from "@/lib/fonts"

/** Fallback for paths outside any locale. Localized 404 pages come with the SEO step. */
export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="grid min-h-svh place-items-center p-6 text-center">
        <div className="grid gap-4">
          <p className="label">404</p>
          <h1 className="text-3xl font-semibold">This page doesn&apos;t exist.</h1>
          <Link href="/" className="text-s4 underline underline-offset-4">
            Go to the homepage
          </Link>
        </div>
      </body>
    </html>
  )
}
