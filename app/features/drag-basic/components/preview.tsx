import { type SetStateAction } from "react"
import { Draggable } from "@/features/drag-basic/components/draggable"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import Section from "@/shared/components/custom/section"

interface PreviewProps {
  count: number
  setCount: React.Dispatch<SetStateAction<number>>
  content: string
  setContent: React.Dispatch<SetStateAction<string>>
  layout: GridLayout
}

export default function Preview({
  count,
  setCount,
  content,
  setContent,
  layout,
}: PreviewProps) {
  const draggables = Array.from(
    { length: count },
    (_, i) =>
      `<Draggable id="${i + 1}"${content ? `>${content}</Draggable>` : "/>"}`,
  ).join("\n  ")
  const code = `import { DragDropProvider } from "@dnd-kit/react"
import { Draggable } from "./draggable"

<DragDropProvider>
  ${draggables}
</DragDropProvider>
`

  return (
    <Grid layout={layout} className="gap-8">
      <Section label="Display">
        <DemoBackground>
          {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
            <Draggable key={i + 1} id={String(i + 1)}>
              {content}
            </Draggable>
          ))}
        </DemoBackground>
      </Section>
      <Section label="Customize">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-4">
          <Count
            label="Items count"
            value={count}
            setValue={setCount}
            minValue={1}
          />
          <CustomInput
            label="Children content"
            value={content}
            setValue={setContent}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
