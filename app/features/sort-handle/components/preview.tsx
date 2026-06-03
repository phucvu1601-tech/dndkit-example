import {
  DEFAULT_SORT_HANDLE,
  type SortHandleState,
} from "@/features/sort-handle/components/sort-handle-page"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import { CustomCombobox } from "@/shared/components/custom/custom-combobox"
import CustomInput from "@/shared/components/custom/custom-input"
import CustomSwitch from "@/shared/components/custom/custom-switch"
import {
  generateSortableItemsCode,
  generateSortableUsageCode,
} from "@/shared/lib/code-generator"
import { Sortable } from "./sortable"

interface PreviewProps {
  state: SortHandleState
  setField: <K extends keyof SortHandleState>(
    key: K,
    value: SortHandleState[K],
  ) => void
  layout: GridLayout
}

const directionOptions = [
  { value: "flex", label: "vertical" },
  { value: "flex flex-col", label: "horizontal" },
  { value: "grid grid-cols-4", label: "grid 4 column" },
  { value: "grid grid-cols-10", label: "grid 10 column" },
]

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content, direction, isControlled, hasHandle } = state
  const draggableItems = generateSortableItemsCode({
    state,
    defaultState: DEFAULT_SORT_HANDLE,
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
              hasHandle={hasHandle}
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
