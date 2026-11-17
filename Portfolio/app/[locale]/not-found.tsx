import { getLocale } from "next-intl/server"
import { getDictionary } from "@/content"
import { routing, type Locale } from "@/i18n/routing"
import { ArrowBackIcon } from "@/components/ui/icons"

export default async function LocaleNotFound() {
  const requested = await getLocale()
  const locale = (routing.locales as readonly string[]).includes(requested)
    ? (requested as Locale)
    : routing.defaultLocale
  const { notFound: copy } = getDictionary(locale)

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="blueprint absolute inset-0 -z-10" />
      <div className="container-page grid min-h-[60svh] content-center gap-6 py-24">
        <p className="label flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-trace" />
          404
        </p>
        <h1 className="text-section font-semibold font-stretch-[85%]">{copy.title}</h1>
        <p className="max-w-md text-lg text-muted">{copy.body}</p>
        <a
          href={`/${locale}`}
          className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-on-primary transition-[filter] hover:brightness-110"
        >
          <ArrowBackIcon className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          {copy.home}
        </a>
      </div>
    </section>
  )
}
