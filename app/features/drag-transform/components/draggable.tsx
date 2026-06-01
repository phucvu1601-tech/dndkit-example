import { useDraggable } from "@dnd-kit/react"

interface DraggableProps {
  id: string
  children?: React.ReactNode
  x: number
  y: number
}

export function Draggable({ id, children, x, y }: DraggableProps) {
  const { ref } = useDraggable({
    id,
  })

  return (
    <div
      ref={ref}
      className="p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word z-90"
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
    >
      {children || "Draggable"}
    </div>
  )
}
