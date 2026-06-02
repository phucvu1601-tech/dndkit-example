import {
  DEFAULT_SORT_BASIC,
  type SortBasicState,
} from "@/features/sort-basic/components/sort-basic-page"
import { Sortable } from "@/features/sort-basic/components/sortable"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import {
  generateSortableItemsCode,
  generateSortableUsageCode,
} from "@/shared/lib/code-generator"

interface PreviewProps {
  state: SortBasicState
  setField: <K extends keyof SortBasicState>(
    key: K,
    value: SortBasicState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, content } = state
  const draggableItems = generateSortableItemsCode({
    state,
    defaultState: DEFAULT_SORT_BASIC,
    isInline: true,
  })
  const code = generateSortableUsageCode([draggableItems])

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoBackground className="grid grid-cols-10">
          {Array.from({ length: count }, (_, i) => i + 1).map((i, index) => (
            <Sortable key={i} id={String(i)} index={index}>
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
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
