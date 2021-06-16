import { generateFullPath, generatePath } from "../utils"

export const addAppointmentRoute = {
  route: null,
  serverRoute: `/order/:orderId/appointments/`,
  reverse({ orderId }) {
    return generatePath(this.route, { orderId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const deleteAppointmentRoute = {
  route: null,
  serverRoute: `/order/:orderId/appointments/`,
  reverseRoute({ orderId, allocationId }) {
    return generatePath(this.route, { orderId, allocationId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const addDoneePowersRoute = {
  route: null,
  serverRoute: `/order/:orderId/donee_powers/`,
  reverse({ orderId }) {
    return generatePath(this.route, { orderId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const deleteDoneePowersRoute = {
  route: null,
  serverRoute: `/order/:orderId/donee_powers/:doneePowersId/`,
  reverseRoute({ orderId, doneePowersId }) {
    return generatePath(this.route, { orderId, doneePowersId })
  },
  serverReverse({ orderId, doneePowersId }) {
    return generateFullPath(this.serverRoute, { orderId, doneePowersId })
  },
}
