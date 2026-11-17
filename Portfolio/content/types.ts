/**
 * Content types shared by every locale.
 *
 * Facts that do not change with language (dates, links, tools, layers) live once in `profile.ts`.
 * Everything a visitor reads lives in `i18n/<locale>.ts`, typed by `Dictionary`, so a missing or
 * extra translation is a type error rather than a silent gap on the page.
 */

import type { ProjectSlug } from "./profile"

/** The four layers of the stack drawn in the hero, top to bottom. */
export const LAYERS = ["interface", "api", "model", "data"] as const
export type Layer = (typeof LAYERS)[number]

/** Sections of the single page, in reading order. Used for anchors and navigation. */
export const SECTIONS = ["work", "experience", "skills", "education", "contact"] as const
export type SectionId = (typeof SECTIONS)[number]

/** A calendar month, written `YYYY-MM`. */
export type YearMonth = `${number}-${number}`

export interface Period {
  start: YearMonth
  /** `null` means ongoing. */
  end: YearMonth | null
}

export interface RepoLink {
  label: string
  url: string
}

export interface ProjectFacts {
  slug: string
  layers: readonly Layer[]
  stack: readonly string[]
  featured: boolean
  period?: Period
  demo?: string
  repos: readonly RepoLink[]
}

export interface RoleFacts {
  id: string
  organization: string
  url?: string
  period: Period
  layers: readonly Layer[]
  stack: readonly string[]
  /** Slug of a project this role produced, if any. */
  project?: string
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  a11y: {
    skipToContent: string
    primaryNav: string
    openMenu: string
    closeMenu: string
    toggleTheme: string
    language: string
    backToTop: string
    opensInNewTab: string
  }
  nav: Record<SectionId, string>
  hero: {
    role: string
    summary: string
    status: string
    availability: string
    location: string
    ctaCv: string
    ctaContact: string
  }
  layers: Record<Layer, string>
  stack: {
    title: string
    hint: string
    /** Plural forms; `#` is replaced by the number. */
    projectCount: PluralForms
  }
  projects: Record<ProjectSlug, ProjectText>
  footer: {
    rights: string
    source: string
  }
}

export interface ProjectText {
  title: string
  summary: string
}

/** CLDR plural categories. `other` is always required; Arabic also uses zero, two, few and many. */
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }
