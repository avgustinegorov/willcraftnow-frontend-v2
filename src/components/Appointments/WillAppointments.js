import { Box, CheckBox, Spinner } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t, Trans } from "@lingui/macro"

import { PanelLayout } from "../Panel"
import MultiDetailRender from "../MultiDetailRender"
import Stepper from "../Stepper"
import getAppointmentHeaders from "./getAppointmentHeaders"
import { deleteLegalService } from "../../reducers/legalServices"
import { deleteAppointment } from "../../reducers/appointments"
import { redirectForm } from "../../reducers/forms"
import { unstable_renderSubtreeIntoContainer } from "react-dom"
import { useAppointments } from "../../reducers/appointments/hooks"
import { useUserDetails } from "../../reducers/user/hooks"

const WillAppointments = ({
  location: { pathname },
  orderData,
  orderId,
  orderType,
}) => {
  const dispatch = useDispatch()
  const appointments = useAppointments({ orderId, orderType })
  const userDetails = useUserDetails()
  const entities = useSelector(state => state.entities.data)
  const legalServices = orderData.legal_services

  const onClick = async ({ action, appointmentType, appointment }) => {
    if (action !== "DELETE") {
      dispatch(
        redirectForm({
          category: "APPOINTMENT",
          action: action,
          redirectPath: `/${orderId}/forms/appointment/${appointmentType.toLowerCase()}/`,
          data: {},
          pathname: pathname,
        })
      )
    } else if (action === "DELETE") {
      dispatch(
        deleteAppointment({
          orderId,
          params: {
            person: appointment.entity,
            updated_type: appointmentType.toUpperCase(),
          },
        })
      )
    }
  }

  const onLawyerClick = async ({ action, appointmentType }) => {
    if (action === "DELETE") {
      dispatch(
        deleteLegalService({
          orderId,
          legalService: appointmentType.toLowerCase(),
        })
      )
    } else {
      dispatch(
        redirectForm({
          category: "LAWYER_APPOINTMENT",
          action: action,
          redirectPath: `/${orderId}/forms/legal_service/${appointmentType}/`,
          data: {},
          pathname: pathname,
        })
      )
    }
  }

  if (!appointments) return <Spinner />

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`Appointments`}
        subHeaderText={t`Appointment of Executors and Witnesses are required.`}
      />
      <PanelLayout.Content>
        <I18n>
          {({ i18n }) => (
            <Stepper>
              {Object.entries(appointments).map(
                ([appointment, appointmentData], index) => (
                  <Stepper.Panel
                    {...getAppointmentHeaders({
                      appointment,
                      count: appointmentData.length,
                    })}
                    show={
                      appointment === "SUB_EXECUTOR"
                        ? !!appointments["EXECUTOR"].length
                        : appointment === "GUARDIAN"
                        ? userDetails.underage_children !== "No"
                        : undefined
                    }
                  >
                    <Stepper.Body>
                      {appointment === "WITNESS" && legalServices.length ? (
                        <Box pad="small">
                          <MultiDetailRender
                            header={i18n._(
                              getAppointmentHeaders({
                                appointment,
                                count: appointmentData.length,
                              }).headerText
                            )}
                            onRender={data => data.firm_details.name}
                            data={legalServices.filter(
                              service =>
                                service.service_type ===
                                appointment.toUpperCase()
                            )}
                            onDelete={e =>
                              onLawyerClick({
                                action: "DELETE",
                                appointment: e,
                                appointmentType: appointment,
                              })
                            }
                          />
                        </Box>
                      ) : (
                        <Box align="center">
                          {appointment === "WITNESS" &&
                            !appointmentData.length && (
                              <Box align="center" pad={{ top: "medium" }}>
                                <CheckBox
                                  onClick={() =>
                                    onLawyerClick({
                                      action: "ADD",
                                      appointmentType: appointment,
                                    })
                                  }
                                  checked={
                                    appointmentData.witness_type === "FIRM"
                                  }
                                  label={
                                    <Trans>
                                      I want lawyers to Witness my Will.
                                    </Trans>
                                  }
                                />
                              </Box>
                            )}
                          <MultiDetailRender
                            header={i18n._(
                              getAppointmentHeaders({
                                appointment,
                                count: appointmentData.length,
                              }).headerText
                            )}
                            limit={
                              appointment === "EXECUTOR"
                                ? 4
                                : appointment === "WITNESS"
                                ? 2
                                : null
                            }
                            onRender={data =>
                              entities.find(entity => entity.id === data.entity)
                                .display_name
                            }
                            data={appointmentData}
                            onAdd={e =>
                              onClick({
                                action: "ADD",
                                appointmentType: appointment,
                              })
                            }
                            onDelete={e =>
                              onClick({
                                action: "DELETE",
                                appointment: e,
                                appointmentType: appointment,
                              })
                            }
                          />
                        </Box>
                      )}
                    </Stepper.Body>
                  </Stepper.Panel>
                )
              )}
            </Stepper>
          )}
        </I18n>
      </PanelLayout.Content>
      <PanelLayout.Btns
        backLabel={t`Specific Assets`}
        backURL={"specific_assets"}
        nextLabel={t`Arrangements`}
        nextURL={"arrangements"}
        orderData={orderData}
        orderId={orderId}
      />
    </PanelLayout>
  )
}

export default WillAppointments
