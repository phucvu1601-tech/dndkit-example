import { move } from "@dnd-kit/helpers"
import { DragDropProvider } from "@dnd-kit/react"
import { useEffect, useState } from "react"
import type { MultiAdvanceState } from "@/features/multi-advance/components/multi-advance-page"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import { CustomCombobox } from "@/shared/components/custom/custom-combobox"
import { multiDirectionOptions } from "@/shared/constants/sort.constant"
import { generateMultiUsageCode } from "@/shared/lib/code-generator"
import { cn } from "@/shared/lib/utils"
import { Sortable } from "./sortable"
import { SortableContainer } from "./sortable-container"

interface PreviewProps {
  state: MultiAdvanceState
  setField: <K extends keyof MultiAdvanceState>(
    key: K,
    value: MultiAdvanceState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const { count, direction } = state
  const [items, setItems] = useState({
    A: Array.from({ length: count }, (_, i) => `A${i + 1}`),
    B: ["B1", "B2"],
    C: ["C1", "C2", "C3"],
    D: [],
  })
  useEffect(() => {
    setItems((prev) => {
      const allItems = Object.values(prev).flat()
      const maxNum = allItems
        .filter((id) => id.startsWith("A"))
        .map((id) => parseInt(id.slice(1), 10))
        .reduce((max, n) => Math.max(max, n), 0)
      if (count === maxNum) return prev
      if (count > maxNum) {
        // Add item for column A
        const newItems = Array.from(
          { length: count - maxNum },
          (_, i) => `A${maxNum + i + 1}`,
        )
        return { ...prev, A: [...prev.A, ...newItems] }
      }
      // Remove item from maxNum down to count
      const toRemove = new Set(
        Array.from({ length: maxNum - count }, (_, i) => `A${maxNum - i}`),
      )
      return Object.fromEntries(
        Object.entries(prev).map(([col, ids]) => [
          col,
          ids.filter((id) => !toRemove.has(id)),
        ]),
      ) as typeof prev
    })
  }, [count])
  const code = generateMultiUsageCode(state)

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoBackground>
          <DragDropProvider
            onDragOver={(event) => {
              setItems((items) => move(items, event))
            }}
          >
            <div className={cn(direction, "gap-4")}>
              {Object.entries(items).map(([column, items], index) => (
                <SortableContainer key={column} id={column} index={index}>
                  {items.map((id, index) => (
                    <Sortable key={id} id={id} index={index} />
                  ))}
                </SortableContainer>
              ))}
            </div>
          </DragDropProvider>
        </DemoBackground>
      </Section>
      <Section label="Customize">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-4">
          <Count
            label="A items count"
            value={count}
            setValue={(value) => setField("count", value)}
            minValue={1}
          />
          <CustomCombobox
            label="Direction"
            options={multiDirectionOptions}
            value={direction}
            setValue={(value) => setField("direction", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
