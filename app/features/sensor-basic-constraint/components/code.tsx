import code from "@/features/sensor-basic-constraint/components/draggable.tsx?raw"
import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/container/section"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Note">
        <div className="text-xl">
          The activationConstraints supports both `distance`` and `delay`
          constraints. They can be used together, and dragging starts as soon as
          either condition is met.
        </div>
        <div className="text-xl">
          In this example, we use `useRef` together with a function passed to
          `activationConstraints` to keep the constraint values (`delay`,
          `tolerance`, `distance`) in sync with the props on every render. This
          is necessary when you want the constraints to update dynamically as
          the props change. If you don't need dynamic updates, you can skip
          `useRef` and pass a static array of constraints directly to
          `activationConstraints`.
        </div>
        <div className="text-xl">
          {"Reference: "}
          <a
            href={
              "https://main--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/docs/react-draggable-sensors--docs"
            }
            target="_blank"
            rel="noreferrer"
            className="underline hover:font-semibold"
          >
            Sensors docs
          </a>
        </div>
        <div className="text-xl">
          Set CSS `touchAction: "none"` to disable the browser's default touch
          scrolling so the PointerSensor can reliably handle touch events and
          apply activation constraints correctly.
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
