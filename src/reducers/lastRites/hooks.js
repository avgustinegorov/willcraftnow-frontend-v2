import { useOptions } from "../options/hooks"
import { getDetails } from "../utils"
import { useOrderData } from "../orders/hooks"
import { lastRitesOptions } from "./actions"

export const useLastRites = ({ orderId, details = true } = {}) => {
  const { last_rites } = useOrderData({ orderId })

  const options = useOptions(lastRitesOptions, {
    orderId,
    key: "USER",
  })

  if (last_rites && options) {
    return details ? getDetails(options, last_rites) : getDetails
  }

  return {}
}
