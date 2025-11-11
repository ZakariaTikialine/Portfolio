"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", commits: 12, lines: 340 },
  { day: "Tue", commits: 8, lines: 221 },
  { day: "Wed", commits: 15, lines: 421 },
  { day: "Thu", commits: 22, lines: 471 },
  { day: "Fri", commits: 18, lines: 610 },
  { day: "Sat", commits: 10, lines: 280 },
  { day: "Sun", commits: 6, lines: 145 },
]

export default function CodingActivityChart() {
  return (
    <div className="w-full h-80 rounded-lg border border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5 p-6 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="font-mono text-sm font-semibold text-foreground">{"<stats.coding />"}</h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
          <XAxis dataKey="day" stroke="rgba(148, 163, 184, 0.5)" />
          <YAxis stroke="rgba(148, 163, 184, 0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(6, 182, 212, 0.5)",
              borderRadius: "0.5rem",
            }}
            cursor={{ fill: "rgba(6, 182, 212, 0.1)" }}
          />
          <Bar dataKey="commits" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          <Bar dataKey="lines" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
