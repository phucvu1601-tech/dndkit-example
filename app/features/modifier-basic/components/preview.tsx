import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "@/features/modifier-basic/components/draggable"
import { generateDraggableItemsCode } from "@/features/modifier-basic/libs/code-generator"
import type { ModifierBasicState } from "@/features/modifier-basic/types/modifier-basic.type"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import CustomSwitch from "@/shared/components/custom/custom-switch"
import { generateDraggableUsageCode } from "@/shared/lib/code-generator"

interface PreviewProps {
  state: ModifierBasicState
  setField: <K extends keyof ModifierBasicState>(
    key: K,
    value: ModifierBasicState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const {
    count,
    content,
    hasRestrictVertical,
    hasRestrictHorizontal,
    hasRestrictWindow,
  } = state
  const draggableItems = generateDraggableItemsCode(state)
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
                restrictVertical={hasRestrictVertical}
                restrictHorizontal={hasRestrictHorizontal}
                restrictWindow={hasRestrictWindow}
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
          <CustomSwitch
            label="Has restrict to vertical"
            value={hasRestrictVertical}
            setValue={(value) => setField("hasRestrictVertical", value)}
          />
          <CustomSwitch
            label="Has restrict to horizontal"
            value={hasRestrictHorizontal}
            setValue={(value) => setField("hasRestrictHorizontal", value)}
          />
          <CustomSwitch
            label="Has restrict to window"
            value={hasRestrictWindow}
            setValue={(value) => setField("hasRestrictWindow", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
