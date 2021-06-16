import { combineReducers } from "redux"

import ordersReducer from "./orders/reducer"
import userReducer from "./user/reducer"
import assetsReducer from "./assets/reducer"
import entitiesReducer from "./entities/reducer"
import firmsReducer from "./firms/reducer"
import loaderReducer from "./loader/reducer"
import formReducer from "./forms/reducer"
import formModalReducer from "./formModal/reducer"
import optionsReducer from "./options/reducer"

import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to l
import { LOGOUT_USER } from "../reducers/user/actions"

export default config => {
  const reducer = persistReducer(
    {
      key: "root",
      storage,
      blacklist: ["config"],
    },
    combineReducers({
      config: () => config,
      orders: ordersReducer,
      user: userReducer,
      assets: assetsReducer,
      entities: entitiesReducer,
      firms: firmsReducer,
      loader: loaderReducer,
      forms: formReducer,
      formModal: formModalReducer,
      options: optionsReducer,
    })
  )

  return (state, action) => {
    console.log("FIRED", action.type)
    if (action.type === LOGOUT_USER) {
      // for all keys defined in your persistConfig(s)
      storage.removeItem("persist:root")
      // storage.removeItem('persist:otherKey')

      state = undefined
    }
    return reducer(state, action)
  }
}
