import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "@/features/modifier-basic/components/draggable"
import {
  DEFAULT_MODIFIER_BASIC,
  type ModifierBasicState,
} from "@/features/modifier-basic/components/modifier-basic-page"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import CustomSwitch from "@/shared/components/custom/custom-switch"
import {
  generateDraggableItemsCode,
  generateDraggableUsageCode,
  generateNonDefaultProps,
} from "@/shared/lib/code-generator"

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
    restrictVertical,
    restrictHorizontal,
    restrictWindow,
  } = state
  const props = generateNonDefaultProps({
    state,
    defaultState: DEFAULT_MODIFIER_BASIC,
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
        <DemoBackground>
          <DragDropProvider>
            {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
              <Draggable
                key={i + 1}
                id={String(i + 1)}
                restrictVertical={restrictVertical}
                restrictHorizontal={restrictHorizontal}
                restrictWindow={restrictWindow}
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
            value={restrictVertical}
            setValue={(value) => setField("restrictVertical", value)}
          />
          <CustomSwitch
            label="Has restrict to horizontal"
            value={restrictHorizontal}
            setValue={(value) => setField("restrictHorizontal", value)}
          />
          <CustomSwitch
            label="Has restrict to window"
            value={restrictWindow}
            setValue={(value) => setField("restrictWindow", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
