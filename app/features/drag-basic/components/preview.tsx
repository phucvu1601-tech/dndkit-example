import { type SetStateAction } from "react"
import { Draggable } from "@/features/drag-basic/components/draggable"
import { CodeBlock } from "@/shared/components/background/code-block"
import DemoBackground from "@/shared/components/background/demo-background"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import Section from "@/shared/components/custom/section"

interface PreviewProps {
  count: number
  setCount: React.Dispatch<SetStateAction<number>>
  content: string
  setContent: React.Dispatch<SetStateAction<string>>
}

export default function Preview({
  count,
  setCount,
  content,
  setContent,
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
    <div className="flex flex-col gap-8">
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
        <div className="grid lg:grid-cols-2 gap-4">
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
    </div>
  )
}
