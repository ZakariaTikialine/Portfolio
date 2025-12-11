import { NextResponse } from "next/server"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_SLUG = process.env.GITHUB_REPO ?? process.env.NEXT_PUBLIC_GITHUB_REPO ?? "ZakariaTikialine/Portfolio"

export async function GET() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  }

  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_SLUG}/commits?per_page=1`, {
      headers,
      // cache for 10 minutes to avoid hitting rate limits on client refreshes
      next: { revalidate: 600 },
    })

    if (!response.ok) {
      throw new Error(`GitHub response ${response.status}`)
    }

    const commits = (await response.json()) as any[]
    const lastCommitDate = commits?.[0]?.commit?.author?.date

    if (!lastCommitDate) {
      throw new Error("No commit date returned")
    }

    return NextResponse.json({
      source: "github",
      repo: REPO_SLUG,
      lastUpdated: lastCommitDate,
    })
  } catch (error) {
    console.error("Failed to fetch build info", error)
    // Fall back to build time so the UI still shows a value
    return NextResponse.json({
      source: "fallback",
      repo: REPO_SLUG,
      lastUpdated: new Date().toISOString(),
    })
  }
}
