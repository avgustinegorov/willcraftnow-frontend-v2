import { I18n } from "@lingui/react"
import { Text, Box } from "grommet"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from "@lingui/macro"

import { PanelLayout } from "../Panel"
import MultiDetailRender from "../MultiDetailRender"
import Stepper from "../Stepper"
import getAppointmentHeaders from "./getAppointmentHeaders"

import {
  deleteDoneePowers,
  doneePowersOptions,
} from "../../reducers/appointments"
import { deleteLegalService } from "../../reducers/legalServices"

import { getDetails } from "../../reducers/utils"
import { useOptions } from "../../reducers/options/hooks"
import { redirectForm } from "../../reducers/forms"
import { useAppointments } from "../../reducers/appointments/hooks"

const LPAAppointments = ({
  orderData,
  orderId,
  orderType,
  location: { pathname },
}) => {
  const dispatch = useDispatch()
  const appointments = useAppointments({ orderId, orderType })
  const options = useOptions(doneePowersOptions, { orderId })
  const entities = useSelector(state => state.entities.data)
  const legalServices =
    orderData.legal_services?.filter(
      service => service.service_type === "LPA_CERTIFICATE"
    ) || []
  appointments["CERTIFICATE_PROVIDER"] = legalServices

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
        deleteDoneePowers({
          orderId,
          person: appointment.entity,
          doneePowersId: appointment.donee_powers.id,
          updated_type: appointmentType.toUpperCase(),
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

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`Appointments`}
        subHeaderText={t`Appointment of Donees is required.`}
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
                      appointment === "REPLACEMENT_DONEE"
                        ? !!appointments["DONEE"].length
                        : true
                    }
                  >
                    <Stepper.Body>
                      <MultiDetailRender
                        header={i18n._(
                          getAppointmentHeaders({
                            appointment,
                            count: appointmentData.length,
                          }).headerText
                        )}
                        limit={appointment === "DONEE" && 2}
                        onRender={data => {
                          switch (appointment) {
                            case "CERTIFICATE_PROVIDER":
                              return data.firm_details.name
                            case "REPLACEMENT_DONEE":
                              return (
                                <Box>
                                  <Text margin={{ bottom: "small" }}>
                                    {
                                      entities.find(
                                        entity => entity.id === data.entity
                                      ).display_name
                                    }
                                  </Text>
                                  <Text size="small">
                                    {
                                      getDetails(options, data.donee_powers)
                                        .replacement_type
                                    }
                                  </Text>
                                </Box>
                              )
                            default:
                              return (
                                <Box>
                                  <Text margin={{ bottom: "small" }}>
                                    {
                                      entities.find(
                                        entity => entity.id === data.entity
                                      ).display_name
                                    }
                                  </Text>
                                  <Text size="small">
                                    {
                                      getDetails(options, data.donee_powers)
                                        .powers
                                    }
                                  </Text>
                                </Box>
                              )
                          }
                        }}
                        data={appointmentData}
                        onAdd={
                          appointment === "CERTIFICATE_PROVIDER"
                            ? e =>
                                onLawyerClick({
                                  action: "ADD",
                                  appointment: e,
                                  appointmentType: appointment,
                                })
                            : e =>
                                onClick({
                                  action: "ADD",
                                  appointment: e,
                                  appointmentType: appointment,
                                })
                        }
                        onDelete={
                          appointment === "CERTIFICATE_PROVIDER"
                            ? e =>
                                onLawyerClick({
                                  action: "DELETE",
                                  appointment: e,
                                  appointmentType: appointment,
                                })
                            : e =>
                                onClick({
                                  action: "DELETE",
                                  appointment: e,
                                  appointmentType: appointment,
                                })
                        }
                      />
                    </Stepper.Body>
                  </Stepper.Panel>
                )
              )}
            </Stepper>
          )}
        </I18n>
      </PanelLayout.Content>
      <PanelLayout.Btns
        backLabel={t`Interface`}
        nextLabel={t`Donee Powers`}
        nextURL={"donee_powers"}
        orderData={orderData}
        orderId={orderId}
      />
    </PanelLayout>
  )
}

export default LPAAppointments
