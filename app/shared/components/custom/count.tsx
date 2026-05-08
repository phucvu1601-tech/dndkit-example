import { Minus, Plus } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { ButtonGroup } from "@/shared/components/ui/button-group"
import { Input } from "@/shared/components/ui/input"

interface CountProps {
  label: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  minValue?: number
  maxValue?: number
}

export default function Count({
  label,
  value,
  setValue,
  minValue,
  maxValue,
}: CountProps) {
  return (
    <div className="relative border-2 rounded-lg flex justify-end p-1 bg-card/80">
      <div className="absolute left-0 top-0 translate-y-1/2 ml-3 flex items-center text-muted-foreground">
        {label}
      </div>
      <ButtonGroup>
        <Input
          className="w-16 text-center"
          value={value}
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
          disabled={minValue !== undefined && value <= minValue}
          onClick={() => setValue((c) => c - 1)}
        >
          <Minus />
        </Button>
        <Button
          variant="outline"
          disabled={maxValue !== undefined && value >= maxValue}
          onClick={() => setValue((c) => c + 1)}
        >
          <Plus />
        </Button>
      </ButtonGroup>
    </div>
  )
}
