import React from "react"

import LPAAppointments from "../../../components/Appointments/LPAAppointments"
import WillAppointments from "../../../components/Appointments/WillAppointments"
import withOrderData from "../../../components/withOrderData"

const Appointments = props => {
  switch (props.orderType) {
    case "LPA":
      return <LPAAppointments {...props} />
    case "WILL":
      return <WillAppointments {...props} />
    default:
      throw new Error("Order Type Not Found")
  }
}

export default withOrderData(Appointments)
