import { profile, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { siteUrl } from "@/lib/site"

/** schema.org Person data, so search engines can connect the site, CV and social profiles. */
export function PersonJsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name.latin,
    alternateName: profile.name.arabic,
    jobTitle: dict.hero.role,
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}${profile.portrait}`,
    email: `mailto:${profile.email}`,
    sameAs: [profile.links.github, profile.links.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Blida", addressCountry: "DZ" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
      url: profile.education.url,
    },
    worksFor: {
      "@type": "Organization",
      name: profile.experience[0].organization,
      url: profile.experience[0].url,
    },
    knowsLanguage: ["ar", "fr", "en"],
  }

  return (
    <script
      type="application/ld+json"
      // Safe once every "<" becomes the JSON escape \u003c (six characters), so the data can
      // never close the <script> element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
