import { DragDropProvider } from "@dnd-kit/react"
import {
  DEFAULT_DRAG_GHOST,
  type DragGhostState,
} from "@/features/drag-ghost/components/drag-ghost-page"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import { RulerSlider } from "@/shared/components/custom/ruler-slider"
import {
  generateDraggableItemsCode,
  generateDraggableUsageCode,
} from "@/shared/lib/code-generator"
import { Draggable } from "./draggable"

interface PreviewProps {
  state: DragGhostState
  setField: <K extends keyof DragGhostState>(
    key: K,
    value: DragGhostState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content, draggingOpacity } = state
  const draggableItems = generateDraggableItemsCode({
    state,
    defaultState: DEFAULT_DRAG_GHOST,
    isInline: true,
  })
  const code = generateDraggableUsageCode([draggableItems])

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoBackground>
          <DragDropProvider>
            {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
              <Draggable
                key={i + 1}
                id={String(i + 1)}
                draggingOpacity={draggingOpacity}
              >
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
          <RulerSlider
            label="Dragging opacity"
            value={draggingOpacity}
            onValueChange={(value) => setField("draggingOpacity", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
