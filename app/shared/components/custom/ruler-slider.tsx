import { Slider } from "radix-ui"
import * as React from "react"
import { cn } from "@/shared/lib/utils"

interface RulerSliderProps {
  label: string
  min?: number
  max?: number
  step?: number
  tickCount?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  className?: string
  disabled?: boolean
}

export function RulerSlider({
  label,
  min = 0,
  max = 100,
  step = 1,
  tickCount = 10,
  value,
  defaultValue,
  onValueChange,
  className,
  disabled = false,
}: RulerSliderProps) {
  const radixValue = value !== undefined ? [value] : undefined
  const radixDefault = [defaultValue ?? min]

  const [displayValue, setDisplayValue] = React.useState(
    value ?? defaultValue ?? min,
  )

  const ticks = React.useMemo(() => {
    return Array.from(
      { length: tickCount - 1 },
      (_, i) => ((i + 1) / tickCount) * 100,
    )
  }, [tickCount])

  React.useEffect(() => {
    if (value !== undefined) setDisplayValue(value)
  }, [value])

  const handleValueChange = (vals: number[]) => {
    setDisplayValue(vals[0])
    onValueChange?.(vals[0])
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 select-none",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      {/* Radix Slider */}
      <Slider.Root
        min={min}
        max={max}
        step={step}
        value={radixValue}
        defaultValue={radixDefault}
        onValueChange={handleValueChange}
        disabled={disabled}
        className="group relative flex w-full touch-none items-center"
      >
        <Slider.Track className="relative h-10 w-full grow cursor-pointer bg-card/80 overflow-visible rounded-lg border border-border shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          {/* Filled range */}
          <Slider.Range className="absolute top-0 h-full rounded-sm bg-muted" />

          {/* Value */}
          <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground">
            {label}
          </span>

          {/* Value */}
          <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-sm font-medium">
            {Number.isInteger(step)
              ? Math.round(displayValue)
              : displayValue.toFixed(1)}
          </span>

          {/* Tick marks — uniform, centered */}
          {ticks.map((percent) => (
            <div
              key={percent}
              className="pointer-events-none absolute top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-border/60"
              style={{ left: `${percent}%` }}
            />
          ))}
        </Slider.Track>

        {/* Thumb — vertical bar */}
        <Slider.Thumb
          aria-label={label}
          className={cn(
            "relative block h-4.5 w-0.5 rounded-md cursor-pointer -translate-x-1 bg-primary origin-center transition-all duration-100 opacity-50",
            "group-hover:scale-130 group-hover:opacity-100",
            displayValue === min && "hidden",
          )}
        />
      </Slider.Root>
    </div>
  )
}
