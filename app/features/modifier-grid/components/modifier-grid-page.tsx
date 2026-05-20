import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import Code from "./code"
import Preview from "./preview"

export interface ModifierContainerState {
  count: number
  content: string
}

const DEFAULT_STATE: ModifierContainerState = {
  count: 1,
  content: "",
}

export default function ModifierGridPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<ModifierContainerState>(() => ({
    count: Number(searchParams.get("count")) || 1,
    content: searchParams.get("content") || "",
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

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Modifier grid"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
