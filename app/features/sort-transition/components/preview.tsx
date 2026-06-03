import {
  DEFAULT_SORT_TRANSITION,
  type SortTransitionState,
} from "@/features/sort-transition/components/sort-transition-page"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import { CustomCombobox } from "@/shared/components/custom/custom-combobox"
import CustomInput from "@/shared/components/custom/custom-input"
import CustomSwitch from "@/shared/components/custom/custom-switch"
import { RulerSlider } from "@/shared/components/custom/ruler-slider"
import { directionOptions } from "@/shared/constants/sort.constant"
import {
  generateSortableItemsCode,
  generateSortableUsageCode,
} from "@/shared/lib/code-generator"
import { Sortable } from "./sortable"

interface PreviewProps {
  state: SortTransitionState
  setField: <K extends keyof SortTransitionState>(
    key: K,
    value: SortTransitionState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content, direction, isControlled, duration, easing } = state
  const draggableItems = generateSortableItemsCode({
    state,
    defaultState: DEFAULT_SORT_TRANSITION,
    isInline: true,
  })
  const code = generateSortableUsageCode({
    children: [draggableItems],
    isControlled,
    count,
  })

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoBackground className={direction}>
          {Array.from({ length: count }, (_, i) => i + 1).map((i, index) => (
            <Sortable
              key={i}
              id={String(i)}
              index={index}
              duration={duration}
              easing={easing}
            >
              {content}
            </Sortable>
          ))}
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
          <CustomCombobox
            label="Direction"
            options={directionOptions}
            value={direction}
            setValue={(value) => setField("direction", value)}
          />
          <CustomSwitch
            label="Controlled sortable list"
            value={isControlled}
            setValue={(value) => setField("isControlled", value)}
          />
          <RulerSlider
            label="Animation duration (ms)"
            value={duration}
            onValueChange={(value) => setField("duration", value)}
            min={0}
            max={3000}
            step={50}
          />
          <CustomCombobox
            label="Animation easing"
            options={[
              "cubic-bezier(0.25, 1, 0.5, 1)",
              "ease",
              "ease-in-out",
              "linear",
            ].map((value) => ({ value, label: value }))}
            value={easing}
            setValue={(value) => setField("easing", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
