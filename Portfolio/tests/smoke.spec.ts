import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

const LOCALES = [
  { locale: "en", dir: "ltr" },
  { locale: "fr", dir: "ltr" },
  { locale: "ar", dir: "rtl" },
] as const

const SECTIONS = ["work", "experience", "skills", "education", "contact"]
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]

/** Contrast is judged at rest: with reduced motion nothing is mid-fade when axe measures it. */
async function axeViolations(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" })
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
  return results.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.help}`)
}

/** next-themes reads this key before first paint; navy (dark) is the default. */
async function useLightTheme(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem("theme", "light"))
}

for (const { locale, dir } of LOCALES) {
  test.describe(`/${locale}`, () => {
    test("renders every section with the right language and direction", async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (error) => errors.push(error.message))
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text())
      })

      const response = await page.goto(`/${locale}`)
      expect(response?.status()).toBe(200)
      await expect(page.locator("html")).toHaveAttribute("lang", locale)
      await expect(page.locator("html")).toHaveAttribute("dir", dir)
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark")
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
      for (const id of SECTIONS) {
        await expect(page.locator(`#${id} h2`)).toBeVisible()
      }
      expect(errors).toEqual([])
    })

    test("passes WCAG 2.2 AA checks in the navy theme", async ({ page }) => {
      await page.goto(`/${locale}`)
      expect(await axeViolations(page)).toEqual([])
    })

    test("passes WCAG 2.2 AA checks in the light theme", async ({ page }) => {
      await useLightTheme(page)
      await page.goto(`/${locale}`)
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light")
      expect(await axeViolations(page)).toEqual([])
    })
  })
}

test.describe("interaction", () => {
  test("tapping a stack layer pins it", async ({ page }) => {
    await page.goto("/en")
    const band = page.getByRole("button", { name: /API/ })
    await band.click()
    await expect(band).toHaveAttribute("aria-pressed", "true")
    await band.click()
    await expect(band).toHaveAttribute("aria-pressed", "false")
  })

  test("switching language keeps the current section", async ({ page }) => {
    await page.goto("/en")
    await page
      .locator("#skills")
      .evaluate((section) => section.scrollIntoView({ behavior: "instant" }))
    await expect(page.locator("html")).toHaveAttribute("data-section", /.+/)

    // Whatever section is in view at the moment of the click must be the one the new page opens on.
    const link = page
      .getByRole("navigation", { name: "Language" })
      .getByRole("link", { name: "Français" })
    const sectionAtClick = await link.evaluate((element) => {
      const section = document.documentElement.getAttribute("data-section")
      ;(element as HTMLAnchorElement).click()
      return section
    })
    expect(sectionAtClick).toBeTruthy()
    await expect(page).toHaveURL(new RegExp(`/fr#${sectionAtClick}$`))
    await expect(page.locator("html")).toHaveAttribute("lang", "fr")
  })
})

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

  test("an unknown page inside a locale shows the localized 404", async ({ page }) => {
    const response = await page.goto("/fr/nexiste-pas")
    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cette page n'existe pas")
    await expect(page.locator("header")).toBeVisible()
  })

  test("an unknown locale returns 404", async ({ request }) => {
    const response = await request.get("/de")
    expect(response.status()).toBe(404)
  })
})

test.describe("security", () => {
  test("pages send security headers", async ({ request }) => {
    const response = await request.get("/en")
    const headers = response.headers()
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'")
    expect(headers["content-security-policy"]).toContain("object-src 'none'")
    expect(headers["x-content-type-options"]).toBe("nosniff")
    expect(headers["x-frame-options"]).toBe("DENY")
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin")
  })
})

test.describe("seo", () => {
  test("sitemap, robots and preview image are served", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml")
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain("/fr")

    const robots = await request.get("/robots.txt")
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain("Sitemap:")

    const image = await request.get("/en/opengraph-image")
    expect(image.status()).toBe(200)
    expect(image.headers()["content-type"]).toContain("image/png")
  })

  test("the page carries structured data and language alternates", async ({ page }) => {
    await page.goto("/en")
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
    expect(JSON.parse(jsonLd ?? "{}")["@type"]).toBe("Person")
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(1)
  })
})

test.describe("assistant", () => {
  test("the API answers from site content", async ({ request }) => {
    const response = await request.post("/api/ai-chat", {
      data: { locale: "en", message: "Where does he work now?" },
    })
    expect(response.status()).toBe(200)
    expect(response.headers()["x-assistant-source"]).toBe("offline")
    expect(await response.text()).toContain("Egor Gaming")
  })

  test("a suggested question opens a streamed answer", async ({ page }) => {
    await page.goto("/en")
    await page.getByRole("button", { name: "Ask my assistant" }).first().click()
    const dialog = page.getByRole("dialog", { name: "Ask about Zakaria" })
    await expect(dialog).toBeVisible()
    await dialog.getByRole("button", { name: "What does he do at Egor Gaming?" }).click()
    await expect(dialog.getByRole("log")).toContainText("Front-End Developer at Egor Gaming")
    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
  })
})
