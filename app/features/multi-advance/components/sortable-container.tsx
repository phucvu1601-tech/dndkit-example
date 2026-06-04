import { useSortable } from "@dnd-kit/react/sortable"

interface DroppableProps {
  id: string
  index: number
  children?: React.ReactNode
}

export function SortableContainer({ id, index, children }: DroppableProps) {
  const { ref } = useSortable({
    id,
    index,
  })

  return (
    <div
      ref={ref}
      className="min-w-33 min-h-40 border-2 border-gray-500 border-dashed rounded-xl flex p-4 flex-col gap-2"
    >
      {children}
    </div>
  )
}
