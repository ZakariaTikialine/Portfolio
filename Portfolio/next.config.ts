import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

/**
 * Pages from the previous multi-page site, mapped to their section on the new single page.
 * Kept as permanent redirects so existing links and search results keep working.
 */
const legacySections: Record<string, string | null> = {
  about: null,
  blog: null,
  experience: "experience",
  education: "education",
  skills: "skills",
  projects: "work",
  contact: "contact",
}

const isDev = process.env.NODE_ENV === "development"

/**
 * Content-Security-Policy. Scripts keep 'unsafe-inline' because statically rendered Next.js pages
 * embed inline bootstrap scripts; a nonce-based policy would force every page to render on demand.
 * Everything else is restricted to this site, plus Web3Forms for the contact form.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: "/cv", destination: "/ZakariaTikialineCV.pdf", permanent: false },
      ...Object.entries(legacySections).map(([page, section]) => ({
        source: `/:locale(en|fr|ar)/${page}`,
        destination: section ? `/:locale#${section}` : "/:locale",
        permanent: true,
      })),
    ]
  },
}

export default withNextIntl(nextConfig)
