import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "@/features/modifier-grid/components/draggable"
import {
  DEFAULT_MODIFIER_GRID,
  type ModifierGridState,
} from "@/features/modifier-grid/components/modifier-grid-page"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoGridBackground from "@/shared/components/container/demo-grid-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import { RulerSlider } from "@/shared/components/custom/ruler-slider"
import {
  generateDraggableItemsCode,
  generateDraggableUsageCode,
  generateNonDefaultProps,
} from "@/shared/lib/code-generator"

interface PreviewProps {
  state: ModifierGridState
  setField: <K extends keyof ModifierGridState>(
    key: K,
    value: ModifierGridState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content, gridX, gridY } = state
  const props = generateNonDefaultProps({
    state,
    defaultState: DEFAULT_MODIFIER_GRID,
  })
  const draggableItems = generateDraggableItemsCode({
    count,
    content,
    props,
    isInline: true,
  })
  const code = generateDraggableUsageCode([draggableItems])

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoGridBackground width={gridX} height={gridY}>
          <DragDropProvider>
            {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
              <Draggable
                key={i + 1}
                id={String(i + 1)}
                gridX={gridX}
                gridY={gridY}
              >
                {content}
              </Draggable>
            ))}
          </DragDropProvider>
        </DemoGridBackground>
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
            label="Grid size X"
            value={gridX}
            onValueChange={(value) => setField("gridX", value)}
            step={2}
            min={10}
          />
          <RulerSlider
            label="Grid size Y"
            value={gridY}
            onValueChange={(value) => setField("gridY", value)}
            step={2}
            min={10}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
