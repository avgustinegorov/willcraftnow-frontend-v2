const {
  trackCustomEvent: gatsbyTrackCustomEvent,
} = require("gatsby-plugin-google-analytics")
const { getCookie } = require("../utils/cookie")

const trackCustomEvent = (params = {}) => {
  const orderType = getCookie("OrderType")
  if (orderType) {
    params = {
      ...params,
      content_category: orderType,
    }
  }
  gatsbyTrackCustomEvent(params)
}

export default trackCustomEvent
