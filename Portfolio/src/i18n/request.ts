import {getRequestConfig} from "next-intl/server"
import {defaultLocale, locales} from "../../i18n"

type AppLocale = (typeof locales)[number]

function isSupportedLocale(locale: string | undefined): locale is AppLocale {
  return !!locale && locales.includes(locale as AppLocale)
}

export default getRequestConfig(async ({locale}) => {
  console.log("[next-intl] loading request config for", locale)
  const resolvedLocale = isSupportedLocale(locale) ? locale : defaultLocale
  const messages = (await import(`../../messages/${resolvedLocale}.json`)).default

  return {
    locale: resolvedLocale,
    messages,
  }
})
