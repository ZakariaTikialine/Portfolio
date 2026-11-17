import { cn } from "@/lib/cn"

/** Four stacked bars: the stack layers, interface on top, data at the base. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("grid w-4 gap-[2px]", className)}>
      <span className="h-[3px] rounded-[1px] bg-s1 ring-1 ring-rule" />
      <span className="h-[3px] rounded-[1px] bg-s2" />
      <span className="h-[3px] rounded-[1px] bg-s3" />
      <span className="h-[3px] rounded-[1px] bg-s4" />
    </span>
  )
}
