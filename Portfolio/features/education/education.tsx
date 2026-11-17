import { profile, type Dictionary } from "@/content"
import type { Locale } from "@/i18n/routing"
import { ExternalLink } from "@/components/ui/external-link"
import { Section } from "@/components/ui/section"
import { formatPeriod } from "@/lib/format"
import { ArrowOutIcon, EducationIcon, SealIcon } from "@/components/ui/icons"

interface EducationProps {
  locale: Locale
  dict: Dictionary
}

export function Education({ locale, dict }: EducationProps) {
  const { education: copy, experience, a11y } = dict
  const { education, certifications } = profile
  const certification = certifications[0]

  return (
    <Section id="education" heading={copy} className="border-t border-rule bg-paper-2">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="surface reveal grid content-start gap-6 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-11 place-items-center rounded-xl bg-s4 text-on-s4">
              <EducationIcon className="size-5" aria-hidden="true" />
            </span>
            <p className="label">
              <time dateTime={education.period.start}>
                {formatPeriod(locale, education.period, experience.present)}
              </time>
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-2xl font-semibold tracking-tight">{copy.degree}</h3>
            <p className="text-lg text-accent">{copy.field}</p>
          </div>
          <div className="grid gap-1.5 text-muted">
            <ExternalLink
              href={education.url}
              newTabLabel={a11y.opensInNewTab}
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              {copy.institution}
              <ArrowOutIcon className="ms-1 inline-block size-3.5 align-[-0.125em] rtl:-scale-x-100" />
            </ExternalLink>
            <p className="text-sm">{copy.note}</p>
          </div>
        </article>

        {certification && (
          <article className="surface reveal grid content-start gap-6 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-11 place-items-center rounded-xl border border-trace/40 bg-trace/10 text-trace">
                <SealIcon className="size-5" aria-hidden="true" />
              </span>
              <p className="label">{copy.certificationLabel}</p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-2xl font-semibold tracking-tight">{copy.certification}</h3>
              <p className="text-lg text-muted">{certification.issuer}</p>
            </div>
            <div className="grid gap-3">
              <p className="text-sm text-muted">{copy.certificationNote}</p>
              <ExternalLink
                href={certification.evidence}
                newTabLabel={a11y.opensInNewTab}
                className="inline-flex min-h-10 w-fit items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                {copy.evidence}
                <ArrowOutIcon className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </ExternalLink>
            </div>
          </article>
        )}
      </div>
    </Section>
  )
}
