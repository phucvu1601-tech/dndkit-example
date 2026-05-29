import { Link } from "react-router"
import code from "@/features/sensor-dynamic-constraint/components/draggable.tsx?raw"
import { CodeBlock } from "@/shared/components/container/code-block"
import { InstallBlock } from "@/shared/components/container/install-block"
import Section from "@/shared/components/container/section"

export default function Code() {
  return (
    <div className="flex flex-col gap-6">
      <Section label="Note">
        <div className="text-xl">
          <span>This example is similar to </span>
          <Link
            to="/sensor-basic-constraint"
            className="underline hover:font-semibold"
          >
            SensorBasicConstraint
          </Link>
          <span>
            , but uses a function with additional parameters to target specific
            elements. The constraints only apply on touch devices and only for
            the element with `id: 1`.
          </span>
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
