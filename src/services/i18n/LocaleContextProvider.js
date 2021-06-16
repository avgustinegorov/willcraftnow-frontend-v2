import React from "react"

import LocaleContext from "./LocaleContext"

const LocaleContextProvider = props => {
  const { children, lang, languages, defaultLanguage } = props
  return (
    <LocaleContext.Provider value={{ lang, languages, defaultLanguage }}>
      {children}
    </LocaleContext.Provider>
  )
}
export default LocaleContextProvider
