import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface SortBasicState {
  count: number
  content: string
  direction: string
  isControlled: boolean
}

export const DEFAULT_SORT_BASIC: SortBasicState = {
  count: 1,
  content: "",
  direction: "flex",
  isControlled: false,
}

export default function SortBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SortBasicState>(() =>
    initStateFromParams(searchParams, DEFAULT_SORT_BASIC),
  )

  const setField = <K extends keyof SortBasicState>(
    key: K,
    value: SortBasicState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_SORT_BASIC,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_SORT_BASIC)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Sortable basic"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
