import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"
import { useState } from "react"
import {
  DEFAULT_DRAG_TRANSFORM,
  type DragTransformState,
} from "@/features/drag-transform/components/drag-transform-page"
import {
  generateDraggableItemsCode,
  generateDraggableUsageCode,
} from "@/features/drag-transform/libs/code-generator"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import { Draggable } from "./draggable"

interface PreviewProps {
  state: DragTransformState
  setField: <K extends keyof DragTransformState>(
    key: K,
    value: DragTransformState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content } = state
  const [{ x, y }, setPosition] = useState({ x: 0, y: 0 })
  const draggableItems = generateDraggableItemsCode({
    state,
    defaultState: DEFAULT_DRAG_TRANSFORM,
    isInline: true,
  })
  const code = generateDraggableUsageCode([draggableItems])

  const handleDragEnd = (event: DragEndEvent) => {
    const { transform } = event.operation
    if (transform) {
      setPosition((prev) => ({
        x: prev.x + transform.x,
        y: prev.y + transform.y,
      }))
    }
  }

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoBackground>
          <DragDropProvider onDragEnd={handleDragEnd}>
            {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
              <Draggable key={i + 1} id={String(i + 1)} x={x} y={y}>
                {content}
              </Draggable>
            ))}
          </DragDropProvider>
        </DemoBackground>
      </Section>
      <Section label="Customize">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-4">
          <Count
            label="Items count"
            value={count}
            setValue={(value) => setField("count", value)}
            minValue={1}
          />
          <CustomInput
            label="Children content"
            value={content}
            setValue={(value) => setField("content", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
