import { RestrictToElement } from "@dnd-kit/dom/modifiers"
import { useDraggable } from "@dnd-kit/react"

interface DraggableProps {
  id: string
  children?: React.ReactNode
  restrictToParent?: boolean
}

export function Draggable({
  id,
  children,
  restrictToParent = false,
}: DraggableProps) {
  const { ref } = useDraggable({
    id,
    modifiers: restrictToParent
      ? [
          RestrictToElement.configure({
            element: (operation) => {
              const el = operation.source?.element
              return el?.parentElement ?? null
            },
          }),
        ]
      : [],
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
