import React from "react"
import { cn } from "@/shared/lib/utils"

export const GRID_LAYOUTS = [
  "1",
  "2",
  "2:swap",
  "2:2-1-1",
  "2:1-1-2",
  "2:1-1-2:swap",
] as const

export type GridLayout = (typeof GRID_LAYOUTS)[number]

interface GridProps {
  layout?: GridLayout
  children: React.ReactNode
  className?: string
}

const layoutConfig: Record<GridLayout, { container: string; spans: string[] }> =
  {
    "1": { container: "grid-cols-1", spans: [] },
    "2": { container: "grid-cols-2", spans: [] },
    "2:swap": { container: "grid-cols-2", spans: ["", "order-last"] },
    "2:2-1-1": {
      container: "grid-cols-2",
      spans: ["col-span-2", "col-span-1", "col-span-1"],
    },
    "2:1-1-2": {
      container: "grid-cols-2",
      spans: ["col-span-1", "col-span-1", "col-span-2"],
    },
    "2:1-1-2:swap": {
      container: "grid-cols-2",
      spans: ["col-span-1", "col-span-2 order-last", "col-span-1"],
    },
  }

export default function Grid({ layout = "1", children, className }: GridProps) {
  const config = layoutConfig[layout]

  return (
    <div className={cn("@container", className)}>
      <div
        className={cn(
          "grid grid-cols-1 gap-4 max-lg:grid-cols-1",
          `${config.container}`,
        )}
      >
        {React.Children.map(children, (child, i) => (
          <div
            className={cn(
              "max-lg:col-span-1",
              config.spans[i] && `${config.spans[i]}`,
            )}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
