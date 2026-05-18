interface DragOverlayConfig {
  hasDropAnimation: boolean
  dropAnimationDuration: number
  dropAnimationEasing: string
  hasOverlay: boolean
  hasSource: boolean
  overlayContent: string
}

export const generateDragOverlay = ({
  hasDropAnimation,
  dropAnimationDuration = 250,
  dropAnimationEasing = "ease",
  hasOverlay = true,
  hasSource = false,
  overlayContent = "Default content",
}: DragOverlayConfig): string => {
  const className = `className="fixed -z-50 w-200"`

  let dropAnimationProp = ""
  if (!hasDropAnimation) {
    dropAnimationProp = `dropAnimation={null}`
  } else if (dropAnimationDuration !== 250 || dropAnimationEasing !== "ease") {
    dropAnimationProp = `dropAnimation={{ duration: ${dropAnimationDuration}, easing: "${dropAnimationEasing}" }}`
  }

  const disableProp = hasOverlay ? "" : "disable"

  // Available props
  const propsList = [className, dropAnimationProp, disableProp].filter(Boolean)

  // Format props
  let propsContent: string
  if (propsList.length === 0) {
    propsContent = ">"
  } else if (propsList.length === 1) {
    propsContent = ` ${propsList[0]}>`
  } else {
    propsContent = `\n    ${propsList.join("\n    ")}\n  >`
  }

  // Children
  const children = hasSource
    ? `{(source) => (
      <div className="p-2 rounded-lg bg-foreground text-background w-full h-fit cursor-grab max-w-full wrap-break-word">
        Id: {source.id}
      </div>
    )}`
    : `<div className="p-2 rounded-lg bg-foreground text-background w-full h-fit cursor-grab max-w-full wrap-break-word">
      ${overlayContent}
    </div>`

  return `  <DragOverlay${propsContent}
    ${children}
  </DragOverlay>`
}
