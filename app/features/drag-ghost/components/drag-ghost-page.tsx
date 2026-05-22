import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface DragGhostState {
  count: number
  content: string
  draggingOpacity: number
}

export const DEFAULT_DRAG_GHOST: DragGhostState = {
  count: 1,
  content: "",
  draggingOpacity: 100,
}

export default function DragGhostPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DragGhostState>(() =>
    initStateFromParams(searchParams, DEFAULT_DRAG_GHOST),
  )

  const setField = <K extends keyof DragGhostState>(
    key: K,
    value: DragGhostState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_DRAG_GHOST,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_DRAG_GHOST)
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
