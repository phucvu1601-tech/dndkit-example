import type { CollisionDetector } from "@dnd-kit/collision"
import { defaultCollisionDetection } from "@dnd-kit/collision"
import { useDroppable } from "@dnd-kit/react"
import { cn } from "@/shared/lib/utils"

interface DroppableProps {
  id: string
  children?: React.ReactNode
  collisionDetector?: CollisionDetector
}

export function Droppable({
  id,
  children,
  collisionDetector = defaultCollisionDetection,
}: DroppableProps) {
  const { ref, isDropTarget } = useDroppable({
    id,
    collisionDetector,
  })

  return (
    <div
      ref={ref}
      className={cn(
        "w-50 h-50 border-2 border-gray-500 border-dashed rounded-xl flex p-4",
        isDropTarget && "border-emerald-500 border-solid",
      )}
    >
      {children || `Droppable ${id}`}
    </div>
  )
}
