import { t } from "@lingui/macro"

const getAllocationFormTitle = ({ action, allocation_type }) => {
  switch (action) {
    case "ADD":
      action = t`Add`
      break
    case "ADD_SUB":
      action = t`Add Substitute`
      break
    case "EDIT_SUB":
      action = t`Edit Substitute`
      break
    case "DELETE":
      action = t`Delete`
      break
    case "EDIT":
      action = t`Edit`
      break
    default:
      throw new Error("Action Type not supported")
  }

  switch (allocation_type) {
    case "Percentage":
      allocation_type = t`Percentage`
      break
    case "Cash":
      allocation_type = t`Cash`
      break
    case "Both":
      allocation_type = ""
      break
    default:
      throw new Error("Allocation Type not supported")
  }

  return {
    allocation_type: allocation_type,
    action: action,
  }
}
export default getAllocationFormTitle
