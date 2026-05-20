import type { ModifierBasicState } from "@/features/modifier-basic/types/modifier-basic.type"

export function generateDraggableItemsCode({
  count,
  content,
  hasRestrictVertical,
  hasRestrictHorizontal,
  hasRestrictWindow,
}: ModifierBasicState): string {
  return Array.from(
    { length: count },
    (_, i) =>
      `  <Draggable id="${i + 1}"` +
      (hasRestrictVertical ? " restrictVertical" : "") +
      (hasRestrictHorizontal ? " restrictHorizontal" : "") +
      (hasRestrictWindow ? " restrictWindow" : "") +
      (content ? `>${content}</Draggable>` : "/>"),
  ).join("\n")
}
