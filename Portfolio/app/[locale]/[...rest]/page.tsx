import { notFound } from "next/navigation"

/** Any unknown path inside a locale renders that locale's not-found page, with header and footer. */
export const dynamicParams = true

export default function CatchAll() {
  notFound()
}
