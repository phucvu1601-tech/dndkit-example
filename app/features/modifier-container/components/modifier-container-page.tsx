import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import { getBooleanSearchParam } from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface ModifierContainerState {
  count: number
  content: string
  hasRestrictParent: boolean
}

const DEFAULT_STATE: ModifierContainerState = {
  count: 1,
  content: "",
  hasRestrictParent: false,
}

export default function ModifierContainerPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<ModifierContainerState>(() => ({
    count: Number(searchParams.get("count")) || 1,
    content: searchParams.get("content") || "",
    hasRestrictParent: getBooleanSearchParam({
      value: searchParams.get("hasRestrictParent"),
      defaultValue: DEFAULT_STATE.hasRestrictParent,
    }),
  }))

  const setField = <K extends keyof ModifierContainerState>(
    key: K,
    value: ModifierContainerState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    if (state.hasRestrictParent) params.set("hasRestrictParent", "true")
    else params.delete("hasRestrictParent")

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
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
