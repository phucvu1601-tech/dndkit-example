import { Input } from "@/shared/components/ui/input"

interface CustomInputProps {
  label: string
  value: string
  setValue: (value: string) => void
}

export default function CustomInput({
  label,
  value,
  setValue,
}: CustomInputProps) {
  return (
    <div className="relative border-2 rounded-lg">
      <div className="absolute left-0 top-0 translate-y-1/2 ml-3 flex items-center text-muted-foreground">
        {label}
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 pl-[50%] text-right border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  )
}
