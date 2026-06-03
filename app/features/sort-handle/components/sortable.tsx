import { useSortable } from "@dnd-kit/react/sortable"
import { GripVertical } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface SortableProps {
  id: string
  index: number
  children?: React.ReactNode
  hasHandle?: boolean
}

export function Sortable({
  id,
  index,
  children,
  hasHandle = false,
}: SortableProps) {
  const { ref, handleRef } = useSortable({
    id,
    index,
  })

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-2 rounded-lg bg-foreground text-background w-fit h-fit max-w-full wrap-break-word min-h-12",
        !hasHandle && "cursor-grab",
      )}
    >
      {hasHandle && (
        <div
          ref={handleRef}
          className="cursor-grab hover:bg-background/5 active:bg-background/5 py-2 px-1 rounded-sm"
        >
          <GripVertical size={18} />
        </div>
      )}
      {children || `Sortable ${id}`}
    </div>
  )
}
