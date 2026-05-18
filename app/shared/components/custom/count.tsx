import { Minus, Plus } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { ButtonGroup } from "@/shared/components/ui/button-group"
import { Input } from "@/shared/components/ui/input"
import { cn } from "@/shared/lib/utils"

interface CountProps {
  label: string
  value: number
  setValue: (value: number) => void
  minValue?: number
  maxValue?: number
  disabled?: boolean
}

export default function Count({
  label,
  value,
  setValue,
  minValue,
  maxValue,
  disabled = false,
}: CountProps) {
  return (
    <div
      className={cn(
        "relative border-2 rounded-lg flex justify-end p-1 bg-card/80",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      <div className="absolute left-0 top-0 translate-y-1/2 ml-3 flex items-center text-muted-foreground">
        {label}
      </div>
      <ButtonGroup>
        <Input
          className="w-16 text-center"
          value={value}
          disabled={disabled}
          onChange={(e) => {
            const val = Number(e.target.value)
            if (!Number.isNaN(val)) {
              if (minValue !== undefined && val < minValue) return
              if (maxValue !== undefined && val > maxValue) return
              setValue(val)
            }
          }}
        />
        <Button
          variant="outline"
          disabled={disabled || (minValue !== undefined && value <= minValue)}
          onClick={() => setValue(value - 1)}
        >
          <Minus />
        </Button>
        <Button
          variant="outline"
          disabled={disabled || (maxValue !== undefined && value >= maxValue)}
          onClick={() => setValue(value + 1)}
        >
          <Plus />
        </Button>
      </ButtonGroup>
    </div>
  )
}
