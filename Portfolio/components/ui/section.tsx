import type { ReactNode } from "react"
import type { SectionHeading, SectionId } from "@/content/types"
import { cn } from "@/lib/cn"

interface SectionProps {
  id: SectionId
  heading: SectionHeading
  children: ReactNode
  className?: string
  /** Optional element rendered at the end of the heading row (a link, a count). */
  aside?: ReactNode
}

/** A page section: anchor target, eyebrow, heading, optional intro, then content. */
export function Section({ id, heading, children, className, aside }: SectionProps) {
  const titleId = `${id}-title`
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("scroll-mt-20 py-20 md:py-28", className)}
    >
      <div className="container-page">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 md:mb-16">
          <div className="reveal grid max-w-2xl gap-4">
            <p className="label flex items-center gap-3">
              <span aria-hidden="true" className="eyebrow-line h-px w-8 bg-trace" />
              {heading.eyebrow}
            </p>
            <h2
              id={titleId}
              className="text-section font-semibold font-stretch-[85%] in-[:lang(ar)]:text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] in-[:lang(ar)]:leading-tight"
            >
              {heading.title}
            </h2>
            {heading.intro ? <p className="text-lg text-muted">{heading.intro}</p> : null}
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  )
}
