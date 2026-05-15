import { LayoutGrid } from "lucide-react"
import {
  GRID_LAYOUTS,
  type GridLayout,
} from "@/shared/components/container/grid"
import { Button } from "@/shared/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group"

interface LayoutPickerProps {
  value: GridLayout
  onChange: (value: GridLayout) => void
}

export function LayoutPicker({ value, onChange }: LayoutPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-full w-fit px-4">
          <LayoutGrid />
          <p className="max-sm:hidden">Layout</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit" align="end">
        <ToggleGroup
          type="single"
          variant={"outline"}
          spacing={5}
          value={value}
          onValueChange={(v) => v && onChange(v as GridLayout)}
          className="grid grid-cols-3"
        >
          {GRID_LAYOUTS.map((l) => (
            <ToggleGroupItem key={l} value={l}>
              {l}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </PopoverContent>
    </Popover>
  )
}
