import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface MultiBasicState {
  count: number
  direction: string
}

export const DEFAULT_MULTI_BASIC: MultiBasicState = {
  count: 1,
  direction: "flex",
}

export default function MultiBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<MultiBasicState>(() =>
    initStateFromParams(searchParams, DEFAULT_MULTI_BASIC),
  )

  const setField = <K extends keyof MultiBasicState>(
    key: K,
    value: MultiBasicState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_MULTI_BASIC,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_MULTI_BASIC)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Multiple lists basic"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
