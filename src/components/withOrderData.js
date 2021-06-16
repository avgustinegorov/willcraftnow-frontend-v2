import { Box } from "grommet"
import React from "react"
import { useDispatch } from "react-redux"

import Dots from "../components/Dots"
import TipBox from "../components/TipBox"
import { useAppointments } from "../reducers/appointments/hooks"
import { useAssetCategories } from "../reducers/assets/hooks"
import { useOrderData, useAllOrderData } from "../reducers/orders/hooks"
import { useUserDetails } from "../reducers/user/hooks"
import { useEntityData } from "../reducers/entities/hooks"
import { useFirmData } from "../reducers/firms/hooks"
import { resetForm, redirectForm } from "../reducers/forms"

export default function withOrderData(WrappedComponent) {
  const Component = props => {
    const {
      params: { orderId },
      location: { pathname },
    } = props
    const dispatch = useDispatch()
    const orderData = useOrderData({ orderId })

    // const firms = useFirmData()
    // const orderData = useOrderData({ orderId })
    // const assets = useAssetCategories({ orderId })
    // const userDetails = useUserDetails()
    // const entities = useEntityData()
    // const appointments = useAppointments({ orderId, orderType })

    if (!orderData) {
      return (
        <Box fill align="center" justify="center">
          <TipBox />
          <Dots />
        </Box>
      )
    }

    const { order_type: orderType } = orderData

    const orderDataProps = {
      orderData,
      orderId,
      orderType,
    }

    return <WrappedComponent {...props} {...orderDataProps} />
  }
  return Component
}
