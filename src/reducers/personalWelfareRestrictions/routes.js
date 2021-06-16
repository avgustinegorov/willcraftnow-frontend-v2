import { generateFullPath, generatePath } from "../utils"

export const addPersonalWelfareRestrictionsRoute = {
  route: null,
  serverRoute: `/order/:orderId/personal_welfare/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const deletePersonalWelfareRestrictionsRoute = {
  route: null,
  serverRoute: `/order/:orderId/personal_welfare/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}
