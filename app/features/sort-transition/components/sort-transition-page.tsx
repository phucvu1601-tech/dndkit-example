import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface SortTransitionState {
  count: number
  content: string
  direction: string
  isControlled: boolean
  duration: number
  easing: string
}

export const DEFAULT_SORT_TRANSITION: SortTransitionState = {
  count: 1,
  content: "",
  direction: "flex",
  isControlled: false,
  duration: 300,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
}

export default function SortTransitionPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SortTransitionState>(() =>
    initStateFromParams(searchParams, DEFAULT_SORT_TRANSITION),
  )

  const setField = <K extends keyof SortTransitionState>(
    key: K,
    value: SortTransitionState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_SORT_TRANSITION,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_SORT_TRANSITION)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Sortable transition"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
