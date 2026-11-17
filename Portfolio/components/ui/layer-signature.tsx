import { LAYERS, type Layer } from "@/content/types"
import { cn } from "@/lib/cn"

export const layerFill: Record<Layer, string> = {
  interface: "bg-s1 ring-1 ring-s3/60 ring-inset",
  api: "bg-s2",
  model: "bg-s3",
  data: "bg-s4",
}

/** Four-cell mark showing which stack layers a project touches, top to bottom. */
export function LayerSignature({
  layers,
  className,
}: {
  layers: readonly Layer[]
  className?: string
}) {
  return (
    <span aria-hidden="true" className={cn("grid w-3.5 shrink-0 gap-px", className)}>
      {LAYERS.map((layer) => (
        <span
          key={layer}
          className={cn(
            "h-[3px] rounded-[1px]",
            layers.includes(layer) ? layerFill[layer] : "bg-rule",
          )}
        />
      ))}
    </span>
  )
}
