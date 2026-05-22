import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface ModifierContainerState {
  count: number
  content: string
  restrictParent: boolean
}

export const DEFAULT_MODIFIER_CONTAINER: ModifierContainerState = {
  count: 1,
  content: "",
  restrictParent: false,
}

export default function ModifierContainerPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<ModifierContainerState>(() =>
    initStateFromParams(searchParams, DEFAULT_MODIFIER_CONTAINER),
  )

  const setField = <K extends keyof ModifierContainerState>(
    key: K,
    value: ModifierContainerState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_MODIFIER_CONTAINER,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_MODIFIER_CONTAINER)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Modifier container"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
