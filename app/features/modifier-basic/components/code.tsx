import code from "@/features/modifier-basic/components/draggable.tsx?raw"
import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/container/section"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Note">
        <div className="text-xl">
          Modifiers can be applied globally by passing them to the
          `DragDropProvider` component.
        </div>
        <div className="text-xl">
          In this example, the modifier is applied locally by passing it to the
          `modifiers` prop of an individual draggable element.
        </div>
        <div className="text-xl">
          {"Reference: "}
          <a
            href={
              "https://main--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/docs/react-draggable-modifiers--docs"
            }
            target="_blank"
            rel="noreferrer"
            className="underline hover:font-semibold"
          >
            Modifiers docs
          </a>
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
