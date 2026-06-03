import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface SortModifierState {
  count: number
  content: string
  direction: string
  isControlled: boolean
  restrictVertical: boolean
  restrictHorizontal: boolean
  restrictWindow: boolean
  restrictParent: boolean
}

export const DEFAULT_SORT_MODIFIER: SortModifierState = {
  count: 1,
  content: "",
  direction: "flex",
  isControlled: false,
  restrictVertical: false,
  restrictHorizontal: false,
  restrictWindow: false,
  restrictParent: false,
}

export default function SortModifierPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SortModifierState>(() =>
    initStateFromParams(searchParams, DEFAULT_SORT_MODIFIER),
  )

  const setField = <K extends keyof SortModifierState>(
    key: K,
    value: SortModifierState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_SORT_MODIFIER,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_SORT_MODIFIER)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Sortable modifier"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
