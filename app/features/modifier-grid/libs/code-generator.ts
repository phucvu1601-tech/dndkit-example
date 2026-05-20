import type { ModifierGridState } from "@/features/modifier-grid/types/modifier-grid.type"

export function generateDraggableItemsCode({
  count,
  content,
  gridX,
  gridY,
}: ModifierGridState): string {
  return Array.from(
    { length: count },
    (_, i) =>
      `  <Draggable id="${i + 1}" gridX={${gridX}} gridY={${gridY}}` +
      (content ? `>${content}</Draggable>` : "/>"),
  ).join("\n")
}
