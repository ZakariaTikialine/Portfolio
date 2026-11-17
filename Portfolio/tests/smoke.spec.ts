import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

const LOCALES = [
  { locale: "en", dir: "ltr" },
  { locale: "fr", dir: "ltr" },
  { locale: "ar", dir: "rtl" },
] as const

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]

async function axeViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
  return results.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.help}`)
}

for (const { locale, dir } of LOCALES) {
  test.describe(`/${locale}`, () => {
    test("renders with the right language, direction and no runtime errors", async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (error) => errors.push(error.message))
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text())
      })

      const response = await page.goto(`/${locale}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator("html")).toHaveAttribute("lang", locale)
      await expect(page.locator("html")).toHaveAttribute("dir", dir)
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
      expect(errors).toEqual([])
    })

    test("passes WCAG 2.2 AA checks in light theme", async ({ page }) => {
      await page.emulateMedia({ colorScheme: "light" })
      await page.goto(`/${locale}`)
      expect(await axeViolations(page)).toEqual([])
    })

    test("passes WCAG 2.2 AA checks in dark theme", async ({ page }) => {
      await page.emulateMedia({ colorScheme: "dark" })
      await page.goto(`/${locale}`)
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
      expect(await axeViolations(page)).toEqual([])
    })
  })
}

test.describe("routing", () => {
  test("the root redirects to a locale", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveURL(/\/(en|fr|ar)$/)
  })

  test("pages from the old site redirect to their section", async ({ request }) => {
    const response = await request.get("/en/projects", { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers()["location"]).toBe("/en#work")
  })

  test("/cv points to the PDF", async ({ request }) => {
    const response = await request.get("/cv", { maxRedirects: 0 })
    expect(response.status()).toBe(307)
    expect(response.headers()["location"]).toBe("/ZakariaTikialineCV.pdf")
  })

  test("an unknown locale returns 404", async ({ request }) => {
    const response = await request.get("/de")
    expect(response.status()).toBe(404)
  })
})
