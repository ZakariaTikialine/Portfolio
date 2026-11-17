import { profile, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { ExternalLink } from "@/components/ui/external-link"
import { LayerSignature } from "@/components/ui/layer-signature"
import { Section } from "@/components/ui/section"
import { cn } from "@/lib/cn"
import { formatPeriod } from "@/lib/format"
import { ArrowOutIcon } from "@/components/ui/icons"

interface ExperienceProps {
  locale: Locale
  dict: Dictionary
}

export function Experience({ locale, dict }: ExperienceProps) {
  const { experience: copy, roles, community, layers: layerNames, a11y } = dict

  return (
    <Section id="experience" heading={copy} className="border-t border-rule bg-paper-2">
      <ol className="grid">
        {profile.experience.map((role, index) => {
          const text = roles[role.id]
          const isCurrent = role.period.end === null
          const isLast = index === profile.experience.length - 1
          const url = "url" in role ? role.url : undefined
          return (
            <li
              key={role.id}
              className="reveal relative grid gap-x-12 gap-y-3 pb-14 last:pb-0 md:grid-cols-[13rem_minmax(0,1fr)]"
            >
              <div className="grid content-start gap-2 ps-8 md:ps-0 md:pt-1">
                <p className="label">
                  <time dateTime={role.period.start}>
                    {formatPeriod(locale, role.period, copy.present)}
                  </time>
                </p>
                {isCurrent && (
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-trace/40 bg-trace/10 px-2.5 py-0.5 text-xs font-medium text-ink">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-trace" />
                    {copy.current}
                  </p>
                )}
              </div>

              <div className="relative grid gap-4 ps-8 md:ps-10">
                {/* Timeline rail and node */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "rail-draw absolute start-0 top-2 -bottom-14 w-px bg-linear-to-b from-trace via-rule-strong to-rule-strong md:-bottom-14",
                    isLast && "bottom-0 md:bottom-0",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -start-[5px] top-1.5 size-[11px] rounded-full border-2",
                    isCurrent ? "border-trace bg-trace" : "border-rule-strong bg-paper-2",
                  )}
                />

                <div className="grid gap-1.5">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{text.title}</h3>
                  <p className="text-muted">
                    {url ? (
                      <ExternalLink
                        href={url}
                        newTabLabel={a11y.opensInNewTab}
                        className="font-medium text-ink underline-offset-4 hover:underline"
                      >
                        {role.organization}
                        <ArrowOutIcon className="ms-1 inline-block size-3.5 align-[-0.125em] rtl:-scale-x-100" />
                      </ExternalLink>
                    ) : (
                      <span className="font-medium text-ink">{role.organization}</span>
                    )}
                    <span aria-hidden="true"> · </span>
                    {text.context}
                    <span aria-hidden="true"> · </span>
                    {text.location}
                  </p>
                </div>

                <ul className="grid gap-2 text-[0.9375rem]">
                  {text.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-[2px] bg-trace"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="flex items-center gap-2 text-xs text-muted">
                    <LayerSignature layers={role.layers} className="w-4" />
                    {role.layers.map((layer) => layerNames[layer]).join(" · ")}
                  </span>
                  <ul className="flex flex-wrap gap-1.5">
                    {role.stack.map((tool) => (
                      <li key={tool} className="chip">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-20 grid gap-6">
        <h3 className="label">{copy.communityTitle}</h3>
        <ul className="grid gap-5 md:grid-cols-2">
          {profile.community.map((item) => {
            const text = community[item.id]
            return (
              <li
                key={item.id}
                className="surface reveal grid content-start gap-3 rounded-2xl p-6 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-rule-strong"
              >
                <p className="label">
                  <time dateTime={item.period.start}>
                    {formatPeriod(locale, item.period, copy.present)}
                  </time>
                </p>
                <div className="grid gap-1">
                  <p className="text-lg font-semibold">{text.title}</p>
                  <p className="text-sm text-muted">{item.organization}</p>
                </div>
                <p className="text-sm">{text.summary}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
