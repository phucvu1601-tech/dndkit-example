import { Switch } from "@/shared/components/ui/switch"

interface CustomSwitchProps {
  label: string
  value: boolean
  setValue: (value: boolean) => void
}

export default function CustomSwitch({
  label,
  value,
  setValue,
}: CustomSwitchProps) {
  return (
    <label
      htmlFor={label}
      className="relative border-2 rounded-lg flex justify-end items-center p-1 bg-card/80 pr-4 min-h-10"
    >
      <div className="absolute left-0 top-0 translate-y-1/2 ml-3 flex items-center text-muted-foreground">
        {label}
      </div>
      <Switch id={label} checked={value} onCheckedChange={setValue} />
    </label>
  )
}
