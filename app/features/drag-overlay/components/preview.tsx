import { DragDropProvider, DragOverlay } from "@dnd-kit/react"
import { Draggable } from "@/features/drag-ghost/components/draggable"
import {
  DEFAULT_DRAG_OVERLAY,
  type DragOverlayState,
} from "@/features/drag-overlay/components/drag-overlay-page"
import { generateDragOverlay } from "@/features/drag-overlay/libs/code-generator"
import { CodeBlock } from "@/shared/components/container/code-block"
import DemoBackground from "@/shared/components/container/demo-background"
import Grid, { type GridLayout } from "@/shared/components/container/grid"
import Section from "@/shared/components/container/section"
import Count from "@/shared/components/custom/count"
import { CustomCombobox } from "@/shared/components/custom/custom-combobox"
import CustomInput from "@/shared/components/custom/custom-input"
import CustomSwitch from "@/shared/components/custom/custom-switch"
import { RulerSlider } from "@/shared/components/custom/ruler-slider"
import {
  generateDraggableItemsCode,
  generateDraggableUsageCode,
} from "@/shared/lib/code-generator"

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
    hasDropAnimation,
    dropAnimationDuration,
    dropAnimationEasing,
  } = state
  const draggableItems = generateDraggableItemsCode({
    state,
    defaultState: DEFAULT_DRAG_OVERLAY,
    excludedKeys: new Set<keyof DragOverlayState>([
      "count",
      "content",
      "hasOverlay",
      "overlayContent",
      "hasSource",
      "hasDropAnimation",
      "dropAnimationDuration",
      "dropAnimationEasing",
    ]),
    isInline: true,
  })
  const dragOverlay = generateDragOverlay({
    hasDropAnimation,
    dropAnimationDuration,
    dropAnimationEasing,
    hasOverlay,
    hasSource,
    overlayContent,
  })
  const code = generateDraggableUsageCode([draggableItems, dragOverlay])

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
            <DragOverlay
              className="fixed -z-50 w-200"
              disabled={!hasOverlay}
              dropAnimation={
                hasDropAnimation
                  ? {
                      duration: dropAnimationDuration,
                      easing: dropAnimationEasing,
                    }
                  : null
              }
            >
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
            label="Dragging opacity (%)"
            value={draggingOpacity}
            onValueChange={(value) => setField("draggingOpacity", value)}
          />
          <CustomSwitch
            label="Enable overlay"
            value={hasOverlay}
            setValue={(value) => setField("hasOverlay", value)}
          />
          <CustomInput
            label="Overlay content"
            value={overlayContent}
            setValue={(value) => setField("overlayContent", value)}
            disabled={!hasOverlay || hasSource}
          />
          <CustomSwitch
            label="Overlay by source"
            value={hasSource}
            setValue={(value) => setField("hasSource", value)}
            disabled={!hasOverlay}
          />
          <CustomSwitch
            label="Has drop animation"
            value={hasDropAnimation}
            setValue={(value) => setField("hasDropAnimation", value)}
          />
          <RulerSlider
            label="Drop animation duration (ms)"
            value={dropAnimationDuration}
            onValueChange={(value) => setField("dropAnimationDuration", value)}
            min={50}
            max={3000}
            step={50}
            disabled={!hasDropAnimation}
          />
          <CustomCombobox
            label="Drop animation easing"
            options={["ease", "linear", "ease-in", "ease-out", "ease-in-out"]}
            value={dropAnimationEasing}
            setValue={(value) => setField("dropAnimationEasing", value)}
            disabled={!hasDropAnimation}
          />
        </div>
      </Section>
      <Section label="Usage">
        <CodeBlock code={code} />
      </Section>
    </Grid>
  )
}
