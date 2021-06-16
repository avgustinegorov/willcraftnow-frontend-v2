import { compile } from "path-to-regexp"

export const getDetails = (options, data) => {
  if (Array.isArray(data)) {
    return data.map(d => getDetails(options, d))
  }

  const optionsDict = options[options.methods[0]]
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      const isChoice = !!optionsDict[key].choices
      const _value =
        isChoice && !!value
          ? optionsDict[key].choices.find(choice =>
              typeof value === "string"
                ? choice.value.toUpperCase() === value.toUpperCase()
                : choice.value === value
            ).display_name
          : value

      return [key, _value]
    })
  )
}

const cache = {}
const cacheLimit = 10000
let cacheCount = 0

export const getBaseUrl = () => {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:8000`
    : process.env.GATSBY_BUILD_MODE === "staging"
    ? `https://willcraftnow-staging.herokuapp.com`
    : `https://api.willcraftnow.com`
}

function compilePath(path) {
  if (cache[path]) return cache[path]
  const generator = compile(path)

  if (cacheCount < cacheLimit) {
    cache[path] = generator
    cacheCount++
  }
  return generator
}

/**
 * Public API for generating a URL pathname from a path and parameters.
 */
export function generatePath(path = "/", params = {}) {
  return path === "/"
    ? path
    : compilePath(path)(params, { pretty: true, validate: false })
}

export function generateFullPath(path = "/", params = {}) {
  if (params) {
    return generatePath(path, params)
  } else return path
  // if (params) return getBaseUrl() + generatePath(path, params)
  // else return getBaseUrl() + path
}
