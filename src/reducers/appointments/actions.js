import { createAction } from "redux-actions"

export const APPOINTMENT_OPTIONS = "APPOINTMENT_OPTIONS"
export const appointmentOptions = createAction(
  APPOINTMENT_OPTIONS,
  ({ orderId }) => ({
    key: `APPOINTMENT`,
    orderId: orderId,
  })
)

export const ADD_ORDER_ENTITY = "ADD_ORDER_ENTITY"
export const addOrderEntity = createAction(ADD_ORDER_ENTITY)

export const DELETE_ORDER_ENTITY = "DELETE_ORDER_ENTITY"
export const deleteOrderEntity = createAction(DELETE_ORDER_ENTITY)

export const ADD_APPOINTMENT_FORM = "ADD_APPOINTMENT_FORM"
export const SUCCESS_ADD_APPOINTMENT_FORM = "SUCCESS_ADD_APPOINTMENT_FORM"
export const FAILURE_ADD_APPOINTMENT_FORM = "FAILURE_ADD_APPOINTMENT_FORM"

export const addAppointment = createAction(ADD_APPOINTMENT_FORM)
export const successAddAppointment = createAction(SUCCESS_ADD_APPOINTMENT_FORM)
export const failureAddAppointment = createAction(FAILURE_ADD_APPOINTMENT_FORM)

export const DELETE_APPOINTMENT = "DELETE_APPOINTMENT"
export const SUCCESS_DELETE_APPOINTMENT = "SUCCESS_DELETE_APPOINTMENT"
export const FAILURE_DELETE_APPOINTMENT = "FAILURE_DELETE_APPOINTMENT"

export const deleteAppointment = createAction(DELETE_APPOINTMENT)
export const successDeleteAppointment = createAction(SUCCESS_DELETE_APPOINTMENT)
export const failureDeleteAppointment = createAction(FAILURE_DELETE_APPOINTMENT)

export const DONEE_POWER_OPTIONS = "DONEE_POWER_OPTIONS"
export const doneePowersOptions = createAction(
  DONEE_POWER_OPTIONS,
  ({ orderId }) => ({
    key: `DONEE_POWER`,
    orderId: orderId,
  })
)

export const ADD_DONEE_POWERS_FORM = "ADD_DONEE_POWERS_FORM"
export const SUCCESS_ADD_DONEE_POWERS_FORM = "SUCCESS_ADD_DONEE_POWERS_FORM"
export const FAILURE_ADD_DONEE_POWERS_FORM = "FAILURE_ADD_DONEE_POWERS_FORM"

export const addDoneePowers = createAction(ADD_DONEE_POWERS_FORM)
export const successAddDoneePowers = createAction(SUCCESS_ADD_DONEE_POWERS_FORM)
export const failureAddDoneePowers = createAction(FAILURE_ADD_DONEE_POWERS_FORM)

export const DELETE_DONEE_POWERS = "DELETE_DONEE_POWERS"
export const SUCCESS_DELETE_DONEE_POWERS = "SUCCESS_DELETE_DONEE_POWERS"
export const FAILURE_DELETE_DONEE_POWERS = "FAILURE_DELETE_DONEE_POWERS"

export const deleteDoneePowers = createAction(DELETE_DONEE_POWERS)
export const successDeleteDoneePowers = createAction(
  SUCCESS_DELETE_DONEE_POWERS
)
export const failureDeleteDoneePowers = createAction(
  FAILURE_DELETE_DONEE_POWERS
)
