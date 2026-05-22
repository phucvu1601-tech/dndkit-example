import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import { DemoPage } from "@/shared/components/container/demo-page"
import {
  initStateFromParams,
  syncParamsWithState,
} from "@/shared/lib/search-params"
import Code from "./code"
import Preview from "./preview"

export interface SensorBasicConstraintState {
  count: number
  content: string
  delay: number
  tolerance: number
  distance: number
}

export const DEFAULT_SENSOR_BASIC_CONSTRAINT: SensorBasicConstraintState = {
  count: 1,
  content: "",
  delay: 2000,
  tolerance: 200,
  distance: 400,
}

export default function SensorBasicConstraintPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [state, setState] = useState<SensorBasicConstraintState>(() =>
    initStateFromParams(searchParams, DEFAULT_SENSOR_BASIC_CONSTRAINT),
  )

  const setField = <K extends keyof SensorBasicConstraintState>(
    key: K,
    value: SensorBasicConstraintState[K],
  ) => setState((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    syncParamsWithState({
      state,
      params,
      defaultState: DEFAULT_SENSOR_BASIC_CONSTRAINT,
    })
    setSearchParams(params, { replace: true, preventScrollReset: true })
  }, [state, searchParams, setSearchParams])

  const handleReset = () => {
    setState(DEFAULT_SENSOR_BASIC_CONSTRAINT)
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
