import { SnapModifier } from "@dnd-kit/abstract/modifiers"
import { useDraggable } from "@dnd-kit/react"

interface DraggableProps {
  id: string
  children?: React.ReactNode
  gridX?: number
  gridY?: number
}

export function Draggable({
  id,
  children,
  gridX = 20,
  gridY = 20,
}: DraggableProps) {
  const { ref } = useDraggable({
    id,
    modifiers: [SnapModifier.configure({ size: { x: gridX, y: gridY } })],
  })

  return (
    <div
      ref={ref}
      className="p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word"
    >
      {children || "Draggable"}
    </div>
  )
}
