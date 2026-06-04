import isEqual from "lodash/isEqual"

type PropValue = string | number | boolean | { var: string }

function formatPropValue(k: string, v: PropValue): string {
  if (v === true) return ` ${k}`
  if (typeof v === "string") return ` ${k}="${v}"`
  if (typeof v === "object") return ` ${k}={${v.var}}`
  return ` ${k}={${v}}`
}

export function addIndent(str: string, tabPlus: number = 1) {
  const spaces = " ".repeat(tabPlus * 2)
  return str
    .split("\n")
    .map((line) => spaces + line)
    .join("\n")
}

export function generateJSX(
  tag: string,
  props: Record<string, PropValue>,
  content?: string,
): string {
  const entries = Object.entries(props)
  const formatted = entries.map(([k, v]) => formatPropValue(k, v))
  const multiline = entries.length > 1

  const propsStr = multiline
    ? `\n${formatted.map((p) => `  ${p.trim()}`).join("\n")}\n`
    : formatted.join("")

  return content
    ? `<${tag}${propsStr}${multiline ? "" : ""}>${multiline ? `\n  ${content}\n` : content}</${tag}>`
    : `<${tag}${propsStr}/>`
}

export function generateInlineJSX(
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

export function generateNonDefaultProps<T extends object>({
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
    if (excludedKeys.has(k) || isEqual(state[k], defaultState[k])) continue
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
      `${addIndent(generate("Draggable", { id: String(i + 1), ...props }, content))}`,
  ).join("\n")
}

export const generateDraggableUsageCode = (children: string[]): string => {
  return `import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"

<DragDropProvider>
${children.join("\n")}
</DragDropProvider>`
}

export function generateDroppableItemsCode<T extends { dropCount: number }>({
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
  const { dropCount } = state
  const props = generateNonDefaultProps<T>({
    state,
    defaultState,
    excludedKeys,
  })
  const generate = isInline ? generateInlineJSX : generateJSX
  return Array.from(
    { length: dropCount },
    (_, i) =>
      `${generate("Droppable", { id: String(i + 1), ...props }, `{parent === "${i + 1}" && draggable}`)}`,
  ).join("\n")
}

export const generateDroppableUsageCode = (children: string[]): string => {
  return `import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"
import { Droppable } from "./droppable"

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

export function generateSortableItemsCode<
  T extends {
    count: number
    content: string
    direction: string
    isControlled: boolean
  },
>({
  state,
  defaultState,
  excludedKeys = new Set([
    "count",
    "content",
    "direction",
    "isControlled",
  ]) as Set<keyof T>,
  isInline = false,
}: {
  state: T
  defaultState: T
  excludedKeys?: Set<keyof T>
  isInline?: boolean
}): string {
  const { count, content, direction, isControlled } = state
  const props = generateNonDefaultProps<T>({
    state,
    defaultState,
    excludedKeys,
  })
  const generate = isInline ? generateInlineJSX : generateJSX
  return `<div className="${direction}">
  {${isControlled ? "items" : `Array.from({ length: ${count} }, (_, i) => i + 1)`}.map((i, index) => (
${addIndent(generate("Sortable", { key: { var: "i" }, id: { var: "String(i)" }, index: { var: "index" }, ...props }, content), 2)}
  ))}
</div>`
}

export const generateSortableUsageCode = ({
  children,
  isControlled,
  count,
}: {
  children: string[]
  isControlled: boolean
  count: number
}): string => {
  return `${isControlled ? `import { DragDropProvider } from "@dnd-kit/react"\n` : ""}import { Sortable } from "./sortable"

${
  isControlled
    ? `const [items, setItems] = useState(Array.from({ length: ${count} }, (_, i) => i + 1))

<DragDropProvider
  onDragEnd={(event) => {
    setItems((items) => move(items, event));
  }}
>
${addIndent(children.join("\n"))}
</DragDropProvider>`
    : children.join("\n")
}
`
}

const generateAItems = (count: number): string =>
  JSON.stringify(Array.from({ length: count }, (_, i) => `A${i + 1}`))

export const generateMultiUsageCode = ({
  count,
  direction,
}: {
  count: number
  direction: string
}): string => {
  return `
import { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import { Droppable } from './droppable';
import { Sortable } from './sortable';

const [items, setItems] = useState({
  A: ${generateAItems(count)},
  B: ["B1","B2"],
  C: ["C1","C2","C3"],
  D: [],
})

<DragDropProvider
  onDragOver={(event) => {
    setItems((items) => move(items, event))
  }}
>
  <div className="${direction} gap-4">
    {Object.entries(items).map(([column, items]) => (
      <Droppable key={column} id={column}>
        {items.map((id, index) => (
          <Sortable key={id} id={id} index={index} />
        ))}
      </Droppable>
    ))}
  </div>
</DragDropProvider>
`
}
