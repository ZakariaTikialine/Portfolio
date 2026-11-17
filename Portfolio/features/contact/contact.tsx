import { profile, type Dictionary } from "@/content"
import { ExternalLink } from "@/components/ui/external-link"
import {
  ArrowOutIcon,
  DocumentIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/ui/icons"
import { Section } from "@/components/ui/section"
import { ContactForm } from "./contact-form"
import { CopyEmail } from "./copy-email"

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact: copy, hero, a11y } = dict
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

  const elsewhere = [
    { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedInIcon },
    { href: profile.links.github, label: "GitHub", icon: GitHubIcon },
  ]

  return (
    <Section id="contact" heading={copy} className="border-t border-rule">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="grid content-start gap-5">
          <div className="surface reveal grid gap-4 rounded-2xl p-6 sm:p-8">
            <p className="label flex items-center gap-2">
              <MailIcon className="size-3.5" aria-hidden="true" />
              {copy.emailLabel}
            </p>
            <a
              href={`mailto:${profile.email}`}
              dir="ltr"
              className="w-fit text-xl font-semibold tracking-tight break-all text-ink underline-offset-4 hover:underline sm:text-2xl"
            >
              {profile.email}
            </a>
            <div>
              <CopyEmail email={profile.email} copyLabel={copy.copy} copiedLabel={copy.copied} />
            </div>
          </div>

          <div className="surface reveal grid gap-1 rounded-2xl p-3">
            <p className="label px-3 pt-2 pb-1">{copy.elsewhere}</p>
            {elsewhere.map(({ href, label, icon: Icon }) => (
              <ExternalLink
                key={href}
                href={href}
                newTabLabel={a11y.opensInNewTab}
                className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-paper-2"
              >
                <span className="flex items-center gap-3 font-medium">
                  <Icon className="size-4 text-muted" />
                  {label}
                </span>
                <ArrowOutIcon className="size-4 text-muted rtl:-scale-x-100" aria-hidden="true" />
              </ExternalLink>
            ))}
            <a
              href={profile.links.cv}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-paper-2"
            >
              <span className="flex items-center gap-3 font-medium">
                <DocumentIcon className="size-4 text-muted" aria-hidden="true" />
                {hero.ctaCv}
              </span>
              <span className="label">PDF</span>
            </a>
          </div>
        </div>

        {accessKey ? (
          <div className="surface reveal grid content-start gap-6 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight">{copy.form.title}</h3>
            <ContactForm accessKey={accessKey} labels={copy.form} />
          </div>
        ) : null}
      </div>
    </Section>
  )
}
