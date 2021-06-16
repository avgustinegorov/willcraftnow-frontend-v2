import createSagaMiddleware from "redux-saga"

import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore,
} from "redux"
import { persistStore } from "redux-persist"
import getReducer from "../reducers"
import { graphql, useStaticQuery } from "gatsby"
import rootOrdersSaga from "../reducers/orders/sagas"
import rootUserSaga from "../reducers/user/sagas"
import rootEntitiesSaga from "../reducers/entities/sagas"
import rootAssetsSaga from "../reducers/assets/sagas"
import rootFirmsSaga from "../reducers/firms/sagas"
import rootLastRitesSaga from "../reducers/lastRites/sagas"
import rootInstructionsSaga from "../reducers/instructions/sagas"
import rootFormsSaga from "../reducers/forms/sagas"
import rootOptionsSaga from "../reducers/options/sagas"
import rootAllocationsSaga from "../reducers/allocations/sagas"
import rootAppointmentsSaga from "../reducers/appointments/sagas"
import rootLegalServiceSaga from "../reducers/legalServices/sagas"
import rootInvoiceSaga from "../reducers/invoice/sagas"
import rootPersonalWelfareRestrictionsSaga from "../reducers/personalWelfareRestrictions/sagas"
import rootPropertyAndAffairsRestrictions from "../reducers/PropertyAndAffairsRestrictions/sagas"
import genericsSaga from "../reducers/generics/sagas"

const sagaMiddleware = createSagaMiddleware()

const useStore = () => {
  const data = useStaticQuery(graphql`
    query {
      siteAdminConfig {
        client_id
        facebook_tracking_id
        ga_tracking_id
        stripe_key
        tracking_debug
      }
    }
  `)
  const { siteAdminConfig } = data
  const reducer = getReducer(siteAdminConfig)

  const store =
    typeof window !== "undefined"
      ? reduxCreateStore(
          reducer,
          compose(
            applyMiddleware(sagaMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f // enable chrome extension
          )
        )
      : reduxCreateStore(reducer, compose(applyMiddleware(sagaMiddleware)))
  sagaMiddleware.run(genericsSaga)
  sagaMiddleware.run(rootOrdersSaga)
  sagaMiddleware.run(rootUserSaga)
  sagaMiddleware.run(rootEntitiesSaga)
  sagaMiddleware.run(rootAssetsSaga)
  sagaMiddleware.run(rootFirmsSaga)
  sagaMiddleware.run(rootLastRitesSaga)
  sagaMiddleware.run(rootInstructionsSaga)
  sagaMiddleware.run(rootFormsSaga)
  sagaMiddleware.run(rootOptionsSaga)
  sagaMiddleware.run(rootAllocationsSaga)
  sagaMiddleware.run(rootAppointmentsSaga)
  sagaMiddleware.run(rootLegalServiceSaga)
  sagaMiddleware.run(rootInvoiceSaga)
  sagaMiddleware.run(rootPersonalWelfareRestrictionsSaga)
  sagaMiddleware.run(rootPropertyAndAffairsRestrictions)

  const persistor = persistStore(store)
  return { store, persistor }
}

export default useStore
