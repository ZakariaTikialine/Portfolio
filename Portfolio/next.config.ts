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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
