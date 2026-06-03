import { useSortable } from "@dnd-kit/react/sortable"

interface SortableProps {
  id: string
  index: number
  children?: React.ReactNode
  duration?: number
  easing?: string
}

export function Sortable({
  id,
  index,
  children,
  duration = 300,
  easing = "cubic-bezier(0.25, 1, 0.5, 1)",
}: SortableProps) {
  const { ref } = useSortable({
    id,
    index,
    transition: {
      duration,
      easing,
      idle: true, // Enables animation for order changes not caused by dragging
    },
  })

  return (
    <div
      ref={ref}
      className="p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word"
    >
      {children || `Sortable ${id}`}
    </div>
  )
}
