import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"
import { useState } from "react"
import {
  DEFAULT_DROP_BASIC,
  type DropBasicState,
} from "@/features/drop-basic/components/drop-basic-page"
import { Droppable } from "@/features/drop-basic/components/droppable"
import {
  generateDroppableItemsCode,
  generateDroppableUsageCode,
} from "@/features/drop-basic/libs/code-generator"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import { Draggable } from "./draggable"

interface PreviewProps {
  state: DropBasicState
  setField: <K extends keyof DropBasicState>(
    key: K,
    value: DropBasicState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { dropCount } = state
  const [parent, setParent] = useState<string>()
  const draggable = <Draggable id="draggable" />

  const handleDragEnd = (event: DragEndEvent) => {
    const { target } = event.operation
    if (event.canceled) return
    setParent(target ? String(target.id) : undefined)
  }

  const draggableItems = generateDroppableItemsCode({
    state,
    defaultState: DEFAULT_DROP_BASIC,
  })
  const code = generateDroppableUsageCode([draggableItems])

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DragDropProvider onDragEnd={handleDragEnd}>
          <DemoBackground className="flex-col">
            <div className="h-10">{!parent && draggable}</div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: dropCount }, (_, i) => i + 1).map((i) => (
                <Droppable key={i} id={String(i)}>
                  {parent === String(i) && draggable}
                </Droppable>
              ))}
            </div>
          </DemoBackground>
        </DragDropProvider>
      </Section>
      <Section label="Customize">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-4">
          <Count
            label="Drop items count"
            value={dropCount}
            setValue={(value) => setField("dropCount", value)}
            minValue={1}
            maxValue={36}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
