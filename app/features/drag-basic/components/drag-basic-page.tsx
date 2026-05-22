import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface DragBasicState {
  count: number
  content: string
}

export const DEFAULT_DRAG_BASIC: DragBasicState = {
  count: 1,
  content: "",
}

export default function DragBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DragBasicState>(() =>
    initStateFromParams(searchParams, DEFAULT_DRAG_BASIC),
  )

  const setField = <K extends keyof DragBasicState>(
    key: K,
    value: DragBasicState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_DRAG_BASIC,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_DRAG_BASIC)
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
