exports.setCookie = (entryName, entryValue) => {
  typeof window === "undefined" && sessionStorage.setItem(entryName, entryValue)
}

exports.deleteCookie = entryName => {
  typeof window === "undefined" && sessionStorage.removeItem(entryName)
}

exports.getCookie = (entryName, fallback) => {
  const result =
    typeof window === "undefined" && sessionStorage.getItem(entryName)
  if (result === "") {
    return fallback ? fallback : false
  } else {
    return result
  }
}
