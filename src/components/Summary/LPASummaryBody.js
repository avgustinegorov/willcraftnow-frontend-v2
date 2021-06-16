import { I18n } from "@lingui/react"
import React from "react"
import { useSelector } from "react-redux"
import { t } from "@lingui/macro"

import DetailRender from "../DetailRender"
import MultiDetailRender from "../MultiDetailRender"
import Stepper from "../Stepper"
import getAppointmentHeaders from "../Appointments/getAppointmentHeaders"
import { useOptions } from "../../reducers/options/hooks"
import { doneePowersOptions } from "../../reducers/appointments"
import { propertyAffairsRestrictionsOptions } from "../../reducers/PropertyAndAffairsRestrictions/actions"
import { personalWelfareRestrictionsOptions } from "../../reducers/personalWelfareRestrictions/actions"
import { useUserDetails } from "../../reducers/user/hooks"
import { useAppointments } from "../../reducers/appointments/hooks"

const LPASummaryBody = ({ orderData, orderId, orderType }) => {
  const appointments = useAppointments({ orderId, orderType })
  const doneePowerOptions = useOptions(doneePowersOptions, { orderId })
  const propertyAffairsOptions = useOptions(
    propertyAffairsRestrictionsOptions,
    { orderId }
  )
  const personalWelfareOptions = useOptions(
    personalWelfareRestrictionsOptions,
    { orderId }
  )
  const entities = useSelector(state => state.entities.data)
  const userDetails = useUserDetails()
  const legalServices =
    orderData.legal_services?.filter(
      service => service.service_type === "LPA_CERTIFICATE"
    ) || []

  appointments["CERTIFICATE_PROVIDER"] = legalServices

  return (
    <I18n>
      {({ i18n }) => (
        <Stepper>
          <Stepper.Panel headerText={t`Your Details`}>
            <Stepper.Body>
              <DetailRender data={userDetails} />
            </Stepper.Body>
          </Stepper.Panel>
          {Object.entries(appointments).map(
            ([appointment, appointmentData], index) => (
              <Stepper.Panel
                {...getAppointmentHeaders({
                  appointment,
                  count: appointmentData.length,
                })}
              >
                <Stepper.Body>
                  <MultiDetailRender
                    header={i18n._(
                      getAppointmentHeaders({
                        appointment,
                        count: appointmentData.length,
                      }).headerText
                    )}
                    onRender={data =>
                      appointment === "CERTIFICATE_PROVIDER" &&
                      legalServices.length
                        ? data.firm_details.name
                        : data.display_name
                    }
                    modalProps={
                      appointment === "CERTIFICATE_PROVIDER" &&
                      legalServices.length
                        ? data => ({
                            header: data.firm_details.name,
                            data: data,
                          })
                        : data => ({
                            header: data.display_name,
                            data: data,
                          })
                    }
                    data={
                      appointment === "CERTIFICATE_PROVIDER" &&
                      legalServices.length
                        ? legalServices.filter(service => {
                            return service.service_type === "LPA_CERTIFICATE"
                          })
                        : appointmentData.map(appointment =>
                            entities.find(
                              entity => appointment.entity === entity.id
                            )
                          )
                    }
                  />
                </Stepper.Body>
              </Stepper.Panel>
            )
          )}
          <Stepper.Panel headerText={t`Donee Powers on Property and Affairs`}>
            <Stepper.Body>
              <DetailRender
                header={"Donee Powers on Property and Affairs"}
                data={orderData.property_and_affairs_restrictions}
              />
            </Stepper.Body>
          </Stepper.Panel>
          <Stepper.Panel headerText={t`Donee Powers on Personal Welfare`}>
            <Stepper.Body>
              <DetailRender
                header={"Donee Powers on Personal Welfare"}
                data={orderData.personal_welfare_restrictions}
              />
            </Stepper.Body>
          </Stepper.Panel>
        </Stepper>
      )}
    </I18n>
  )
}

export default LPASummaryBody
