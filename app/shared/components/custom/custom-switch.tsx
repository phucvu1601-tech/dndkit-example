import { Switch } from "@/shared/components/ui/switch"
import { cn } from "@/shared/lib/utils"

interface CustomSwitchProps {
  label: string
  value: boolean
  setValue: (value: boolean) => void
  disabled?: boolean
}

export default function CustomSwitch({
  label,
  value,
  setValue,
  disabled = false,
}: CustomSwitchProps) {
  return (
    <label
      htmlFor={label}
      className={cn(
        "relative border-2 rounded-lg flex justify-end items-center p-1 bg-card/80 pr-4 min-h-10",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      <div className="absolute left-0 top-0 translate-y-1/2 ml-3 flex items-center text-muted-foreground">
        {label}
      </div>
      <Switch
        id={label}
        checked={value}
        onCheckedChange={setValue}
        disabled={disabled}
      />
    </label>
  )
}
