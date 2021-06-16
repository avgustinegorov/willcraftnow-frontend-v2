import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { getLatestInvoice } from "./actions"

export const useLatestInvoiceData = ({ orderId }) => {
  const dispatch = useDispatch()
  const invoiceData = useSelector(
    state =>
      state.orders.data.find(order => parseInt(order.id) === parseInt(orderId))
        .latest_invoice
  )

  const { isLoaded } = invoiceData

  React.useEffect(() => {
    updateInvoiceData()
  }, [])

  const updateInvoiceData = () => {
    dispatch(getLatestInvoice({ orderId }))
  }

  if (isLoaded) {
    return {
      invoiceData,
      isLoaded,
      updateInvoiceData,
    }
  }

  return {}
}
