import { Box, Button, List, Spinner, Text } from "grommet"
import { Edit, DocumentPdf } from "grommet-icons"
import { useDispatch } from "react-redux"
import React from "react"

import { Trans } from "@lingui/macro"

import DashboardPanel from "../Dashboard/DashboardPanel"
import { useUserDetails } from "../../reducers/user/hooks"
import { editOrder, addOrder } from "../../reducers/orders"
import { useAllOrderData } from "../../reducers/orders/hooks"

const OrderList = ({
  orderType,
  nextUrl,
  productTitle,
  productDescription,
}) => {
  const dispatch = useDispatch()
  const userDetails = useUserDetails()
  const [isCreateOrderLoading, setIsCreateOrderLoading] = React.useState(false)
  const allOrderData = useAllOrderData()

  if (!allOrderData || !userDetails) {
    return (
      <Box fill align="center" justify="center">
        <Spinner size={"medium"} />
      </Box>
    )
  }
  const _userOrders = allOrderData.filter(
    order => order.order_type === orderType
  )

  const { user_type: userType } = userDetails

  const orderIsExpired = order => {
    if (!order.latest_invoice.expiry_date) return false
    const expiry = new Date(order.latest_invoice.expiry_date)
    return expiry <= Date.now()
  }

  const orderIsPaid = order => {
    return order.latest_invoice.been_paid
  }

  const allowCreate = _userOrders.find(order => {
    return !orderIsPaid(order) && !orderIsExpired(order)
  })

  return (
    <DashboardPanel>
      <DashboardPanel.Header
        headerText={productTitle}
        subHeaderText={productDescription}
      />
      <DashboardPanel.Content>
        <List
          children={(datum, index) => {
            const date = new Date(datum.created_at)
            return (
              <Box gap="small" direction="row" justify="evenly">
                <Box align="center">
                  <Box>
                    <Text size="large">{datum.order_number}</Text>
                    <Text size="small">
                      <Trans>Paid:</Trans>
                      &nbsp;
                      {datum.latest_invoice.been_paid ? (
                        <Trans>Yes</Trans>
                      ) : (
                        <Trans>No</Trans>
                      )}
                    </Text>
                    <Text size="small">
                      <Trans>Created: {date.toDateString()}</Trans>
                    </Text>
                  </Box>
                </Box>
                <Box direction="row" justify="center" align="center">
                  <Button
                    icon={<Edit size="medium" />}
                    onClick={() =>
                      dispatch(
                        editOrder({
                          orderId: datum.id,
                          orderType: datum.order_type,
                          nextUrl: nextUrl({ orderId: datum.id }),
                        })
                      )
                    }
                    hoverIndicator
                  />
                  <Button
                    disabled={!datum.latest_invoice.been_paid}
                    icon={<DocumentPdf size="1.7em" />}
                    href={datum.pdf_url}
                    target="_blank"
                    hoverIndicator
                  />
                </Box>
              </Box>
            )
          }}
          data={_userOrders}
        />
        {!_userOrders.length && (
          <Box align="center" justify="center" fill>
            <Text textAlign="center">
              No Orders Yet. Click Create to Start.
            </Text>
          </Box>
        )}
      </DashboardPanel.Content>
      <DashboardPanel.Btn
        margin={{ top: "medium" }}
        label={"Create"}
        onClick={() => {
          setIsCreateOrderLoading(true)
          dispatch(addOrder({ orderType, nextUrl }))
        }}
        disabled={userType === "ADMIN" ? false : !!allowCreate}
        isLoading={isCreateOrderLoading}
      />
    </DashboardPanel>
  )
}
export default OrderList
