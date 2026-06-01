import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/container/section"
import code from "./draggable.tsx?raw"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Install">
        <InstallBlock packages={"@dnd-kit/react"} />
      </Section>
      <Section label="Code">
        <CodeBlock code={code} fileName="draggable.tsx" />
      </Section>
    </div>
  )
}
