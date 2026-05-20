import type { ModifierContainerState } from "@/features/modifier-container/components/modifier-container-page"

export function generateDraggableItemsCode({
  count,
  content,
  hasRestrictParent,
}: ModifierContainerState): string {
  return Array.from(
    { length: count },
    (_, i) =>
      `  <Draggable id="${i + 1}"` +
      (hasRestrictParent ? " restrictParent" : "") +
      (content ? `>${content}</Draggable>` : "/>"),
  ).join("\n")
}
