import { generateFullPath, generatePath } from "../utils"

export const addAllocationRoute = {
  route: null,
  serverRoute: `/order/:orderId/assets/:assetId/allocations/`,
  reverse({ orderId, assetId }) {
    return generatePath(this.route, { orderId, assetId })
  },
  serverReverse({ orderId, assetId }) {
    return generateFullPath(this.serverRoute, { orderId, assetId })
  },
}

export const editAllocationRoute = {
  route: null,
  serverRoute: `/order/:orderId/allocations/:allocationId/`,
  reverse({ orderId, allocationId }) {
    return generatePath(this.route, { orderId, allocationId })
  },
  serverReverse({ orderId, allocationId }) {
    return generateFullPath(this.serverRoute, { orderId, allocationId })
  },
}

export const deleteAllocationRoute = {
  route: null,
  serverRoute: `/order/:orderId/allocations/:allocationId/`,
  reverse({ orderId, allocationId }) {
    return generatePath(this.route, { orderId, allocationId })
  },
  serverReverse({ orderId, allocationId }) {
    return generateFullPath(this.serverRoute, { orderId, allocationId })
  },
}
