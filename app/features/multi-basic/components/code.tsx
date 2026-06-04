import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/container/section"
import droppableCode from "./droppable.tsx?raw"
import sortableCode from "./sortable.tsx?raw"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Install">
        <InstallBlock packages={"@dnd-kit/react"} />
      </Section>
      <Section label="Code">
        <CodeBlock code={sortableCode} fileName="sortable.tsx" />
        <CodeBlock code={droppableCode} fileName="droppable.tsx" />
      </Section>
    </div>
  )
}
