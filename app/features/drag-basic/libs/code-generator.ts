import type { DragBasicState } from "@/features/drag-basic/types/drag-basic.type"

export function generateDraggableItemsCode({
  count,
  content,
}: DragBasicState): string {
  return Array.from(
    { length: count },
    (_, i) =>
      `  <Draggable id="${i + 1}"${content ? `>${content}</Draggable>` : "/>"}`,
  ).join("\n")
}
