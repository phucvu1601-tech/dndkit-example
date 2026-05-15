import { DragDropProvider, DragOverlay } from "@dnd-kit/react"
import { Draggable } from "@/features/drag-ghost/components/draggable"
import type { DragOverlayState } from "@/features/drag-overlay/components/drag-overlay-page"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Count from "@/shared/components/custom/count"
import CustomInput from "@/shared/components/custom/custom-input"
import CustomSwitch from "@/shared/components/custom/custom-switch"
import { RulerSlider } from "@/shared/components/custom/ruler-slider"
import Section from "@/shared/components/custom/section"

interface PreviewProps {
  state: DragOverlayState
  setField: <K extends keyof DragOverlayState>(
    key: K,
    value: DragOverlayState[K],
  ) => void
  layout: GridLayout
}

export default function Preview({ state, setField, layout }: PreviewProps) {
  const {
    count,
    content,
    draggingOpacity,
    hasOverlay,
    overlayContent,
    hasSource,
  } = state
  const draggables = Array.from(
    { length: count },
    (_, i) =>
      `<Draggable id="${i + 1}"${draggingOpacity === 100 ? "" : ` draggingOpacity={${draggingOpacity}}`}${content ? `>${content}</Draggable>` : "/>"}`,
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
          <DragDropProvider>
            {Array.from({ length: count }, (_, index) => index).map((i) => (
              <Draggable
                key={i + 1}
                id={String(i + 1)}
                draggingOpacity={draggingOpacity}
              >
                {content}
              </Draggable>
            ))}
            <DragOverlay className="fixed -z-50 w-200" disabled={!hasOverlay}>
              {(source) => (
                <div className="p-2 rounded-lg bg-foreground text-background w-full h-fit cursor-grab max-w-full wrap-break-word">
                  {hasSource ? `Id: ${source.id}` : overlayContent}
                </div>
              )}
            </DragOverlay>
          </DragDropProvider>
        </DemoBackground>
      </Section>
      <Section label="Customize">
        <div className="grid grid-cols-1 @lg:grid-cols-2 @4xl:grid-cols-3 gap-4">
          <Count
            label="Items count"
            value={count}
            setValue={(value) => setField("count", value)}
            minValue={1}
          />
          <CustomInput
            label="Children content"
            value={content}
            setValue={(value) => setField("content", value)}
          />
          <RulerSlider
            label="Dragging opacity"
            value={draggingOpacity}
            onValueChange={(value) => setField("draggingOpacity", value)}
          />
          <CustomSwitch
            label="Has overlay"
            value={hasOverlay}
            setValue={(value) => setField("hasOverlay", value)}
          />
          <CustomInput
            label="Overlay content"
            value={overlayContent}
            setValue={(value) => setField("overlayContent", value)}
          />
          <CustomSwitch
            label="Overlay by source"
            value={hasSource}
            setValue={(value) => setField("hasSource", value)}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
