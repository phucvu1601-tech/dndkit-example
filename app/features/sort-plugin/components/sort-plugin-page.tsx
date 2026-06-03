import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface SortPluginState {
  count: number
  content: string
  direction: string
  isControlled: boolean
  draggingOpacity: number
  hasClone: boolean
}

export const DEFAULT_SORT_PLUGIN: SortPluginState = {
  count: 1,
  content: "",
  direction: "flex",
  isControlled: false,
  draggingOpacity: 100,
  hasClone: false,
}

export default function SortPluginPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SortPluginState>(() =>
    initStateFromParams(searchParams, DEFAULT_SORT_PLUGIN),
  )

  const setField = <K extends keyof SortPluginState>(
    key: K,
    value: SortPluginState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_SORT_PLUGIN,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_SORT_PLUGIN)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Sortable plugin"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
