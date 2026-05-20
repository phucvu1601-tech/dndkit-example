import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import type { DragBasicState } from "@/features/drag-basic/types/drag-basic.type"
import { DemoPage } from "@/shared/components/container/demo-page"
import Code from "./code"
import Preview from "./preview"

const DEFAULT_STATE: DragBasicState = {
  count: 1,
  content: "",
}

export default function DragBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DragBasicState>(() => ({
    count: Number(searchParams.get("count")) || DEFAULT_STATE.count,
    content: searchParams.get("content") || DEFAULT_STATE.content,
  }))

  const setField = <K extends keyof DragBasicState>(
    key: K,
    value: DragBasicState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Draggable basic"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
