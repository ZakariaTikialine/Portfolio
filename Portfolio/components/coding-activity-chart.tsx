"use client"

import { memo, Suspense, lazy } from "react"
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

function ActivityShell({ children, message }: { children?: ReactNode; message?: string }) {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-3xl border border-border/40 bg-linear-to-br from-accent/5 to-secondary/5 p-6 backdrop-blur-sm">
      {children ?? (
        <div className="flex h-72 w-full items-center justify-center text-sm text-muted-foreground">
          {message}
        </div>
      )}
    </div>
  )
}

function CodingActivityChart() {
  const t = useTranslations("activity")
  const { data, error } = useSWR("/api/github-contributions", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Dedupe requests within 1 minute
  })

  if (error) return <ActivityShell message={t("error")} />
  if (!data) return <ActivityShell message={t("loading")} />

  return (
    <ActivityShell>
      <div className="h-80">
        <h3 className="mb-4 font-mono text-sm font-semibold text-foreground">{t("title")}</h3>
        <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">{t("loading")}</div>}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
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