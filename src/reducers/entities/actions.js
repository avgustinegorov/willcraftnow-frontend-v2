import { createAction } from "redux-actions"

export const ENTITY_OPTIONS = "ENTITY_OPTIONS"
export const entityOptions = createAction(
  ENTITY_OPTIONS,
  ({ orderId, entityType }) => ({
    key: `${entityType.toUpperCase()}_ENTITY`,
    orderId: orderId,
    entityType,
  })
)

export const FETCH_ENTITYS = "FETCH_ENTITYS"
export const SUCCESS_FETCH_ENTITYS = "SUCCESS_FETCH_ENTITYS"
export const FAILURE_FETCH_ENTITYS = "FAILURE_FETCH_ENTITYS"

export const fetchEntitys = createAction(FETCH_ENTITYS)
export const successFetchEntitys = createAction(SUCCESS_FETCH_ENTITYS)
export const failureFetchEntitys = createAction(FAILURE_FETCH_ENTITYS)

export const ADD_ENTITY_FORM = "ADD_ENTITY_FORM"
export const SUCCESS_ADD_ENTITY_FORM = "SUCCESS_ADD_ENTITY_FORM"
export const FAILURE_ADD_ENTITY_FORM = "FAILURE_ADD_ENTITY_FORM"

export const addEntity = createAction(ADD_ENTITY_FORM)
export const successAddEntity = createAction(SUCCESS_ADD_ENTITY_FORM)
export const failureAddEntity = createAction(FAILURE_ADD_ENTITY_FORM)

export const EDIT_ENTITY_FORM = "EDIT_ENTITY_FORM"
export const SUCCESS_EDIT_ENTITY_FORM = "SUCCESS_EDIT_ENTITY_FORM"
export const FAILURE_EDIT_ENTITY_FORM = "FAILURE_EDIT_ENTITY_FORM"

export const editEntity = createAction(EDIT_ENTITY_FORM)
export const successEditEntity = createAction(SUCCESS_EDIT_ENTITY_FORM)
export const failureEditEntity = createAction(FAILURE_EDIT_ENTITY_FORM)

export const DELETE_ENTITY = "DELETE_ENTITY"
export const SUCCESS_DELETE_ENTITY = "SUCCESS_DELETE_ENTITY"
export const FAILURE_DELETE_ENTITY = "FAILURE_DELETE_ENTITY"

export const deleteEntity = createAction(DELETE_ENTITY)
export const successDeleteEntity = createAction(SUCCESS_DELETE_ENTITY)
export const failureDeleteEntity = createAction(FAILURE_DELETE_ENTITY)
