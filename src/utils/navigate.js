import { navigate as _navigate } from "gatsby"

import { addSubpath } from "../utils/path"
import { getLangFromUrl } from "./path"
import { languages } from "../services/i18n/config"

const navigate = (nextUrl, options) => {
  const urlLang = getLangFromUrl(window.location.pathname, languages)

  if (/^http/.test(nextUrl)) {
    window.location.assign(`${nextUrl}/${urlLang}`)
  }

  const nextUrlLang = getLangFromUrl(nextUrl, languages)

  if (!nextUrlLang) {
    nextUrl = addSubpath(nextUrl, urlLang || "en")
  }
  _navigate(nextUrl, options)
}

export default navigate
