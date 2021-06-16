const toDisplayList = (obj, excluded = []) => {
  const defaultexcluded = ["id", "labels", "created_at", "last_updated_at"]
  const _excluded = [...defaultexcluded, ...excluded]
  const labels = obj.labels

  return Object.entries(obj)
    .filter(([key, value]) => !!value)
    .filter(
      ([key, value]) =>
        key !== "labels" && Object.keys(obj.labels).includes(key)
    )
    .reduce((acc, [entryName, entryObj], i) => {
      let value = entryObj
      let key = labels[entryName]

      if (typeof value === "object" && value !== null) {
        value = entryObj.display_name
      }

      if (_excluded.includes(entryName) || !value || !key) return acc

      acc.push({ key: key, value: value })
      return acc
    }, [])
}
export default toDisplayList
