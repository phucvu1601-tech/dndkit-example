export const initStateFromParams = <
  T extends Record<keyof T, string | number | boolean>,
>(
  searchParams: URLSearchParams,
  defaultState: T,
): T => {
  return (Object.keys(defaultState) as (keyof T & string)[]).reduce(
    (acc, key) => {
      const value = searchParams.get(key)
      const defaultValue = defaultState[key]

      if (typeof defaultValue === "boolean") {
        acc[key] = (
          defaultValue ? value !== "false" : value === "true"
        ) as T[typeof key]
      } else if (typeof defaultValue === "number") {
        acc[key] = (Number(value) || defaultValue) as T[typeof key]
      } else {
        acc[key] = (value || defaultValue) as T[typeof key]
      }

      return acc
    },
    {} as T,
  )
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
