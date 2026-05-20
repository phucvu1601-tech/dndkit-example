import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import type { ModifierContainerState } from "@/features/modifier-grid/types/modifier-grid.type"
import { DemoPage } from "@/shared/components/container/demo-page"
import Code from "./code"
import Preview from "./preview"

const DEFAULT_STATE: ModifierContainerState = {
  count: 1,
  content: "",
  gridX: 20,
  gridY: 20,
}

export default function ModifierGridPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<ModifierContainerState>(() => ({
    count: Number(searchParams.get("count")) || DEFAULT_STATE.count,
    content: searchParams.get("content") || DEFAULT_STATE.content,
    gridX: Number(searchParams.get("gridX")) || DEFAULT_STATE.gridX,
    gridY: Number(searchParams.get("gridY")) || DEFAULT_STATE.gridY,
  }))

  const setField = <K extends keyof ModifierContainerState>(
    key: K,
    value: ModifierContainerState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    if (state.gridX !== 20) params.set("gridX", String(state.gridX))
    else params.delete("gridX")

    if (state.gridY !== 20) params.set("gridY", String(state.gridY))
    else params.delete("gridY")

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Modifier grid"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
