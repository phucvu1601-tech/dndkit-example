type PropValue = string | number | boolean

function formatPropValue(k: string, v: PropValue): string {
  if (v === true) return ` ${k}`
  if (typeof v === "string") return ` ${k}="${v}"`
  return ` ${k}={${v}}`
}

function generateJSX(
  tag: string,
  props: Record<string, PropValue>,
  content?: string,
): string {
  const entries = Object.entries(props)
  const formatted = entries.map(([k, v]) => formatPropValue(k, v))
  const multiline = entries.length > 1

  const propsStr = multiline
    ? `\n${formatted.map((p) => `    ${p.trim()}`).join("\n")}\n  `
    : formatted.join("")

  return content
    ? `<${tag}${propsStr}${multiline ? "" : ""}>${multiline ? `\n    ${content}\n  ` : content}</${tag}>`
    : `<${tag}${propsStr}/>`
}

function generateInlineJSX(
  tag: string,
  props: Record<string, PropValue>,
  content?: string,
): string {
  const propsStr = Object.entries(props)
    .map(([k, v]) => formatPropValue(k, v))
    .join("")
  return content
    ? `<${tag}${propsStr}>${content}</${tag}>`
    : `<${tag}${propsStr}/>`
}

function generateNonDefaultProps<T extends object>({
  state,
  defaultState,
  excludedKeys,
}: {
  state: T
  defaultState: T
  excludedKeys: Set<keyof T>
}): Record<string, PropValue> {
  const props: Record<string, PropValue> = {}

  for (const key in defaultState) {
    const k = key as keyof T
    if (excludedKeys.has(k) || state[k] === defaultState[k]) continue
    props[key] = state[k] as PropValue
  }

  return props
}

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
      `  ${generate("Draggable", { id: String(i + 1), ...props }, content)}`,
  ).join("\n")
}

export const generateDraggableUsageCode = (children: string[]): string => {
  return `import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"

<DragDropProvider>
${children.join("\n")}
</DragDropProvider>`
}
