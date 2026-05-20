import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import type { ModifierBasicState } from "@/features/modifier-basic/types/modifier-basic.type"
import { DemoPage } from "@/shared/components/container/demo-page"
import { getBooleanSearchParam } from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

const DEFAULT_STATE: ModifierBasicState = {
  count: 1,
  content: "",
  hasRestrictVertical: false,
  hasRestrictHorizontal: false,
  hasRestrictWindow: false,
}

export default function ModifierBasicPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<ModifierBasicState>(() => ({
    count: Number(searchParams.get("count")) || 1,
    content: searchParams.get("content") || "",
    hasRestrictVertical: getBooleanSearchParam({
      value: searchParams.get("hasRestrictVertical"),
      defaultValue: DEFAULT_STATE.hasRestrictVertical,
    }),
    hasRestrictHorizontal: getBooleanSearchParam({
      value: searchParams.get("hasRestrictHorizontal"),
      defaultValue: DEFAULT_STATE.hasRestrictHorizontal,
    }),
    hasRestrictWindow: getBooleanSearchParam({
      value: searchParams.get("hasRestrictWindow"),
      defaultValue: DEFAULT_STATE.hasRestrictWindow,
    }),
  }))

  const setField = <K extends keyof ModifierBasicState>(
    key: K,
    value: ModifierBasicState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    if (state.hasRestrictVertical) params.set("hasRestrictVertical", "true")
    else params.delete("hasRestrictVertical")

    if (state.hasRestrictHorizontal) params.set("hasRestrictHorizontal", "true")
    else params.delete("hasRestrictHorizontal")

    if (state.hasRestrictWindow) params.set("hasRestrictWindow", "true")
    else params.delete("hasRestrictWindow")

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
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
