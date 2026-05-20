import type { ModifierBasicState } from "@/features/modifier-basic/components/modifier-basic-page"

export function generateDraggableItemsCode({
  count,
  content,
  hasRestrictVertical,
  hasRestrictHorizontal,
  hasRestrictWindow,
  hasRestrictParent,
}: ModifierBasicState): string {
  return Array.from(
    { length: count },
    (_, i) =>
      `  <Draggable id="${i + 1}"` +
      (hasRestrictVertical ? " restrictVertical" : "") +
      (hasRestrictHorizontal ? " restrictHorizontal" : "") +
      (hasRestrictWindow ? " restrictWindow" : "") +
      (hasRestrictParent ? " restrictParent" : "") +
      (content ? `>${content}</Draggable>` : "/>"),
  ).join("\n")
}
