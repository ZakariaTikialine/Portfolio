import createMiddleware from "next-intl/middleware"
import {defaultLocale, localePrefix, locales} from "./navigation"

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
})

export const config = {
  matcher: ["/", "/(en|fr|ar)/:path*"],
}
