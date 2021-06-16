import { useDispatch } from "react-redux"
import React from "react"

import { t } from "@lingui/macro"

import { PanelLayout } from "../../../components/Panel"
import DetailRender from "../../../components/DetailRender"
import Stepper from "../../../components/Stepper"
import withOrderData from "../../../components/withOrderData"

import { deleteLastRites } from "../../../reducers/lastRites"
import { deleteInstructions } from "../../../reducers/instructions"
import { useInstructions } from "../../../reducers/instructions/hooks"
import { useLastRites } from "../../../reducers/lastRites/hooks"
import { redirectForm } from "../../../reducers/forms"

const Arrangements = ({ location: { pathname }, orderData, orderId }) => {
  const dispatch = useDispatch()

  const onClick = async ({ action, arrangementType, arrangement }) => {
    if (action !== "DELETE") {
      dispatch(
        redirectForm({
          category: "ARRANGEMENT",
          action: action,
          redirectPath: `/${orderId}/forms/arrangements/${arrangementType.toLowerCase()}`,
          data: {},
          pathname: pathname,
        })
      )
    } else if (action === "DELETE") {
      const arrangementAction =
        arrangementType === "LAST_RITES" ? deleteLastRites : deleteInstructions
      dispatch(arrangementAction({ orderId }))
    }
  }

  const instructions = useInstructions({ orderId })
  const last_rites = useLastRites({ orderId })

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`Arrangements`}
        subHeaderText={t`Do you have any instructions for your last rites?`}
      />
      <PanelLayout.Content>
        <Stepper>
          <Stepper.Panel
            headerText={t`Instructions`}
            subHeaderText={t`Let us know how you wish to deal with your remains. (Optional)`}
          >
            <Stepper.Body>
              <DetailRender
                onAdd={() =>
                  onClick({ action: "ADD", arrangementType: "INSTRUCTIONS" })
                }
                onDelete={e => {
                  onClick({
                    action: "DELETE",
                    arrangementType: "INSTRUCTIONS",
                    arrangement: e,
                  })
                }}
                header={t`Instructions`}
                data={Object.keys(instructions).length ? instructions : null}
              />
            </Stepper.Body>
          </Stepper.Panel>
          <Stepper.Panel
            headerText={t`Last Rites`}
            subHeaderText={t`Let us know how you wish your funeral to be handled. (Optional)`}
          >
            <Stepper.Body>
              <DetailRender
                onAdd={() =>
                  onClick({ action: "ADD", arrangementType: "LAST_RITES" })
                }
                onDelete={e => {
                  onClick({
                    action: "DELETE",
                    arrangementType: "LAST_RITES",
                    arrangement: e,
                  })
                }}
                header={t`Last Rites`}
                data={Object.keys(last_rites).length ? last_rites : null}
              />
            </Stepper.Body>
          </Stepper.Panel>
        </Stepper>
      </PanelLayout.Content>
      <PanelLayout.Btns
        backLabel={t`Appointments`}
        backURL={"appointments"}
        nextLabel={t`Summary`}
        nextURL={"summary"}
        orderData={orderData}
        orderId={orderId}
      />
    </PanelLayout>
  )
}

export default withOrderData(Arrangements)
