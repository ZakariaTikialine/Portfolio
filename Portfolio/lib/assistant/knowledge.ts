import "server-only"
import { LAYERS, profile } from "@/content"
import { getDictionary } from "@/content"
import { formatPeriod } from "@/lib/format"

/**
 * Everything the assistant knows, generated from the same content files the page renders.
 * English is used as the source language; the model answers in the visitor's language.
 * The phone number is intentionally absent: only what the public site shows is shared.
 */
export function buildKnowledge(): string {
  const en = getDictionary("en")
  const present = en.experience.present
  const lines: string[] = []

  lines.push(
    `Name: ${profile.name.latin} (Arabic: ${profile.name.arabic})`,
    `Title: ${en.hero.role}`,
    `Summary: ${en.hero.summary}`,
    `Status: ${en.hero.status.replace(" ", " ")}. ${en.hero.availability}.`,
    `Location: ${en.hero.location}`,
    `Email: ${profile.email}`,
    `LinkedIn: ${profile.links.linkedin}`,
    `GitHub: ${profile.links.github}`,
    `CV (PDF): ${profile.links.cv}`,
    "",
    "EXPERIENCE",
  )
  for (const role of profile.experience) {
    const text = en.roles[role.id]
    lines.push(
      `- ${text.title} at ${role.organization} (${text.context}), ${formatPeriod("en", role.period, present)}, ${text.location}. Stack: ${role.stack.join(", ")}.`,
      ...text.points.map((point) => `  • ${point}`),
    )
  }

  lines.push("", "PROJECTS")
  for (const project of profile.projects) {
    const text = en.projects[project.slug]
    const links = [
      "live" in project && project.live
        ? `${en.work.live[project.live.kind]}: ${project.live.url}`
        : null,
      ...project.repos.map((repo) => `${en.work.repoKinds[repo.kind]}: ${repo.url}`),
    ].filter(Boolean)
    lines.push(
      `- ${text.title} (${text.role}). ${text.summary} Stack: ${project.stack.join(", ")}.${links.length ? ` Links: ${links.join("; ")}.` : ""}`,
      ...text.points.map((point) => `  • ${point}`),
    )
  }

  lines.push("", "SKILLS BY LAYER")
  for (const layer of LAYERS) {
    lines.push(`- ${en.layers[layer]}: ${profile.stack[layer].join(", ")}`)
  }
  lines.push(`- Tooling: ${profile.tooling.join(", ")}`)
  lines.push(
    `- Spoken languages: ${en.skills.languages.map((l) => `${l.name} (${l.level})`).join(", ")}`,
  )

  lines.push(
    "",
    "EDUCATION",
    `- ${en.education.degree}, ${en.education.field}, ${en.education.institution}, ${formatPeriod("en", profile.education.period, present)}. ${en.education.note.replace(" ", " ")}.`,
    `- Certification: ${en.education.certification}, ${profile.certifications[0]?.issuer}. ${en.education.certificationNote}.`,
    "",
    "COMMUNITY",
  )
  for (const item of profile.community) {
    const text = en.community[item.id]
    lines.push(
      `- ${text.title}, ${item.organization}, ${formatPeriod("en", item.period, present)}: ${text.summary}`,
    )
  }

  return lines.join("\n")
}
