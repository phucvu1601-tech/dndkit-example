import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface DropDetectorState {
  dropCount: number
  collisionDetector: string
}

export const DEFAULT_DROP_DETECTOR: DropDetectorState = {
  dropCount: 1,
  collisionDetector: "defaultCollisionDetection",
}

export default function DropDetectorPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DropDetectorState>(() =>
    initStateFromParams(searchParams, DEFAULT_DROP_DETECTOR),
  )

  const setField = <K extends keyof DropDetectorState>(
    key: K,
    value: DropDetectorState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_DROP_DETECTOR,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_DROP_DETECTOR)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Droppable detector"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
