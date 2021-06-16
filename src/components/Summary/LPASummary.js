import React from "react"

import { t } from "@lingui/macro"

import { PanelLayout } from "../Panel"
import AlertBox from "../AlertBox"
import LPASummaryBody from "./LPASummaryBody"

const LPASummary = props => {
  const { orderData } = props
  const paid = orderData ? orderData.latest_invoice.been_paid : null

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`Summary`}
        subHeaderText={t`Here's a quick summary of the information you've given us.`}
      />
      <PanelLayout.Alerts>
        <AlertBox
          alertText={t`
          If there are any mistakes, go back using the <u>Back to Editing</u> button and amend it.`}
        />
        {!paid && (
          <AlertBox
            alertText={t`
          If everything is in order, click the <u><b>checkout</b></u> button below.`}
          />
        )}
      </PanelLayout.Alerts>
      <PanelLayout.Content>
        <LPASummaryBody {...props} />
      </PanelLayout.Content>
      <PanelLayout.Btns
        backLabel={t`Back to Editing`}
        backURL={
          orderData.order_type === "LPA" ? "donee_powers" : "arrangements"
        }
        nextLabel={!paid && t`Checkout`}
        nextURL={"checkout"}
        orderData={orderData}
      />
    </PanelLayout>
  )
}

export default LPASummary
