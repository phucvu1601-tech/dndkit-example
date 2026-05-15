import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import Code from "./code"
import Preview from "./preview"

export interface DragGhostState {
  count: number
  content: string
  draggingOpacity: number
}

const DEFAULT_STATE: DragGhostState = {
  count: 1,
  content: "",
  draggingOpacity: 100,
}

export default function DragGhostPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DragGhostState>(() => ({
    count: Number(searchParams.get("count")) || 1,
    content: searchParams.get("content") || "",
    draggingOpacity: Number(searchParams.get("draggingOpacity") || 100),
  }))

  const setField = <K extends keyof DragGhostState>(
    key: K,
    value: DragGhostState[K],
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

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Draggable ghost"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
