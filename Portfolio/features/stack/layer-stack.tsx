"use client"

import { useEffect, useState, type FocusEvent, type PointerEvent } from "react"
import { LAYERS, type Layer } from "@/content/types"
import { LayerSignature } from "@/components/ui/layer-signature"
import { cn } from "@/lib/cn"
import type { StackProjectView, StackView } from "./build-stack"

const bandTone: Record<Layer, string> = {
  interface: "bg-s1 text-ink",
  api: "bg-s2 text-ink",
  model: "bg-s3 text-ink",
  data: "bg-s4 text-on-s4",
}

type TracePart = "none" | "start" | "mid" | "end"

/** Each band draws its own piece of the trace, so no layout measuring is needed. */
const traceSegment: Record<Exclude<TracePart, "none">, string> = {
  start: "top-1/2 -bottom-[3px]",
  mid: "-top-[3px] -bottom-[3px]",
  end: "-top-[3px] bottom-1/2",
}

/** Hover and focus only count for mouse and keyboard, so a tap on a phone doesn't stick. */
const isMouse = (event: PointerEvent) => event.pointerType === "mouse"
const isKeyboardFocus = (event: FocusEvent<HTMLElement>) =>
  event.currentTarget.matches(":focus-visible")

export function LayerStack({ layers, projects, labels }: StackView) {
  const [hoverLayer, setHoverLayer] = useState<Layer | null>(null)
  const [pinnedLayer, setPinnedLayer] = useState<Layer | null>(null)
  const [hoverProject, setHoverProject] = useState<string | null>(null)

  useEffect(() => {
    if (!pinnedLayer) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinnedLayer(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [pinnedLayer])

  const activeLayer = hoverLayer ?? pinnedLayer
  const tracedProject = projects.find((project) => project.slug === hoverProject)
  const lit = new Set<Layer>(
    tracedProject ? tracedProject.layers : activeLayer ? [activeLayer] : [],
  )
  const active = layers.find((layer) => layer.id === activeLayer)
  /** A chip is dimmed, never removed, so the card keeps its height while exploring. */
  const isDimmed = (project: StackProjectView) =>
    tracedProject
      ? project.slug !== tracedProject.slug
      : activeLayer !== null && !project.layers.includes(activeLayer)

  const litIndexes = LAYERS.flatMap((layer, index) => (lit.has(layer) ? [index] : []))
  const first = litIndexes[0] ?? -1
  const last = litIndexes[litIndexes.length - 1] ?? -1
  const tracePart = (index: number): TracePart => {
    if (litIndexes.length < 2 || index < first || index > last) return "none"
    if (index === first) return "start"
    if (index === last) return "end"
    return "mid"
  }

  return (
    <div className="rounded-2xl border border-rule bg-card p-3 shadow-[0_32px_64px_-40px_rgb(14_18_34/0.45)] sm:p-4">
      <p className="label px-1 pt-1 pb-3">{labels.title}</p>

      <ul className="grid gap-1.5">
        {layers.map((layer, index) => {
          const part = tracePart(index)
          const isLit = lit.has(layer.id)
          return (
            <li key={layer.id}>
              <button
                type="button"
                aria-pressed={pinnedLayer === layer.id}
                onPointerEnter={(event) => isMouse(event) && setHoverLayer(layer.id)}
                onPointerLeave={(event) => isMouse(event) && setHoverLayer(null)}
                onFocus={(event) => isKeyboardFocus(event) && setHoverLayer(layer.id)}
                onBlur={() => setHoverLayer(null)}
                onClick={() =>
                  setPinnedLayer((current) => (current === layer.id ? null : layer.id))
                }
                style={{ animationDelay: `${(layers.length - 1 - index) * 70}ms` }}
                className={cn(
                  "relative grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 rounded-lg py-3.5 ps-4 pe-12 text-start transition-opacity duration-200 motion-safe:animate-settle sm:grid-cols-[6.5rem_1fr_auto]",
                  bandTone[layer.id],
                  lit.size > 0 && !isLit && "opacity-35",
                )}
              >
                <span className="band-name flex items-baseline gap-2">
                  <span className="font-mono font-normal tabular-nums">0{index + 1}</span>
                  {layer.name}
                </span>
                <span className="text-xs whitespace-nowrap sm:order-last">{layer.count}</span>
                <span
                  dir="ltr"
                  className="col-span-2 text-[0.8125rem] leading-snug sm:col-span-1 rtl:text-right"
                >
                  {layer.tools.join(" · ")}
                </span>

                {part !== "none" && (
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-e-5 w-px bg-trace", traceSegment[part])}
                  />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-e-4 top-1/2 size-2.25 -translate-y-1/2 rounded-full bg-trace transition-opacity duration-200",
                    isLit ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-3 border-t border-rule px-1 pt-3.5" aria-live="polite">
        <p className="text-sm text-muted">
          {active ? (
            <>
              <span className="font-medium text-ink">{active.name}</span>
              {" · "}
              {active.count}
            </>
          ) : (
            labels.hint
          )}
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                href={`#project-${project.slug}`}
                onPointerEnter={(event) => isMouse(event) && setHoverProject(project.slug)}
                onPointerLeave={(event) => isMouse(event) && setHoverProject(null)}
                onFocus={(event) => isKeyboardFocus(event) && setHoverProject(project.slug)}
                onBlur={() => setHoverProject(null)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border border-rule bg-paper px-2.5 py-1.5 text-sm transition-[opacity,border-color] duration-200 hover:border-ink/40",
                  isDimmed(project) && "opacity-35",
                )}
              >
                <LayerSignature layers={project.layers} />
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
