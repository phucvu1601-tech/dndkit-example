import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface DropBasicState {
  count: number
  content: string
}

export const DEFAULT_DROP_BASIC: DropBasicState = {
  count: 1,
  content: "",
}

export default function DropBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<DropBasicState>(() =>
    initStateFromParams(searchParams, DEFAULT_DROP_BASIC),
  )

  const setField = <K extends keyof DropBasicState>(
    key: K,
    value: DropBasicState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_DROP_BASIC,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_DROP_BASIC)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Droppable basic"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
