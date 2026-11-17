import { ImageResponse } from "next/og"
import { getDictionary, profile } from "@/content"
import { locales, routing, type Locale } from "@/i18n/routing"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Zakaria Tikialine, Full-Stack Developer, AI & Data Science"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const strata = ["#1b2a5e", "#22377d", "#2c48a8", "#2f55e0"]

/** Link preview card. Latin text only, so it renders without loading an Arabic font at build time. */
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const safeLocale: Locale = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale
  const role =
    safeLocale === "ar" ? getDictionary("en").hero.role : getDictionary(safeLocale).hero.role

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#070d1f",
        color: "#e9edfa",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#7b96ff" }}>
          {"<"}
          <span style={{ color: "#e9edfa" }}>Zakaria</span>
          <span style={{ color: "#f5b53f", marginLeft: 10 }}>/</span>
          {">"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {profile.name.latin}
          </div>
          <div style={{ fontSize: 36, color: "#9aa6c7" }}>{role}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
          width: 300,
        }}
      >
        {strata.map((color, index) => (
          <div
            key={color}
            style={{
              display: "flex",
              height: 62,
              borderRadius: 14,
              background: color,
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 24,
            }}
          >
            {index !== 2 ? (
              <div style={{ width: 16, height: 16, borderRadius: 8, background: "#f5b53f" }} />
            ) : null}
          </div>
        ))}
      </div>
    </div>,
    size,
  )
}
