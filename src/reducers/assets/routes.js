import { generateFullPath, generatePath } from "../utils"

export const fetchAssetRoute = {
  route: null,
  serverRoute: `/listAssets/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const addAssetRoute = {
  route: null,
  serverRoute: `/order/:orderId/assets/:assetType/`,
  reverse({ orderId, assetType }) {
    return generatePath(this.route, { orderId, assetType })
  },
  serverReverse({ orderId, assetType }) {
    return generateFullPath(this.serverRoute, { orderId, assetType })
  },
}

export const editAssetRoute = {
  route: null,
  serverRoute: `/order/:orderId/assets/:assetType/:assetId/`,
  reverse({ orderId, assetType, assetId }) {
    return generatePath(this.route, { orderId, assetType, assetId })
  },
  serverReverse({ orderId, assetType, assetId }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      assetType,
      assetId,
    })
  },
}

export const deleteAssetRoute = {
  route: null,
  serverRoute: `/order/:orderId/assets/:assetType/:assetId/`,
  reverse({ orderId, assetType, assetId }) {
    return generatePath(this.route, { orderId, assetType, assetId })
  },
  serverReverse({ orderId, assetType, assetId }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      assetType,
      assetId,
    })
  },
}

export const getAssetRoute = {
  route: null,
  serverRoute: `/order/:orderId/assets/:assetType/:assetId/`,
  reverseRoute({ orderId, assetType, assetId }) {
    return generatePath(this.route, { orderId, assetType, assetId })
  },
  reverse({ orderId, assetType, assetId }) {
    return generateFullPath(this.serverRoute, {
      orderId,
      assetType,
      assetId,
    })
  },
}
