export const generateDraggableUsageCode = (children: string[]): string => {
  return `import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"

<DragDropProvider>
${children.join(",\n")}
</DragDropProvider>`
}
