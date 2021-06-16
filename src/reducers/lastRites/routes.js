import { generateFullPath, generatePath } from "../utils"

export const addLastRitesRoute = {
  route: null,
  serverRoute: `/order/:orderId/lastrites/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const deleteLastRitesRoute = {
  route: null,
  serverRoute: `/order/:orderId/lastrites/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}
