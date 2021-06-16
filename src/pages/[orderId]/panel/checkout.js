import { Box } from "grommet"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import { t } from "@lingui/macro"

import { partnerAlerts } from "../../../components/Dashboard/partnerAlerts"
import AlertBox from "../../../components/AlertBox"
import { PanelLayout } from "../../../components/Panel"
import Dots from "../../../components/Dots"
import Invoice from "../../../components/Checkout/Invoice"
import Stripe from "../../../components/Checkout/Stripe"
import Discount from "../../../components/Checkout/Discount"

import { useUserDetails } from "../../../reducers/user/hooks"
import { useLatestInvoiceData } from "../../../reducers/invoice/hooks"

const Checkout = ({ orderId, orderType }) => {
  const data = useStaticQuery(graphql`
    query {
      siteAdminConfig {
        stripe_key
        tracking_debug
      }
    }
  `)

  const { siteAdminConfig } = data

  const { referring_applications: referringPartners } = useUserDetails() || {
    referring_applications: [],
  }
  const { invoiceData, isLoaded, updateInvoiceData } = useLatestInvoiceData({
    orderId,
  })

  if (!isLoaded) {
    return (
      <Box fill align="center" justify="center">
        <Dots />
      </Box>
    )
  }

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`Checkout & Payment`}
        subHeaderText={t`We'll send you an <u>encrypted copy</u> of your Will immediately after payment.`}
      />
      <PanelLayout.Content>
        <Box gap="medium">
          {referringPartners.map(
            partner =>
              partnerAlerts[partner] &&
              partnerAlerts[partner].invoice &&
              partnerAlerts[partner].invoice[orderType.toLowerCase()] && (
                <Box>
                  <AlertBox
                    size="xsmall"
                    alertText={
                      partnerAlerts[partner].invoice[orderType.toLowerCase()]
                    }
                  />
                </Box>
              )
          )}
          <Box>
            <Invoice invoiceData={invoiceData} orderId={orderId} />
          </Box>

          <Box
            fill="horizontal"
            direction={"row-responsive"}
            gap="medium"
            justify="center"
            align="center"
          >
            <Box
              width="medium"
              pad={{ vertical: "medium", horizontal: "medium" }}
              border
              round="medium"
            >
              <Discount invoiceData={invoiceData} orderId={orderId} />
            </Box>
            <Box
              width="medium"
              pad={{ vertical: "medium", horizontal: "medium" }}
              border
              round="medium"
            >
              <Stripe
                invoiceData={invoiceData}
                orderId={orderId}
                siteAdminConfig={siteAdminConfig}
              />
            </Box>
          </Box>
        </Box>
      </PanelLayout.Content>
    </PanelLayout>
  )
}
export default Checkout
