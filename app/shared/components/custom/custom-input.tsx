import { Input } from "@/shared/components/ui/input"
import { cn } from "@/shared/lib/utils"

interface CustomInputProps {
  label: string
  value: string
  setValue: (value: string) => void
  disabled?: boolean
}

export default function CustomInput({
  label,
  value,
  setValue,
  disabled = false,
}: CustomInputProps) {
  return (
    <div
      className={cn(
        "relative border-2 rounded-lg",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      <div className="absolute left-0 top-0 translate-y-1/2 ml-3 flex items-center text-muted-foreground">
        {label}
      </div>
      <Input
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 pl-[50%] text-right border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
