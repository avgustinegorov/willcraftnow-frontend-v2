import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders, getOrder } from "./actions"

export const useAllOrderData = () => {
  const dispatch = useDispatch()
  const { data: allOrderData, isLoaded } = useSelector(store => store.orders)

  React.useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchOrders())
    }
  }, [])

  if (isLoaded) {
    return allOrderData
  }
}

export const useOrderData = ({ orderId }) => {
  const dispatch = useDispatch()
  const allOrderData = useAllOrderData()
  const order = allOrderData?.find(
    i => parseInt(i.id) === parseInt(orderId) && i.isLoaded
  )

  React.useEffect(() => {
    if (!!allOrderData && !order) {
      dispatch(getOrder({ orderId }))
    }
  }, [!!allOrderData])

  if (!allOrderData) {
    return undefined
  }

  return order
}
