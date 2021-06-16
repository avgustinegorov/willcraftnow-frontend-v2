import React from "react"

import LanguageProvider from "../services/i18n/LanguageProvider"
import LocaleContextProvider from "../services/i18n/LocaleContextProvider"
import InterfaceModal from "./InterfaceModal"
import Layout from "./Layout"

const PageWrapper = props => {
  const { pageContext, location, children } = props

  return (
    <LocaleContextProvider {...pageContext}>
      <LanguageProvider {...pageContext}>
        <Layout {...props}>
          {children}
          <InterfaceModal />
        </Layout>
      </LanguageProvider>
    </LocaleContextProvider>
  )
}

export default PageWrapper
