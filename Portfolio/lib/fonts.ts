import {
  IBM_Plex_Sans_Arabic,
  Instrument_Sans,
  Martian_Mono,
  Noto_Kufi_Arabic,
} from "next/font/google"

/** Latin headings and body. Variable width axis is used for the narrow display cut. */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--ff-sans",
})

/** Labels, dates and tool names. */
export const martianMono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--ff-mono",
})

/** Arabic headings. Not preloaded: Latin pages only use it for the Arabic name line. */
export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  display: "swap",
  preload: false,
  variable: "--ff-kufi",
})

/** Arabic body text. */
export const plexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--ff-arabic",
})

export const fontVariables = [
  instrumentSans.variable,
  martianMono.variable,
  notoKufiArabic.variable,
  plexSansArabic.variable,
].join(" ")
