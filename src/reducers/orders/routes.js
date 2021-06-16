import { generateFullPath, generatePath } from "../utils"

export const fetchOrdersRoute = {
  route: null,
  serverRoute: `/order/list/`,
  reverse() {
    return generatePath(this.route)
  },
  serverReverse() {
    return generateFullPath(this.serverRoute)
  },
}

export const addOrderRoute = {
  route: null,
  serverRoute: `/order/create/:orderType/`,
  reverse({ orderType }) {
    return generatePath(this.route, { orderType })
  },
  serverReverse({ orderType }) {
    return generateFullPath(this.serverRoute, { orderType })
  },
}

export const editOrderRoute = {
  route: null,
  serverRoute: "/order/:orderId/",
  reverse({ orderId }) {
    return generatePath(this.route, { orderId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const deleteOrderRoute = {
  route: null,
  serverRoute: "/order/:orderId/",
  reverse() {
    return generatePath(this.route)
  },
  serverReverse(orderId) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const getOrderRoute = {
  route: null,
  serverRoute: `/order/:orderId/`,
  reverse({ orderId }) {
    return generatePath(this.route, { orderId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}
