function formatPropValue(k: string, v: string): string {
  if (v === "true") return ` ${k}`
  else return ` ${k}={${v}}`
}

function generateJSX(
  tag: string,
  props: Record<string, string>,
  content?: string,
): string {
  const propEntries = Object.entries(props)
  const formattedProps = propEntries.map(([k, v]) => formatPropValue(k, v))
  const isMultiline = propEntries.length > 1

  const propsStr = isMultiline
    ? `\n${formattedProps.map((p) => `    ${p.trim()}`).join("\n")}\n  `
    : formattedProps.join("")

  if (!content) return `<${tag}${propsStr}/>`

  return isMultiline
    ? `<${tag}${propsStr}>\n    ${content}\n  </${tag}>`
    : `<${tag}${propsStr}>${content}</${tag}>`
}

function generateInlineJSX(
  tag: string,
  props: Record<string, string>,
  content?: string,
): string {
  const propEntries = Object.entries(props)
  const propsStr = propEntries.map(([k, v]) => formatPropValue(k, v)).join("")

  return content
    ? `<${tag}${propsStr}>${content}</${tag}>`
    : `<${tag}${propsStr}/>`
}

export function generateNonDefaultProps<T extends object>({
  state,
  defaultState,
  excludedKeys = new Set(["count", "content"]) as Set<keyof T>,
}: {
  state: T
  defaultState: T
  excludedKeys?: Set<keyof T>
}): Record<string, string> {
  const props: Record<string, string> = {}

  for (const key in defaultState) {
    const k = key as keyof T
    if (excludedKeys.has(k)) continue
    if (state[k] !== defaultState[k]) {
      const value = state[k]
      props[key] = typeof value === "string" ? `"${value}"` : String(value)
    }
  }

  return props
}

export function generateDraggableItemsCode({
  count,
  content,
  props,
  isInline = false,
}: {
  count: number
  content: string
  props: Record<string, string>
  isInline?: boolean
}): string {
  return isInline
    ? Array.from(
        { length: count },
        (_, i) =>
          `  ${generateInlineJSX("Draggable", { id: `"${i + 1}"`, ...props }, content)}`,
      ).join("\n")
    : Array.from(
        { length: count },
        (_, i) =>
          `  ${generateJSX("Draggable", { id: `"${i + 1}"`, ...props }, content)}`,
      ).join("\n")
}

export const generateDraggableUsageCode = (children: string[]): string => {
  return `import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"

<DragDropProvider>
${children.join("\n")}
</DragDropProvider>`
}
