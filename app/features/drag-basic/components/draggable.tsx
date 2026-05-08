import { useDraggable } from "@dnd-kit/react"

interface DraggableProps {
  id: string
  children?: React.ReactNode
}

export function Draggable({ id, children }: DraggableProps) {
  const { ref } = useDraggable({
    id,
  })

  return (
    <div
      ref={ref}
      className="p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word"
    >
      {children ? children : "Draggable"}
    </div>
  )
}
