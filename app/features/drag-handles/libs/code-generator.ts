import type { DragHandleState } from "@/features/drag-handles/types/drag-handles.type"

export function generateDraggableItemsCode({
  count,
  content,
  hasHandle,
}: DragHandleState): string {
  return Array.from(
    { length: count },
    (_, i) =>
      `  <Draggable id="${i + 1}"${hasHandle ? " hasHandle" : ""}${content ? `>${content}</Draggable>` : "/>"}`,
  ).join("\n")
}
