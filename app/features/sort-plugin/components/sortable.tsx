import { Feedback } from "@dnd-kit/dom"
import { useSortable } from "@dnd-kit/react/sortable"

interface SortableProps {
  id: string
  index: number
  children?: React.ReactNode
  draggingOpacity?: number
  hasClone?: boolean
}

export function Sortable({
  id,
  index,
  children,
  draggingOpacity = 100,
  hasClone = false,
}: SortableProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    plugins: hasClone
      ? (defaults) => [...defaults, Feedback.configure({ feedback: "clone" })]
      : undefined,
  })

  return (
    <div
      ref={ref}
      className="p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word"
      style={isDragging ? { opacity: `${draggingOpacity}%` } : undefined}
    >
      {children || `Sortable ${id}`}
    </div>
  )
}
