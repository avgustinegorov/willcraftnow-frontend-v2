import { createAction } from "redux-actions"

export const ASSET_OPTIONS = "ASSET_OPTIONS"
export const assetOptions = createAction(
  ASSET_OPTIONS,
  ({ orderId, assetType }) => ({
    key: `${assetType.toUpperCase()}_ASSET`,
    orderId: orderId,
    assetType,
  })
)

export const EDIT_ASSET_FORM_OPTIONS = "EDIT_ASSET_FORM_OPTIONS"
export const editAssetOptions = createAction(EDIT_ASSET_FORM_OPTIONS)

export const FETCH_ASSETS = "FETCH_ASSETS"
export const SUCCESS_FETCH_ASSETS = "SUCCESS_FETCH_ASSETS"
export const FAILURE_FETCH_ASSETS = "FAILURE_FETCH_ASSETS"

export const fetchAssets = createAction(FETCH_ASSETS)
export const successFetchAssets = createAction(SUCCESS_FETCH_ASSETS)
export const failureFetchAssets = createAction(FAILURE_FETCH_ASSETS)

export const ADD_ASSET_FORM = "ADD_ASSET_FORM"
export const SUCCESS_ADD_ASSET_FORM = "SUCCESS_ADD_ASSET_FORM"
export const FAILURE_ADD_ASSET_FORM = "FAILURE_ADD_ASSET_FORM"

export const addAsset = createAction(ADD_ASSET_FORM)
export const successAddAsset = createAction(SUCCESS_ADD_ASSET_FORM)
export const failureAddAsset = createAction(FAILURE_ADD_ASSET_FORM)

export const EDIT_ASSET_FORM = "EDIT_ASSET_FORM"
export const SUCCESS_EDIT_ASSET_FORM = "SUCCESS_EDIT_ASSET_FORM"
export const FAILURE_EDIT_ASSET_FORM = "FAILURE_EDIT_ASSET_FORM"

export const editAsset = createAction(EDIT_ASSET_FORM)
export const successEditAsset = createAction(SUCCESS_EDIT_ASSET_FORM)
export const failureEditAsset = createAction(FAILURE_EDIT_ASSET_FORM)

export const DELETE_ASSET = "DELETE_ASSET"
export const SUCCESS_DELETE_ASSET = "SUCCESS_DELETE_ASSET"
export const FAILURE_DELETE_ASSET = "FAILURE_DELETE_ASSET"

export const deleteAsset = createAction(DELETE_ASSET)
export const successDeleteAsset = createAction(SUCCESS_DELETE_ASSET)
export const failureDeleteAsset = createAction(FAILURE_DELETE_ASSET)
