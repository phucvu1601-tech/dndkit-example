import {
  RestrictToHorizontalAxis,
  RestrictToVerticalAxis,
} from "@dnd-kit/abstract/modifiers"
import { RestrictToWindow } from "@dnd-kit/dom/modifiers"
import { useDraggable } from "@dnd-kit/react"

interface DraggableProps {
  id: string
  children?: React.ReactNode
  restrictVertical?: boolean
  restrictHorizontal?: boolean
  restrictWindow?: boolean
}

export function Draggable({
  id,
  children,
  restrictVertical = false,
  restrictHorizontal = false,
  restrictWindow = false,
}: DraggableProps) {
  const modifiers = [
    restrictVertical && RestrictToVerticalAxis,
    restrictHorizontal && RestrictToHorizontalAxis,
    restrictWindow && RestrictToWindow,
  ].filter((m) => m !== false)

  const { ref } = useDraggable({ id, modifiers })

  return (
    <div
      ref={ref}
      className="p-2 rounded-lg bg-foreground text-background w-fit h-fit cursor-grab max-w-full wrap-break-word"
    >
      {children || "Draggable"}
    </div>
  )
}
