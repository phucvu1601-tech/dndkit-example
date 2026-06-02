import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/container/section"
import draggableCode from "./draggable.tsx?raw"
import droppableCode from "./droppable.tsx?raw"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Install">
        <InstallBlock packages={"@dnd-kit/react"} />
      </Section>
      <Section label="Code">
        <CodeBlock code={draggableCode} fileName="draggable.tsx" />
        <CodeBlock code={droppableCode} fileName="droppable.tsx" />
      </Section>
    </div>
  )
}
