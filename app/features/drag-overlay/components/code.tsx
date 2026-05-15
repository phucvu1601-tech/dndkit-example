import { Link } from "react-router"
import code from "@/features/drag-ghost/components/draggable.tsx?raw"
import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/custom/section"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Note">
        <div className="text-xl">
          The difference with drag overlay is that it uses the DragOverlay
          component inside DragDropProvider. Check the usage code in the preview
          to see how it works. For the component code, you can use any Draggable
          component
        </div>
        <div className="text-xl">
          {"In this example, I’m using the Draggable component from "}
          <Link to={"/drag-ghost"} className="underline hover:font-semibold">
            Drag ghost
          </Link>
        </div>
      </Section>
      <Section label="Install">
        <InstallBlock packages={"@dnd-kit/react"} />
      </Section>
      <Section label="Code">
        <CodeBlock code={code} fileName="draggable.tsx" />
      </Section>
    </div>
  )
}
