import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface SensorDynamicConstraintState {
  count: number
  content: string
  delay: number
  tolerance: number
  distance: number
}

export const DEFAULT_SENSOR_DYNAMIC_CONSTRAINT: SensorDynamicConstraintState = {
  count: 1,
  content: "",
  delay: 2000,
  tolerance: 200,
  distance: 400,
}

export default function SensorDynamicConstraintPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SensorDynamicConstraintState>(() =>
    initStateFromParams(searchParams, DEFAULT_SENSOR_DYNAMIC_CONSTRAINT),
  )

  const setField = <K extends keyof SensorDynamicConstraintState>(
    key: K,
    value: SensorDynamicConstraintState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_SENSOR_DYNAMIC_CONSTRAINT,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_SENSOR_DYNAMIC_CONSTRAINT)
    setSearchParams({}, { replace: true, preventScrollReset: true })
  }

  return (
    <DemoPage
      title="Sensor dynamic constraint"
      hasChanges={searchParams.size !== 0}
      onReset={handleReset}
      renderPreview={(layout) => (
        <Preview state={state} setField={setField} layout={layout} />
      )}
      renderCode={() => <Code />}
    />
  )
}
