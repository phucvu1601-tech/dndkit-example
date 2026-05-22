import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  getBooleanSearchParam,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface ModifierBasicState {
  count: number
  content: string
  restrictVertical: boolean
  restrictHorizontal: boolean
  restrictWindow: boolean
}

export const DEFAULT_MODIFIER_BASIC: ModifierBasicState = {
  count: 1,
  content: "",
  restrictVertical: false,
  restrictHorizontal: false,
  restrictWindow: false,
}

export default function ModifierBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<ModifierBasicState>(() => ({
    count: Number(searchParams.get("count")) || 1,
    content: searchParams.get("content") || "",
    restrictVertical: getBooleanSearchParam({
      value: searchParams.get("restrictVertical"),
      defaultValue: DEFAULT_MODIFIER_BASIC.restrictVertical,
    }),
    restrictHorizontal: getBooleanSearchParam({
      value: searchParams.get("restrictHorizontal"),
      defaultValue: DEFAULT_MODIFIER_BASIC.restrictHorizontal,
    }),
    restrictWindow: getBooleanSearchParam({
      value: searchParams.get("restrictWindow"),
      defaultValue: DEFAULT_MODIFIER_BASIC.restrictWindow,
    }),
  }))

  const setField = <K extends keyof ModifierBasicState>(
    key: K,
    value: ModifierBasicState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_MODIFIER_BASIC,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_MODIFIER_BASIC)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Modifier basic"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
