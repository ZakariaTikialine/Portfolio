"use client"

import useSWR from "swr"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTranslations } from "next-intl"
import type { ReactNode } from "react"

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

export default function CodingActivityChart() {
  const t = useTranslations("activity")
  const { data, error } = useSWR("/api/github-contributions", fetcher)

  if (error) return <ActivityShell message={t("error")} />
  if (!data) return <ActivityShell message={t("loading")} />

  return (
    <ActivityShell>
      <div className="h-80">
        <h3 className="mb-4 font-mono text-sm font-semibold text-foreground">{t("title")}</h3>
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
      </div>
    </ActivityShell>
  )
}
