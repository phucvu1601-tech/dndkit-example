import {
  addIndent,
  generateInlineJSX,
  generateJSX,
  generateNonDefaultProps,
} from "@/shared/lib/code-generator"

export function generateDroppableItemsCode<
  T extends { dropCount: number; collisionDetector: string },
>({
  state,
  defaultState,
  excludedKeys = new Set(["dropCount"]) as Set<keyof T>,
  isInline = false,
}: {
  state: T
  defaultState: T
  excludedKeys?: Set<keyof T>
  isInline?: boolean
}): string {
  const { dropCount, collisionDetector } = state
  const props = generateNonDefaultProps<T>({
    state: {
      ...state,
      collisionDetector: { var: collisionDetector },
    },
    defaultState: {
      ...defaultState,
      collisionDetector: { var: defaultState.collisionDetector },
    },
    excludedKeys,
  })
  const generate = isInline ? generateInlineJSX : generateJSX
  return Array.from(
    { length: dropCount },
    (_, i) =>
      `${generate("Droppable", { id: String(i + 1), ...props }, `{parent === "${i + 1}" && draggable}`)}`,
  ).join("\n")
}

export const generateDroppableUsageCode = (
  children: string[],
  detector: string,
): string => {
  const collisionImport =
    detector !== "defaultCollisionDetection"
      ? `import { ${detector} } from "@dnd-kit/collision"\n`
      : ""
  return `${collisionImport}import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"

const [parent, setParent] = useState<string>()
const draggable = <Draggable id="draggable" />

const handleDragEnd = (event: DragEndEvent) => {
  const { target } = event.operation
  if (event.canceled) return
  setParent(target ? String(target.id) : undefined)
}

<DragDropProvider onDragEnd={handleDragEnd}>
  <div className="h-10">{!parent && draggable}</div>
  <div className="flex flex-wrap gap-2">
${addIndent(children.join("\n"), 2)}
  </div>
</DragDropProvider>`
}
