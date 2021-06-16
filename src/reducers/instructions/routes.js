import { generateFullPath, generatePath } from "../utils"

export const addInstructionsRoute = {
  route: null,
  serverRoute: `/order/:orderId/instructions/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const deleteInstructionsRoute = {
  route: null,
  serverRoute: `/order/:orderId/instructions/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}
