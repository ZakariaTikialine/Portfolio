import Image from "next/image"
import type { Dictionary, Layer, ProjectFacts, ProjectText } from "@/content/types"
import { ExternalLink } from "@/components/ui/external-link"
import { ArrowOutIcon, GitHubIcon } from "@/components/ui/icons"
import { LayerSignature } from "@/components/ui/layer-signature"
import { cn } from "@/lib/cn"

interface ProjectCardProps {
  facts: ProjectFacts
  text: ProjectText
  dict: Dictionary
  variant?: "wide" | "default" | "compact"
}

export function ProjectCard({ facts, text, dict, variant = "default" }: ProjectCardProps) {
  const { work, layers: layerNames, a11y } = dict
  const layerList = facts.layers.map((layer: Layer) => layerNames[layer]).join(" · ")
  const hasImage = variant === "wide" && facts.image

  return (
    <article
      id={`project-${facts.slug}`}
      className={cn(
        "surface group reveal scroll-mt-28 overflow-hidden rounded-2xl transition-[translate,border-color] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1 hover:border-rule-strong",
        hasImage && "grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
      )}
    >
      <div className={cn("grid content-start gap-5 p-6 sm:p-8", variant === "compact" && "gap-4")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="label">{text.role}</p>
          <p className="flex items-center gap-2 text-xs text-muted">
            <LayerSignature layers={facts.layers} className="w-4" />
            <span className="sr-only">{work.layersLabel}: </span>
            {layerList}
          </p>
        </div>

        <div className="grid gap-3">
          <h3 className="text-2xl font-semibold tracking-tight font-stretch-[90%] sm:text-[1.75rem]">
            {text.title}
          </h3>
          <p className="text-muted">{text.summary}</p>
        </div>

        {variant !== "compact" && (
          <ul className="grid gap-2 text-sm">
            {text.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] size-1.5 shrink-0 rounded-[2px] bg-trace"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="flex flex-wrap gap-1.5">
          {facts.stack.map((tool) => (
            <li key={tool} className="chip">
              {tool}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm font-medium">
          {facts.live && (
            <ExternalLink
              href={facts.live.url}
              newTabLabel={a11y.opensInNewTab}
              className="inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-80"
            >
              {work.live[facts.live.kind]}
              <ArrowOutIcon className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </ExternalLink>
          )}
          {facts.repos.map((repo) => (
            <ExternalLink
              key={repo.url}
              href={repo.url}
              newTabLabel={a11y.opensInNewTab}
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
            >
              <GitHubIcon className="size-3.5" />
              {work.repoKinds[repo.kind]}
            </ExternalLink>
          ))}
        </div>
      </div>

      {hasImage && facts.image && (
        <div className="relative flex items-center overflow-hidden border-t border-rule bg-paper-2 p-6 sm:p-8 lg:border-s lg:border-t-0">
          {/* Faint grid behind the screenshot, echoing the hero. */}
          <div aria-hidden="true" className="blueprint absolute inset-0" />
          <div className="relative w-full overflow-hidden rounded-xl border border-rule-strong shadow-lift transition-[translate,rotate] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-1 group-hover:rotate-[-0.4deg]">
            {/* Window chrome: a thin bar so the screenshot reads as a running product. */}
            <div
              aria-hidden="true"
              className="flex h-6 items-center gap-1.5 border-b border-rule-strong bg-card px-3"
            >
              <span className="size-1.5 rounded-full bg-rule-strong" />
              <span className="size-1.5 rounded-full bg-rule-strong" />
              <span className="size-1.5 rounded-full bg-trace" />
            </div>
            <Image
              src={facts.image}
              alt={text.imageAlt ?? text.title}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      )}
    </article>
  )
}
