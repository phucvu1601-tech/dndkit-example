import {
  generateInlineJSX,
  generateJSX,
  generateNonDefaultProps,
} from "@/shared/lib/code-generator"

export function generateDraggableItemsCode<
  T extends { count: number; content: string },
>({
  state,
  defaultState,
  excludedKeys = new Set(["count", "content"]) as Set<keyof T>,
  isInline = false,
}: {
  state: T
  defaultState: T
  excludedKeys?: Set<keyof T>
  isInline?: boolean
}): string {
  const { count, content } = state
  const props = generateNonDefaultProps<T>({
    state,
    defaultState,
    excludedKeys,
  })
  const generate = isInline ? generateInlineJSX : generateJSX
  return Array.from(
    { length: count },
    (_, i) =>
      `  ${generate("Draggable", { id: String(i + 1), ...props, x: { var: "x" }, y: { var: "y" } }, content)}`,
  ).join("\n")
}

export const generateDraggableUsageCode = (children: string[]): string => {
  return `import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"

const [{ x, y }, setPosition] = useState({ x: 0, y: 0 })
const handleDragEnd = (event: DragEndEvent) => {
  const { transform } = event.operation
  if (transform) {
    setPosition((prev) => ({
      x: prev.x + transform.x,
      y: prev.y + transform.y,
    }))
  }
}

<DragDropProvider onDragEnd={handleDragEnd}>
${children.join("\n")}
</DragDropProvider>`
}
