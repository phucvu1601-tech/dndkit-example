import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import { getBooleanSearchParam } from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface DragHandleState {
  count: number
  content: string
  hasHandle: boolean
}

export const DEFAULT_DRAG_HANDLE: DragHandleState = {
  count: 1,
  content: "",
  hasHandle: true,
}

export default function DragHandlePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DragHandleState>(() => ({
    count: Number(searchParams.get("count")) || DEFAULT_DRAG_HANDLE.count,
    content: searchParams.get("content") || DEFAULT_DRAG_HANDLE.content,
    hasHandle: getBooleanSearchParam({
      value: searchParams.get("hasHandle"),
      defaultValue: DEFAULT_DRAG_HANDLE.hasHandle,
    }),
  }))
  const setField = <K extends keyof DragHandleState>(
    key: K,
    value: DragHandleState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    if (!state.hasHandle) params.set("hasHandle", "false")
    else params.delete("hasHandle")

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_DRAG_HANDLE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Draggable handle"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
