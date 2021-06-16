const pathMatch = require("path-match")

const addSubpath = (url, subpath) =>
  url.replace("/", `/${subpath}/`).replace(/(https?:\/\/)|(\/)+/g, "$1$2")

const removeSubpath = (url, subpath) =>
  url.replace(subpath, "").replace(/(https?:\/\/)|(\/)+/g, "$1$2")

const getLangFromUrl = (url, languages) => {
  const route = pathMatch()
  const localeSubpathRoute = route(`/:pathLang(${languages.join("|")})(.*)`)
  const pathParams = localeSubpathRoute(url)
  const { pathLang = undefined } = pathParams
  return pathLang
}

module.exports = {
  addSubpath,
  removeSubpath,
  getLangFromUrl,
}
