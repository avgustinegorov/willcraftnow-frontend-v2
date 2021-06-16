import React from "react"

import LPAAppointmentForm from "../../../../components/Appointments/LPAAppointmentForm"
import WillAppointmentForm from "../../../../components/Appointments/WillAppointmentForm"
import withOrderData from "../../../../components/withOrderData"

const AppointmentForm = props => {
  const { orderType } = props

  switch (orderType.toUpperCase()) {
    case "LPA":
      return <LPAAppointmentForm {...props} />
    case "WILL":
      return <WillAppointmentForm {...props} />
    default:
      throw new Error("OrderType not supported")
  }
}

export default withOrderData(AppointmentForm)
