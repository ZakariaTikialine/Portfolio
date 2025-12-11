"use client"

import { memo, Suspense, lazy, useMemo } from "react"
import useSWR from "swr"
import { useTranslations } from "next-intl"
import type { ReactNode } from "react"

// Lazy load heavy recharts components
const BarChart = lazy(() => import("recharts").then(mod => ({ default: mod.BarChart })))
const Bar = lazy(() => import("recharts").then(mod => ({ default: mod.Bar })))
const XAxis = lazy(() => import("recharts").then(mod => ({ default: mod.XAxis })))
const YAxis = lazy(() => import("recharts").then(mod => ({ default: mod.YAxis })))
const CartesianGrid = lazy(() => import("recharts").then(mod => ({ default: mod.CartesianGrid })))
const Tooltip = lazy(() => import("recharts").then(mod => ({ default: mod.Tooltip })))
const ResponsiveContainer = lazy(() => import("recharts").then(mod => ({ default: mod.ResponsiveContainer })))

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const buildPlaceholderSeries = () => {
  const now = new Date()
  return Array.from({ length: 7 }, (_, idx) => {
    const day = new Date()
    day.setDate(now.getDate() - 6 + idx)
    const seed = day.getDate() + day.getMonth() * 31
    const commits = 2 + (seed % 5)
    const lines = 40 + (seed * 11) % 80
    return {
      date: day.toLocaleDateString("en-US", { weekday: "short" }),
      commits,
      lines,
    }
  })
}

function ActivityShell({ children, message }: { children?: ReactNode; message?: string }) {
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 w-auto max-w-5xl rounded-2xl sm:rounded-3xl border border-border/40 bg-linear-to-br from-accent/5 to-secondary/5 p-4 sm:p-6 backdrop-blur-sm">
      {children ?? (
        <div className="flex h-60 sm:h-72 w-full items-center justify-center text-xs sm:text-sm text-muted-foreground">
          {message}
        </div>
      )}
    </div>
  )
}

function CodingActivityChart() {
  const t = useTranslations("activity")
  const fallbackSeries = useMemo(() => buildPlaceholderSeries(), [])
  const { data, error } = useSWR("/api/github-contributions", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Dedupe requests within 1 minute
    fallbackData: fallbackSeries,
  })

  // If the API fails, keep rendering with the placeholder data instead of an error state
  const chartData = Array.isArray(data) ? data : fallbackSeries
  const showErrorBanner = Boolean(error)

  return (
    <ActivityShell>
      <div className="h-64 sm:h-80 min-h-64 sm:min-h-80 min-w-[240px] sm:min-w-[260px]">
        <h3 className="mb-3 sm:mb-4 font-mono text-xs sm:text-sm font-semibold text-foreground">{t("title")}</h3>
        {showErrorBanner && (
          <p className="mb-2 text-xs text-destructive/80">{t("error")}</p>
        )}
        <Suspense fallback={<div className="flex h-full items-center justify-center text-xs sm:text-sm text-muted-foreground">{t("loading")}</div>}>
          <ResponsiveContainer width="100%" height="100%" minHeight={240} minWidth={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.1)" />
              <XAxis dataKey="date" stroke="rgba(148,163,184,0.5)" />
              <YAxis stroke="rgba(148,163,184,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.8)",
                  border: "1px solid rgba(6,182,212,0.5)",
                  borderRadius: "0.5rem",
                }}
                cursor={{ fill: "rgba(6,182,212,0.1)" }}
              />
              <Bar dataKey="commits" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lines" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Suspense>
      </div>
    </ActivityShell>
  )
}

export default memo(CodingActivityChart)