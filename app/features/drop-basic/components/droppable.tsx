import { useDroppable } from "@dnd-kit/react"

interface DroppableProps {
  id: string
  children?: React.ReactNode
}

export function Droppable({ id, children }: DroppableProps) {
  const { ref } = useDroppable({
    id,
  })

  return (
    <div
      ref={ref}
      className="w-50 h-50 border-2 border-gray-500 border-dashed rounded-xl flex p-4"
    >
      {children || `Droppable ${id}`}
    </div>
  )
}
