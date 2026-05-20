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
