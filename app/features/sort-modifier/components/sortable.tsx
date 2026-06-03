import {
  RestrictToHorizontalAxis,
  RestrictToVerticalAxis,
} from "@dnd-kit/abstract/modifiers"
import { RestrictToElement, RestrictToWindow } from "@dnd-kit/dom/modifiers"
import { useSortable } from "@dnd-kit/react/sortable"

interface SortableProps {
  id: string
  index: number
  children?: React.ReactNode
  restrictVertical?: boolean
  restrictHorizontal?: boolean
  restrictWindow?: boolean
  restrictParent?: boolean
}

export function Sortable({
  id,
  index,
  children,
  restrictVertical = false,
  restrictHorizontal = false,
  restrictWindow = false,
  restrictParent = false,
}: SortableProps) {
  const modifiers = [
    restrictVertical && RestrictToVerticalAxis,
    restrictHorizontal && RestrictToHorizontalAxis,
    restrictWindow && RestrictToWindow,
    restrictParent &&
      RestrictToElement.configure({
        element: (operation) => {
          const el = operation.source?.element
          return el?.parentElement ?? null
        },
      }),
  ].filter((m) => m !== false)
  const { ref } = useSortable({
    id,
    index,
    modifiers,
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
