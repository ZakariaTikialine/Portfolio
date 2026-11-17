import { profile, type Dictionary } from "@/content"
import { ExternalLink } from "@/components/ui/external-link"
import { Section } from "@/components/ui/section"
import { ProjectCard } from "./project-card"
import { ArrowOutIcon } from "@/components/ui/icons"

export function Work({ dict }: { dict: Dictionary }) {
  const featured = profile.projects.filter((project) => project.featured)
  const wide = featured.filter((project) => "image" in project)
  const rest = featured.filter((project) => !("image" in project))
  const others = profile.projects.filter((project) => !project.featured)

  return (
    <Section
      id="work"
      heading={dict.work}
      aside={
        <ExternalLink
          href={profile.links.github}
          newTabLabel={dict.a11y.opensInNewTab}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          {dict.work.moreOnGitHub}
          <ArrowOutIcon className="size-4 rtl:-scale-x-100" aria-hidden="true" />
        </ExternalLink>
      }
    >
      <div className="grid gap-5">
        {wide.map((project) => (
          <ProjectCard
            key={project.slug}
            facts={project}
            text={dict.projects[project.slug]}
            dict={dict}
            variant="wide"
          />
        ))}
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard
              key={project.slug}
              facts={project}
              text={dict.projects[project.slug]}
              dict={dict}
            />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-6 grid gap-4">
            <p className="label">{dict.work.alsoBuilt}</p>
            <div className={others.length > 1 ? "grid gap-5 md:grid-cols-2" : "grid"}>
              {others.map((project) => (
                <ProjectCard
                  key={project.slug}
                  facts={project}
                  text={dict.projects[project.slug]}
                  dict={dict}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
