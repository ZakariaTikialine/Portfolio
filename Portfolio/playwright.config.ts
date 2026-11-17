import { defineConfig, devices } from "@playwright/test"

const PORT = 3100
const isCI = Boolean(process.env.CI)

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `pnpm start --port ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
    // Deterministic assistant answers from site content; the live model is checked separately.
    env: { ASSISTANT_OFFLINE: "1" },
  },
})
