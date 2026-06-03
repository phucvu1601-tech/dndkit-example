import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/container/section"
import code from "./sortable.tsx?raw"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Note">
        <div className="text-xl">
          The useSortable hook combines the functionality of both useDraggable
          and useDroppable, so it accepts all the props supported by those
          hooks. Therefore, you can refer to the Draggable and Droppable
          components for the corresponding usage patterns.
        </div>
        <div className="text-xl">
          {"Reference: "}
          <a
            href={
              "https://main--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/docs/react-sortable--docs"
            }
            target="_blank"
            rel="noreferrer"
            className="underline hover:font-semibold"
          >
            Sortable docs
          </a>
        </div>
      </Section>
      <Section label="Install">
        <InstallBlock packages={"@dnd-kit/react"} />
      </Section>
      <Section label="Code">
        <CodeBlock code={code} fileName="sortable.tsx" />
      </Section>
    </div>
  )
}
