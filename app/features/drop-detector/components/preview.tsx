import {
  closestCenter,
  closestCorners,
  defaultCollisionDetection,
  directionBiased,
  pointerDistance,
  pointerIntersection,
  shapeIntersection,
} from "@dnd-kit/collision"
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"
import { useState } from "react"
import {
  DEFAULT_DROP_DETECTOR,
  type DropDetectorState,
} from "@/features/drop-detector/components/drop-detector-page"
import {
  generateDroppableItemsCode,
  generateDroppableUsageCode,
} from "@/features/drop-detector/libs/code-generator"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import { CustomCombobox } from "@/shared/components/custom/custom-combobox"
import { Draggable } from "./draggable"
import { Droppable } from "./droppable"

const detectors = {
  defaultCollisionDetection,
  pointerIntersection,
  shapeIntersection,
  closestCenter,
  closestCorners,
  pointerDistance,
  directionBiased,
}
type DetectorKey = keyof typeof detectors
const detectorOptions = Object.keys(detectors).map((key) => ({
  value: key,
  label: key,
}))

interface PreviewProps {
  state: DropDetectorState
  setField: <K extends keyof DropDetectorState>(
    key: K,
    value: DropDetectorState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { dropCount, collisionDetector } = state
  const [parent, setParent] = useState<string>()
  const draggable = <Draggable id="draggable" />

  const handleDragEnd = (event: DragEndEvent) => {
    const { target } = event.operation
    if (event.canceled) return
    setParent(target ? String(target.id) : undefined)
  }

  const draggableItems = generateDroppableItemsCode({
    state,
    defaultState: DEFAULT_DROP_DETECTOR,
  })
  const code = generateDroppableUsageCode([draggableItems], collisionDetector)

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DragDropProvider onDragEnd={handleDragEnd}>
          <DemoBackground className="flex-col">
            <div className="h-10">{!parent && draggable}</div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: dropCount }, (_, i) => i + 1).map((i) => (
                <Droppable
                  key={i}
                  id={String(i)}
                  collisionDetector={
                    detectors[collisionDetector as DetectorKey]
                  }
                >
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
          <CustomCombobox
            label="Drop collision detector"
            options={detectorOptions}
            value={collisionDetector}
            setValue={(value) => setField("collisionDetector", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
