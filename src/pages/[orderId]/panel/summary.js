import React from "react"

import LPASummary from "../../../components/Summary/LPASummary"
import WillSummary from "../../../components/Summary/WillSummary"
import withOrderData from "../../../components/withOrderData"

const Summary = props => {
  const { orderType } = props
  switch (orderType) {
    case "LPA":
      return <LPASummary {...props} />
    case "WILL":
      return <WillSummary {...props} />
    default:
      throw new Error("Order Type Not Found")
  }
}

export default withOrderData(Summary)
