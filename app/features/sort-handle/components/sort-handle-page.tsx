import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface SortHandleState {
  count: number
  content: string
  direction: string
  isControlled: boolean
  hasHandle: boolean
}

export const DEFAULT_SORT_HANDLE: SortHandleState = {
  count: 1,
  content: "",
  direction: "flex",
  isControlled: false,
  hasHandle: true,
}

export default function SortHandlePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SortHandleState>(() =>
    initStateFromParams(searchParams, DEFAULT_SORT_HANDLE),
  )

  const setField = <K extends keyof SortHandleState>(
    key: K,
    value: SortHandleState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_SORT_HANDLE,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_SORT_HANDLE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Sortable handle"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
