import { useDraggable } from "@dnd-kit/react"
import { cn } from "@/shared/lib/utils"

interface DraggableProps {
  id: string
  children?: React.ReactNode
  draggingOpacity?: number
}

export function Draggable({
  id,
  children,
  draggingOpacity = 100,
}: DraggableProps) {
  const { ref, isDragging } = useDraggable({
    id,
  })

  return (
    <div
      ref={ref}
      className={cn(
        "p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word",
      )}
      style={isDragging ? { opacity: `${draggingOpacity}%` } : undefined}
    >
      {children || "Draggable"}
    </div>
  )
}
