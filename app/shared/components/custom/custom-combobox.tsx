"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/shared/components/ui/combobox"
import { cn } from "@/shared/lib/utils"

interface CustomCombobox {
  label: string
  placeholder?: string
  options: string[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  disabled?: boolean
}

export function CustomCombobox({
  label,
  placeholder = "Select a option",
  options,
  value,
  setValue,
  disabled = false,
}: CustomCombobox) {
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
      <Combobox
        items={options}
        value={value}
        onValueChange={(val) => setValue(val ?? "")}
        disabled={disabled}
      >
        <ComboboxInput
          placeholder={placeholder}
          disabled={disabled}
          className="h-10 [&_input]:text-right border-none has-[[data-slot=input-group-control]:focus-visible]:border-input! has-[[data-slot=input-group-control]:focus-visible]:ring-0!"
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
