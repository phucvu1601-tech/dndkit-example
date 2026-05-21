import { DEFAULT_STATE } from "@/features/sensor-basic-constraint/components/sensor-basic-constraint-page"
import type { SensorBasicConstraintState } from "@/features/sensor-basic-constraint/types/sensor-basic-constraint.type"

const EXCLUDED_PROPS = new Set<keyof SensorBasicConstraintState>([
  "count",
  "content",
])

function buildJSXElement(
  tag: string,
  props: Record<string, string>,
  content?: string,
): string {
  const propEntries = Object.entries(props)
  const propsStr =
    propEntries.length <= 1
      ? propEntries.map(([k, v]) => ` ${k}={${v}}`).join("")
      : "\n" +
        propEntries.map(([k, v]) => `    ${k}={${v}}`).join("\n") +
        "\n  "

  return content
    ? `<${tag}${propsStr}>${content}</${tag}>`
    : `<${tag}${propsStr}/>`
}

export function generateDraggableItemsCode(
  state: SensorBasicConstraintState,
): string {
  return Array.from({ length: state.count }, (_, i) => {
    const props: Record<string, string> = { id: String(i + 1) }

    for (const key in DEFAULT_STATE) {
      const k = key as keyof SensorBasicConstraintState
      if (EXCLUDED_PROPS.has(k)) continue
      if (state[k] !== DEFAULT_STATE[k]) props[key] = String(state[k])
    }

    return `  ${buildJSXElement("Draggable", props, state.content)}`
  }).join("\n")
}
