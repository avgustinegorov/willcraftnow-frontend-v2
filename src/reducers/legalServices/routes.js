import { generateFullPath, generatePath } from "../utils"

export const addLegalServiceRoute = {
  route: null,
  serverRoute: `/legal_service/order/:orderId/service/:legalService/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId, legalService }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      legalService: legalService.toLowerCase(),
    })
  },
}

export const deleteLegalServiceRoute = {
  route: null,
  serverRoute: `/legal_service/order/:orderId/service/:legalService/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId, legalService }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      legalService: legalService.toLowerCase(),
    })
  },
}
