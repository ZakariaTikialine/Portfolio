import { LAYERS, profile, type Dictionary, type Layer } from "@/content"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/cn"

const stripe: Record<Layer, string> = {
  interface: "bg-s1 ring-1 ring-inset ring-rule-strong",
  api: "bg-s2",
  model: "bg-s3",
  data: "bg-s4",
}

/** The full stack as a cross-section: one row per layer, every tool from the CV. */
export function Skills({ dict }: { dict: Dictionary }) {
  const { skills: copy, layers: layerNames } = dict

  return (
    <Section id="skills" heading={copy} className="border-t border-rule">
      <div className="surface reveal overflow-hidden rounded-2xl">
        <ul>
          {LAYERS.map((layer, index) => (
            <li
              key={layer}
              className="group/row grid gap-4 border-b border-rule p-5 transition-colors duration-200 last:border-b-0 hover:bg-card-2 sm:p-6 md:grid-cols-[14rem_minmax(0,1fr)] md:items-center md:gap-8"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-10 w-1.5 rounded-full transition-[height] duration-300 group-hover/row:h-12",
                    stripe[layer],
                  )}
                />
                <span className="band-name flex items-baseline gap-2 text-ink">
                  <span className="font-mono font-normal text-muted tabular-nums">
                    0{index + 1}
                  </span>
                  {layerNames[layer]}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {profile.stack[layer].map((tool) => (
                  <li
                    key={tool}
                    className="rounded-lg border border-rule bg-paper-2 px-3 py-1.5 text-sm"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 md:items-start">
        <div className="surface reveal grid content-start gap-4 rounded-2xl p-6">
          <h3 className="label">{copy.tooling}</h3>
          <ul className="flex flex-wrap gap-2">
            {profile.tooling.map((tool) => (
              <li
                key={tool}
                className="rounded-lg border border-rule bg-paper-2 px-3 py-1.5 text-sm"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface reveal grid content-start gap-4 rounded-2xl p-6">
          <h3 className="label">{copy.spokenLanguages}</h3>
          <dl className="grid gap-2.5">
            {copy.languages.map((language) => (
              <div key={language.name} className="flex items-baseline justify-between gap-4">
                <dt className="font-medium">{language.name}</dt>
                <dd className="text-sm text-muted">{language.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
