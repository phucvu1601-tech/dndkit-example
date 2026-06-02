import { useSortable } from "@dnd-kit/react/sortable"

interface SortableProps {
  id: string
  index: number
  children?: React.ReactNode
}

export function Sortable({ id, index, children }: SortableProps) {
  const { ref } = useSortable({
    id,
    index,
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
