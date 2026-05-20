import GridPattern from "@/shared/components/ui/grid-pattern"

interface DemoGridBackgroundProps {
  width?: number
  height?: number
  children: React.ReactNode
}

export default function DemoGridBackground({
  width = 20,
  height = 20,
  children,
}: DemoGridBackgroundProps) {
  return (
    <div
      className="
        relative overflow-hidden
        [background-image:var(--card-gradient)] bg-size-[800%_800%] animate-gradient-move
        rounded-2xl p-6 min-h-60 flex flex-wrap gap-4 content-start
      "
    >
      <GridPattern
        width={width}
        height={height}
        x={23}
        y={22}
        className="stroke-black/30"
      />
      <div className="relative z-10 flex flex-wrap gap-4 w-full content-start">
        {children}
      </div>
    </div>
  )
}
