import { useOptions } from "../options/hooks"
import { getDetails } from "../utils"
import { useOrderData } from "../orders/hooks"
import { instructionsOptions } from "./actions"

export const useInstructions = ({ orderId, details = true } = {}) => {
  const { instructions } = useOrderData({ orderId })

  const options = useOptions(instructionsOptions, {
    orderId,
    key: "USER",
  })

  if (instructions && options) {
    return details ? getDetails(options, instructions) : getDetails
  }

  return {}
}
