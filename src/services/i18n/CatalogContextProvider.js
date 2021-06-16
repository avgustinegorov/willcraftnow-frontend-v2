import React from "react"

import CatalogContext from "./CatalogContext"

const CatalogContextProvider = props => {
  const [catalogs, _setCatalogs] = React.useState({})
  const setCatalogs = (lang, catalog) => {
    _setCatalogs({
      ...catalogs,
      [lang]: catalog,
    })
  }
  const { children } = props
  return (
    <CatalogContext.Provider value={{ catalogs, setCatalogs }}>
      {children}
    </CatalogContext.Provider>
  )
}

export default CatalogContextProvider
