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
    // API security tests run once, on desktop: they exercise rate limits and server state.
    { name: "mobile", use: { ...devices["Pixel 7"] }, testIgnore: /ai-chat-security/ },
  ],
  webServer: {
    command: `pnpm start --port ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
    // Deterministic assistant answers from site content; the live model is checked separately.
    // Locally every client shares one "untrusted" IP bucket, so only that limit is raised for
    // tests; session limits and the daily budget keep their production values.
    env: {
      ASSISTANT_OFFLINE: "1",
      ASSISTANT_IP_PER_MINUTE: "1000",
      ASSISTANT_IP_PER_DAY: "100000",
    },
  },
})
