/**
 * Content types shared by every locale.
 *
 * Facts that do not change with language (dates, links, tools, layers) live once in `profile.ts`.
 * Everything a visitor reads lives in `i18n/<locale>.ts`, typed by `Dictionary`, so a missing or
 * extra translation is a type error rather than a silent gap on the page.
 */

import type { CommunityId, ProjectSlug, RoleId } from "./profile"

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

export type RepoKind = "frontend" | "backend" | "source" | "notebooks"
export type LiveKind = "demo" | "platform"

export interface RepoLink {
  kind: RepoKind
  url: string
}

export interface ProjectFacts {
  slug: string
  layers: readonly Layer[]
  stack: readonly string[]
  featured: boolean
  period?: Period
  /** A running deployment: a demo, or the live product itself. */
  live?: { kind: LiveKind; url: string }
  image?: string
  repos: readonly RepoLink[]
}

export interface RoleFacts {
  id: string
  organization: string
  url?: string
  period: Period
  layers: readonly Layer[]
  stack: readonly string[]
}

/** CLDR plural categories. `other` is always required; Arabic also uses zero, two, few and many. */
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

export interface ProjectText {
  title: string
  /** What the project is and what I did, one or two sentences. */
  summary: string
  /** My part, shown above the title. */
  role: string
  points: string[]
  imageAlt?: string
}

export interface RoleText {
  title: string
  context: string
  location: string
  points: string[]
}

export interface CommunityText {
  title: string
  summary: string
}

export interface SectionHeading {
  eyebrow: string
  title: string
  intro?: string
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
    home: string
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
  work: SectionHeading & {
    featured: string
    alsoBuilt: string
    live: Record<LiveKind, string>
    repoKinds: Record<RepoKind, string>
    moreOnGitHub: string
    layersLabel: string
  }
  projects: Record<ProjectSlug, ProjectText>
  experience: SectionHeading & {
    present: string
    current: string
    communityTitle: string
  }
  roles: Record<RoleId, RoleText>
  community: Record<CommunityId, CommunityText>
  skills: SectionHeading & {
    tooling: string
    spokenLanguages: string
    languages: { name: string; level: string }[]
  }
  education: SectionHeading & {
    degree: string
    field: string
    institution: string
    note: string
    certificationLabel: string
    certification: string
    certificationNote: string
    evidence: string
  }
  contact: SectionHeading & {
    emailLabel: string
    copy: string
    copied: string
    elsewhere: string
    form: {
      title: string
      name: string
      email: string
      message: string
      send: string
      sending: string
      success: string
      error: string
    }
  }
  assistant: {
    launcher: string
    title: string
    subtitle: string
    intro: string
    suggestions: string[]
    placeholder: string
    send: string
    close: string
    reset: string
    thinking: string
    error: string
    rateLimited: string
    offlineNote: string
    disclaimer: string
    limitReached: string
    /** Reply when a message looks like an attempt to override the assistant's instructions. */
    refusal: string
    /** Answers used when the AI model is unreachable. `{name}` placeholders are filled from content. */
    offline: {
      experience: string
      projects: string
      skills: string
      education: string
      ai: string
      contact: string
      fallback: string
    }
  }
  notFound: {
    title: string
    body: string
    home: string
  }
  footer: {
    rights: string
    source: string
  }
}
