import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "@/features/sensor-basic-constraint/components/draggable"
import {
  DEFAULT_SENSOR_BASIC_CONSTRAINT,
  type SensorBasicConstraintState,
} from "@/features/sensor-basic-constraint/components/sensor-basic-constraint-page"
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
  generateNonDefaultProps,
} from "@/shared/lib/code-generator"

interface PreviewProps {
  state: SensorBasicConstraintState
  setField: <K extends keyof SensorBasicConstraintState>(
    key: K,
    value: SensorBasicConstraintState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content, delay, tolerance, distance } = state
  const props = generateNonDefaultProps({
    state,
    defaultState: DEFAULT_SENSOR_BASIC_CONSTRAINT,
  })
  const draggableItems = generateDraggableItemsCode({
    count,
    content,
    props,
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
                delay={delay}
                tolerance={tolerance}
                distance={distance}
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
            maxValue={10}
          />
          <CustomInput
            label="Children content"
            value={content}
            setValue={(value) => setField("content", value)}
          />
          <RulerSlider
            label="Delay (ms)"
            value={delay}
            onValueChange={(value) => setField("delay", value)}
            step={100}
            max={5000}
          />
          <RulerSlider
            label="Tolerance (px)"
            value={tolerance}
            onValueChange={(value) => setField("tolerance", value)}
            step={20}
            max={2000}
          />
          <RulerSlider
            label="Distance (px)"
            value={distance}
            onValueChange={(value) => setField("distance", value)}
            step={20}
            max={2000}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
