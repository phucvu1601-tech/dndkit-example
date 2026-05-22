import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import { getBooleanSearchParam } from "@/shared/lib/search-params"
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

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    if (state.restrictVertical) params.set("restrictVertical", "true")
    else params.delete("restrictVertical")

    if (state.restrictHorizontal) params.set("restrictHorizontal", "true")
    else params.delete("restrictHorizontal")

    if (state.restrictWindow) params.set("restrictWindow", "true")
    else params.delete("restrictWindow")

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
