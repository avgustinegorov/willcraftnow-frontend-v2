import { generateFullPath, generatePath } from "../utils"

export const getLatestInvoiceRoute = {
  route: null,
  serverRoute: `/billing/:orderId/latest_invoice/`,
  reverse({ orderId }) {
    return generatePath(this.route, { orderId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const addDiscountRoute = {
  route: null,
  serverRoute: `/billing/:orderId/discount/`,
  reverse({ orderId }) {
    return generatePath(this.route, { orderId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}

export const addPaymentRoute = {
  route: null,
  serverRoute: `/billing/:orderId/charge_stripe/`,
  reverse({ orderId }) {
    return generatePath(this.route, { orderId })
  },
  serverReverse({ orderId }) {
    return generateFullPath(this.serverRoute, { orderId })
  },
}
