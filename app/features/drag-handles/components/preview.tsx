import { DragDropProvider } from "@dnd-kit/react"
import type { DragHandleState } from "@/features/drag-handles/components/drag-handles-page"
import { Draggable } from "@/features/drag-handles/components/draggable"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import CustomSwitch from "@/shared/components/custom/custom-switch"
import { generateDraggableUsageCode } from "@/shared/lib/code-generator"

interface PreviewProps {
  state: DragHandleState
  setField: <K extends keyof DragHandleState>(
    key: K,
    value: DragHandleState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content, hasHandle } = state
  const draggableItems = Array.from(
    { length: count },
    (_, i) =>
      `<Draggable id="${i + 1}"${hasHandle ? " hasHandle" : ""}${content ? `>${content}</Draggable>` : "/>"}`,
  ).join("\n  ")
  const code = generateDraggableUsageCode([draggableItems])

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoBackground>
          <DragDropProvider>
            {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
              <Draggable key={i + 1} id={String(i + 1)} hasHandle={hasHandle}>
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
            label="Has handle"
            value={hasHandle}
            setValue={(value) => setField("hasHandle", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
