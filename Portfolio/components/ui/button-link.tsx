import type { AnchorHTMLAttributes } from "react"
import { cn } from "@/lib/cn"

type Variant = "primary" | "secondary" | "ghost"

const variants: Record<Variant, string> = {
  primary: "bg-s4 text-on-s4 border-s4 hover:brightness-110",
  secondary: "bg-card text-ink border-rule hover:border-ink/40",
  ghost: "border-transparent text-muted hover:text-ink",
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
}

/** A link styled as a button. Navigation stays a real <a>, so it works without JavaScript. */
export function ButtonLink({ variant = "secondary", className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-[filter,border-color,color] duration-150",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
