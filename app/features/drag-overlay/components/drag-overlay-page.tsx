import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import { getBooleanSearchParam } from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface DragOverlayState {
  count: number
  content: string
  draggingOpacity: number
  hasOverlay: boolean
  overlayContent: string
  hasSource: boolean
  hasDropAnimation: boolean
  dropAnimationDuration: number
  dropAnimationEasing: string
}

export const DEFAULT_DRAG_OVERLAY: DragOverlayState = {
  count: 1,
  content: "",
  draggingOpacity: 100,
  hasOverlay: true,
  overlayContent: "Draggable",
  hasSource: false,
  hasDropAnimation: true,
  dropAnimationDuration: 250,
  dropAnimationEasing: "ease",
}

export default function DragOverlayPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DragOverlayState>(() => ({
    count: Number(searchParams.get("count")) || DEFAULT_DRAG_OVERLAY.count,
    content: searchParams.get("content") || DEFAULT_DRAG_OVERLAY.content,
    draggingOpacity: Number(
      searchParams.get("draggingOpacity") ||
        DEFAULT_DRAG_OVERLAY.draggingOpacity,
    ),
    hasOverlay: getBooleanSearchParam({
      value: searchParams.get("hasOverlay"),
      defaultValue: DEFAULT_DRAG_OVERLAY.hasOverlay,
    }),
    overlayContent:
      searchParams.get("overlayContent") || DEFAULT_DRAG_OVERLAY.overlayContent,
    hasSource: getBooleanSearchParam({
      value: searchParams.get("hasSource"),
      defaultValue: DEFAULT_DRAG_OVERLAY.hasSource,
    }),
    hasDropAnimation: getBooleanSearchParam({
      value: searchParams.get("hasDropAnimation"),
      defaultValue: DEFAULT_DRAG_OVERLAY.hasDropAnimation,
    }),
    dropAnimationDuration: Number(
      searchParams.get("dropAnimationDuration") ||
        DEFAULT_DRAG_OVERLAY.dropAnimationDuration,
    ),
    dropAnimationEasing:
      searchParams.get("dropAnimationEasing") ||
      DEFAULT_DRAG_OVERLAY.dropAnimationEasing,
  }))

  const setField = <K extends keyof DragOverlayState>(
    key: K,
    value: DragOverlayState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    if (state.draggingOpacity !== 100)
      params.set("draggingOpacity", String(state.draggingOpacity))
    else params.delete("draggingOpacity")

    if (!state.hasOverlay) params.set("hasOverlay", "false")
    else params.delete("hasOverlay")

    if (state.overlayContent !== "Draggable")
      params.set("overlayContent", state.overlayContent)
    else params.delete("overlayContent")

    if (state.hasSource) params.set("hasSource", "true")
    else params.delete("hasSource")

    if (!state.hasDropAnimation) params.set("hasDropAnimation", "false")
    else params.delete("hasDropAnimation")

    if (state.dropAnimationDuration !== 250)
      params.set("dropAnimationDuration", String(state.dropAnimationDuration))
    else params.delete("dropAnimationDuration")

    if (state.dropAnimationEasing !== "ease")
      params.set("dropAnimationEasing", state.dropAnimationEasing)
    else params.delete("dropAnimationEasing")

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_DRAG_OVERLAY)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Draggable overlay"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
