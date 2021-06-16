const { getLangFromUrl } = require("./path")
const fetch = require("node-fetch").default
const { languages } = require("../services/i18n/config")
const queryString = require("query-string")
const request = async ({
  url,
  params,
  method,
  lang,
  debug,
  headers = {},
  token: _token,
}) => {
  const _method = method ? method : "GET"
  const _headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  }
  if (_token) {
    _headers["Authorization"] = `Bearer ${_token}`
  }
  if (typeof window !== "undefined") {
    const lang = getLangFromUrl(window.location.pathname, languages)
    _headers["Accept-Language"] = lang ? lang.toLowerCase() : "en"
  }

  const baseURL =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.GATSBY_BUILD_MODE === "staging"
      ? `https://willcraftnow-staging.herokuapp.com`
      : `https://api.willcraftnow.com`

  const _url = baseURL + url

  // const _checkStatus = response => {
  //   // raises an error in case response status is not a success
  //   if (response.status >= 200 && response.status < 300) {
  //     return response
  //   } else {
  //     var error = new Error(response.statusText)
  //     error.response = response
  //     throw error
  //   }
  // }

  const response = await fetch(_url, {
    method: _method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: _headers,
    body:
      _headers["Content-Type"] === "application/x-www-form-urlencoded"
        ? queryString.stringify(params)
        : JSON.stringify(params), // body data type must match "Content-Type" header
  })

  const responseJSON =
    response.statusText === "No Content" || response.status === 204
      ? {}
      : await response.json()

  if (!(response.status >= 200 && response.status < 300)) {
    const err = new Error(response.statusText)
    err.data = responseJSON
    err.status = response.status
    err.statusText = response.statusText
    throw err
  }

  return {
    data: responseJSON,
    status: response.status,
    statusText: response.statusText,
  }
}

module.exports = { request }
