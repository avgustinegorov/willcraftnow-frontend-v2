export const toCapitalCase = value => {
  return value
    ? value
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    : null
}

export const toTitleCase = value => {
  return value
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ")
}

export const toOptionalTitleCase = value => {
  return value
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ")
}

export const isEmpty = value => {
  return value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
    ? true
    : false
}

export const isNotEmpty = value => {
  return value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
    ? false
    : true
}

export const deepCopy = value => {
  if (value !== undefined) {
    return JSON.parse(JSON.stringify(value))
  } else {
    return value
  }
}

export const isObject = val => {
  if (val === null) {
    return false
  }
  return typeof val === "function" || typeof val === "object"
}

export const get_display_value = (dict, field) => {
  const entry = dict[field]
  if (isObject(entry) && "display_name" in entry) {
    return entry["display_name"]
  } else {
    return entry
  }
}
