import { t } from "@lingui/macro"

const getArrangementFormTitle = ({ action, arrangementType }) => {
  switch (action) {
    case "ADD":
      action = t`Add`
      break
    case "DELETE":
      action = t`Delete`
      break
    default:
      throw new Error("Action Type not supported")
  }

  switch (arrangementType.toUpperCase()) {
    case "LAST_RITES":
      arrangementType = t`Last Rites`
      break
    case "INSTRUCTIONS":
      arrangementType = t`Instructions`
      break
    default:
      throw new Error("Arrangement Type not supported")
  }

  return {
    arrangementType,
    action,
  }
}
export default getArrangementFormTitle
