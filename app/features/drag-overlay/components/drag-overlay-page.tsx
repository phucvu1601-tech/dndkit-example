import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import Code from "./code"
import Preview from "./preview"

export interface DragOverlayState {
  count: number
  content: string
  draggingOpacity: number
  hasOverlay: boolean
  overlayContent: string
  hasSource: boolean
}

const DEFAULT_STATE: DragOverlayState = {
  count: 1,
  content: "",
  draggingOpacity: 100,
  hasOverlay: true,
  overlayContent: "Draggable",
  hasSource: false,
}

export default function DragOverlayPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DragOverlayState>(() => ({
    count: Number(searchParams.get("count")) || 1,
    content: searchParams.get("content") || "",
    draggingOpacity: Number(searchParams.get("draggingOpacity") || 100),
    hasOverlay: searchParams.get("hasOverlay") !== "false",
    overlayContent: searchParams.get("overlayContent") || "Draggable",
    hasSource: searchParams.get("hasSource") === "true",
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

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
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
