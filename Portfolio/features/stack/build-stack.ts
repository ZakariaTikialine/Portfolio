import { LAYERS, profile, type Dictionary, type Layer } from "@/content"
import type { Locale } from "@/i18n/routing"
import { formatCount } from "@/lib/plural"

/** How many tools each band shows; the skills section lists them all. */
const TOOLS_PER_LAYER = 5

export interface StackLayerView {
  id: Layer
  name: string
  tools: readonly string[]
  count: string
}

export interface StackProjectView {
  slug: string
  title: string
  layers: readonly Layer[]
}

export interface StackView {
  layers: StackLayerView[]
  projects: StackProjectView[]
  labels: Dictionary["stack"]
}

/** Join language-independent facts with the visitor's language into plain props for the client. */
export function buildStackView(locale: Locale, dict: Dictionary): StackView {
  const projects: StackProjectView[] = profile.projects.map((project) => ({
    slug: project.slug,
    title: dict.projects[project.slug].title,
    layers: project.layers,
  }))

  const layers = LAYERS.map((id) => ({
    id,
    name: dict.layers[id],
    tools: profile.stack[id].slice(0, TOOLS_PER_LAYER),
    count: formatCount(
      locale,
      dict.stack.projectCount,
      projects.filter((project) => project.layers.includes(id)).length,
    ),
  }))

  return { layers, projects, labels: dict.stack }
}
