export function getBooleanSearchParam({
  value,
  defaultValue,
}: {
  value: string | null
  defaultValue: boolean
}) {
  if (defaultValue) {
    return value !== "false"
  }

  return value === "true"
}

export const syncParamsWithState = <
  T extends Record<keyof T, string | number | boolean>,
>({
  params,
  state,
  defaultState,
}: {
  params: URLSearchParams
  state: T
  defaultState: T
}) => {
  ;(Object.keys(defaultState) as (keyof T)[]).forEach((key) => {
    const value = state[key]
    const defaultValue = defaultState[key]

    if (value !== defaultValue) params.set(key as string, String(value))
    else params.delete(key as string)
  })
}
