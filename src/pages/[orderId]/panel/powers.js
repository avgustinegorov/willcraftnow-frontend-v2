import React from "react"
import { useDispatch } from "react-redux"
import { t } from "@lingui/macro"

import { PanelLayout } from "../../../components/Panel"
import AlertBox from "../../../components/AlertBox"
import DetailRender from "../../../components/DetailRender"
import Stepper from "../../../components/Stepper"
import withOrderData from "../../../components/withOrderData"

import { deletePropertyAffairsRestrictions } from "../../../reducers/PropertyAndAffairsRestrictions"
import { deletePersonalWelfareRestrictions } from "../../../reducers/personalWelfareRestrictions/actions"
import { redirectForm } from "../../../reducers/forms"
import { useAppointments } from "../../../reducers/appointments/hooks"

const Powers = ({ orderData, orderType, orderId, location: { pathname } }) => {
  const dispatch = useDispatch()
  const appointments = useAppointments({ orderId, orderType })
  const donees = appointments["DONEE"]

  const onClick = async ({ action, powerType }) => {
    if (action !== "DELETE") {
      dispatch(
        redirectForm({
          category: "ARRANGEMENT",
          action: action,
          redirectPath: `/${orderId}/forms/powers/${powerType}/`,
          data: {},
          pathname: pathname,
        })
      )
    } else if (action === "DELETE") {
      const arrangementAction =
        powerType === "PROPERTY_AND_AFFAIRS"
          ? deletePropertyAffairsRestrictions
          : deletePersonalWelfareRestrictions
      dispatch(arrangementAction({ orderId }))
    }
  }

  const {
    personal_welfare_restrictions,
    property_and_affairs_restrictions,
  } = orderData

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`Restrictions on Donee Powers`}
        subHeaderText={t`This is required.`}
      />
      <PanelLayout.Alerts>
        <AlertBox
          alertText={t`
          You may set restrictions on the powers that your donee exercises</u>. If you do not set any restrictions, then your donee will be obliged to exercise the power in your best interest.`}
        />
      </PanelLayout.Alerts>
      <PanelLayout.Content>
        <Stepper>
          {donees.some(donee =>
            ["PERSONAL_WELFARE", "BOTH"].includes(donee.donee_powers?.powers)
          ) && (
            <Stepper.Panel
              headerText={t`Donee Powers on Property and Affairs`}
              subHeaderText={t`Determine how your Donees exercise their powers on Property and Affairs.`}
            >
              <Stepper.Body>
                <DetailRender
                  onAdd={() =>
                    onClick({
                      action: "ADD",
                      powerType: "PROPERTY_AND_AFFAIRS",
                    })
                  }
                  onDelete={() =>
                    onClick({
                      action: "DELETE",
                      powerType: "PROPERTY_AND_AFFAIRS",
                    })
                  }
                  header={"Donee Powers on Property and Affairs"}
                  data={property_and_affairs_restrictions}
                />
              </Stepper.Body>
            </Stepper.Panel>
          )}
          {donees.some(donee =>
            ["PROPERTY_AND_AFFAIRS", "BOTH"].includes(
              donee.donee_powers?.powers
            )
          ) && (
            <Stepper.Panel
              headerText={t`Donee Powers on Personal Welfare`}
              subHeaderText={t`Determine how your Donees exercise their powers on Personal Welfare.`}
            >
              <Stepper.Body>
                <DetailRender
                  onAdd={() =>
                    onClick({ action: "ADD", powerType: "PERSONAL_WELFARE" })
                  }
                  onDelete={() =>
                    onClick({ action: "DELETE", powerType: "PERSONAL_WELFARE" })
                  }
                  header={"Donee Powers on Personal Welfare"}
                  data={personal_welfare_restrictions}
                />
              </Stepper.Body>
            </Stepper.Panel>
          )}
        </Stepper>
      </PanelLayout.Content>
      <PanelLayout.Btns
        backLabel={t`Donees`}
        backURL={"appointments"}
        nextLabel={t`Summary`}
        nextURL={"summary"}
        orderData={orderData}
        orderId={orderId}
      />
    </PanelLayout>
  )
}

export default withOrderData(Powers)
