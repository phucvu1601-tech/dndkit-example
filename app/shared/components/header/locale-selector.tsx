"use client"

import { Check, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"
import { LOCALES_AVAILABLE } from "@/i18n"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { cn } from "@/shared/lib/utils"

export function LocaleSelector() {
  const { i18n } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="bg-background w-32"
      >
        {LOCALES_AVAILABLE.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => i18n.changeLanguage(l)}
            className={cn(
              "flex cursor-pointer justify-between",
              l === i18n.resolvedLanguage ? "bg-accent font-medium" : "",
            )}
          >
            {l.toUpperCase()}
            {l === i18n.resolvedLanguage && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
