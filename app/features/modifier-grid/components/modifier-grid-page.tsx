import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import { syncParamsWithState } from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface ModifierGridState {
  count: number
  content: string
  gridX: number
  gridY: number
}

export const DEFAULT_MODIFIER_GRID: ModifierGridState = {
  count: 1,
  content: "",
  gridX: 20,
  gridY: 20,
}

export default function ModifierGridPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<ModifierGridState>(() => ({
    count: Number(searchParams.get("count")) || DEFAULT_MODIFIER_GRID.count,
    content: searchParams.get("content") || DEFAULT_MODIFIER_GRID.content,
    gridX: Number(searchParams.get("gridX")) || DEFAULT_MODIFIER_GRID.gridX,
    gridY: Number(searchParams.get("gridY")) || DEFAULT_MODIFIER_GRID.gridY,
  }))

  const setField = <K extends keyof ModifierGridState>(
    key: K,
    value: ModifierGridState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_MODIFIER_GRID,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_MODIFIER_GRID)
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
