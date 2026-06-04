import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface MultiAdvanceState {
  count: number
  direction: string
}

export const DEFAULT_MULTI_ADVANCE: MultiAdvanceState = {
  count: 1,
  direction: "flex flex-wrap",
}

export default function MultiAdvancePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<MultiAdvanceState>(() =>
    initStateFromParams(searchParams, DEFAULT_MULTI_ADVANCE),
  )

  const setField = <K extends keyof MultiAdvanceState>(
    key: K,
    value: MultiAdvanceState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_MULTI_ADVANCE,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_MULTI_ADVANCE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Multiple lists advance"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
