import { I18nProvider } from "@lingui/react"
import React from "react"

import CatalogContext from "./CatalogContext"
import loadable from "@loadable/component"

const LanguageProvider = props => {
  const { catalogs, setCatalogs } = React.useContext(CatalogContext)
  const { lang = "en" } = props

  const catalog = loadable(() =>
    import(`../../services/i18n/locales/${lang}/messages.js`)
  )

  React.useEffect(() => {
    const loadComponents = async catalogs => {
      if (!Object.keys(catalogs).includes(lang)) {
        const _catalog = await catalog.load()
        setCatalogs(lang, _catalog.default)
      }
    }
    loadComponents(catalogs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  React.useEffect(() => {
    window.language = lang
  }, [lang])

  if (!Object.keys(catalogs).length) return null

  return (
    <I18nProvider language={lang} catalogs={catalogs}>
      {props.children}
    </I18nProvider>
  )
}

export default LanguageProvider
