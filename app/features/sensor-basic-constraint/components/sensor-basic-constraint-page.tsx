import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import type { SensorBasicConstraintState } from "@/features/sensor-basic-constraint/types/sensor-basic-constraint.type"
import { DemoPage } from "@/shared/components/container/demo-page"
import Code from "./code"
import Preview from "./preview"

export const DEFAULT_STATE: SensorBasicConstraintState = {
  count: 1,
  content: "",
  delay: 2000,
  tolerance: 200,
  distance: 400,
}

export default function SensorBasicConstraintPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SensorBasicConstraintState>(() => ({
    count: Number(searchParams.get("count")) || DEFAULT_STATE.count,
    content: searchParams.get("content") || DEFAULT_STATE.content,
    delay: Number(searchParams.get("delay")) || DEFAULT_STATE.delay,
    tolerance: Number(searchParams.get("tolerance")) || DEFAULT_STATE.tolerance,
    distance: Number(searchParams.get("distance")) || DEFAULT_STATE.distance,
  }))

  const setField = <K extends keyof SensorBasicConstraintState>(
    key: K,
    value: SensorBasicConstraintState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (state.count !== 1) params.set("count", String(state.count))
    else params.delete("count")

    if (state.content) params.set("content", state.content)
    else params.delete("content")

    if (state.delay !== 2000) params.set("delay", String(state.delay))
    else params.delete("delay")

    if (state.tolerance !== 200)
      params.set("tolerance", String(state.tolerance))
    else params.delete("tolerance")

    if (state.distance !== 400) params.set("distance", String(state.distance))
    else params.delete("distance")

    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_STATE)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Sensor basic constraint"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
