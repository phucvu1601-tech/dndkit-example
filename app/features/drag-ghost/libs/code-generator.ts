import type { DragGhostState } from "@/features/drag-ghost/types/drag-ghost.type"

export function generateDraggableItemsCode({
  count,
  content,
  draggingOpacity,
}: DragGhostState): string {
  return Array.from(
    { length: count },
    (_, i) =>
      `  <Draggable id="${i + 1}"${draggingOpacity === 100 ? "" : ` draggingOpacity={${draggingOpacity}}`}${content ? `>${content}</Draggable>` : "/>"}`,
  ).join("\n")
}
