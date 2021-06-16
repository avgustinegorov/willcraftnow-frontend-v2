// You can delete this file if you're not using it
import "typeface-lato"
import "typeface-roboto"

import { Provider } from "react-redux"
import React from "react"
import { PersistGate } from "redux-persist/integration/react"

import useStore from "../store"
import CatalogContextProvider from "../services/i18n/CatalogContextProvider"

const RootWrapper = props => {
  const { children } = props
  const { store, persistor } = useStore()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CatalogContextProvider>{children}</CatalogContextProvider>
      </PersistGate>
    </Provider>
  )
}
export default RootWrapper
