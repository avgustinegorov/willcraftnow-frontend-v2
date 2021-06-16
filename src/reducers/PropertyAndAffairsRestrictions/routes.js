import { generateFullPath, generatePath } from "../utils"

export const addPropertyAffairsRestrictionsRoute = {
  route: null,
  serverRoute: `/order/:orderId/property_affairs/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const deletePropertyAffairsRestrictionsRoute = {
  route: null,
  serverRoute: `/order/:orderId/property_affairs/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}
