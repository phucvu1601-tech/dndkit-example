import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import { getBooleanSearchParam } from "@/shared/lib/search-params"
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
  const [state, setState] = useState<ModifierContainerState>(() => ({
    count: Number(searchParams.get("count")) || 1,
    content: searchParams.get("content") || "",
    restrictParent: getBooleanSearchParam({
      value: searchParams.get("restrictParent"),
      defaultValue: DEFAULT_MODIFIER_CONTAINER.restrictParent,
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

    if (state.restrictParent) params.set("restrictParent", "true")
    else params.delete("restrictParent")

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
