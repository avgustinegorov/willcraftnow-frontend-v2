import { generateFullPath, generatePath } from "../utils"

export const fetchEntitysRoute = {
  route: null,
  serverRoute: `/listEntities/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const addEntityRoute = {
  route: null,
  serverRoute: `/order/:orderId/:entityType/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId, entityType }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      entityType: entityType.toLowerCase(),
    })
  },
}

export const editEntityRoute = {
  route: null,
  serverRoute: `/order/:orderId/:entityType/:personId/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId, entityType, personId }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      entityType: entityType.toLowerCase(),
      personId,
    })
  },
}

export const deleteEntityRoute = {
  route: null,
  serverRoute: `/order/:orderId/:entityType/:personId/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse({ orderId, entityType, personId }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      entityType: entityType.toLowerCase(),
      personId,
    })
  },
}
