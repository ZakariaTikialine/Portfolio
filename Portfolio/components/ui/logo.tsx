import { cn } from "@/lib/cn"

/**
 * The `<Zakaria />` wordmark carried over from the previous site, redrawn for the new system:
 * brackets in the accent blue, the slash in trace amber. Always Latin and left-to-right.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      dir="ltr"
      className={cn(
        "inline-flex items-baseline font-mono text-sm font-medium tracking-tight",
        className,
      )}
    >
      <span className="text-accent">&lt;</span>
      <span className="text-ink">Zakaria</span>
      <span className="ms-[0.35em] text-trace">/</span>
      <span className="text-accent">&gt;</span>
    </span>
  )
}
