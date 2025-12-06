"use client"

import dynamic from "next/dynamic"

// Lazy load heavy client components that are not needed for initial render
export const AiTerminal = dynamic(() => import("@/components/ai-terminal"), {
  ssr: false,
})

export const CommandPalette = dynamic(() => import("@/components/command-palette"), {
  ssr: false,
})

export const NeuralBackground = dynamic(() => import("@/components/neural-background"), {
  ssr: false,
})
