"use client";

import useSWR from "swr";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CodingActivityChart() {
  const { data, error } = useSWR("/api/github-contributions", fetcher);

  if (error) return <p className="text-red-500">Failed to load contributions</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="w-full h-80 rounded-lg border border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5 p-6 backdrop-blur-sm mx-auto max-w-5xl">
      <h3 className="font-mono text-sm font-semibold text-foreground mb-4">{"<stats.coding />"}</h3>
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
  );
}
