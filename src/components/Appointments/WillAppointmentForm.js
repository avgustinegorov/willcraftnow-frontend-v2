import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from "@lingui/macro"

import FormFactory from "../../FormFactory"
import { withRedirectChoices } from "../../FormFactory/withRedirectChoices"
import FormLayout from "../FormLayout"

import getAppointmentHeaders from "./getAppointmentHeaders"

import { useOptions } from "../../reducers/options/hooks"
import { addAppointment, appointmentOptions } from "../../reducers/appointments"
import { useOrderData } from "../../reducers/orders/hooks"
import { redirectForm } from "../../reducers/forms/actions"

const WillAppointmentForm = ({
  location: { pathname },
  params: { appointmentType },
  orderId,
}) => {
  const action = "ADD"
  const dispatch = useDispatch()
  const orderData = useOrderData({ orderId })
  const options = useOptions(appointmentOptions, {
    orderId,
    key: "APPOINTMENT",
  })

  const { persons } = orderData

  const entities = useSelector(state =>
    state.entities.data
      .filter(
        entity =>
          entity.entity_type.toUpperCase() === "PERSON" && !entity.is_user
      )
      .filter(entity => {
        const person = persons.find(person => person.entity === entity.id)
        return person
          ? !person.entity_roles.includes(appointmentType.toUpperCase())
          : true
      })
      .filter(entity => {
        const person = persons.find(person => person.entity === entity.id)
        return person && appointmentType.toUpperCase() === "SUB_EXECUTOR"
          ? !person.entity_roles.includes("EXECUTOR")
          : true
      })
      .map(entity => ({
        value: entity.id,
        display_name: entity.display_name,
      }))
  )

  console.log(entities)

  const formService = {
    options,
    submit: formValues => {
      dispatch(
        addAppointment({
          orderId,
          params: {
            ...formValues,
            updated_type: appointmentType.toUpperCase(),
          },
        })
      )
    },
    data: undefined,
    mode: action,
    excludedFields: ["updated_type"],
    fieldOptions: {
      person: {
        category: "person",
        choices: withRedirectChoices({
          choices: entities,
          category: "person",
          redirectPaths: {
            onAll: ({ value, option, category }) =>
              dispatch(
                redirectForm({
                  category: category.toUpperCase(),
                  action: value.toUpperCase(),
                  redirectPath: `/${orderId}/forms/entity/${category.toLowerCase()}/${value.toLowerCase()}`,
                  data: {},
                  pathname: pathname,
                })
              ),
          },
        }),
      },
    },
  }

  if (action !== "ADD" || !appointmentType) return null

  return (
    <I18n>
      {({ i18n }) => (
        <FormLayout>
          <FormLayout.Header>
            <FormLayout.Header.Header>
              {`${i18n._(t`Add`)} ${i18n._(
                getAppointmentHeaders({
                  appointment: appointmentType,
                }).headerText
              )}`}
            </FormLayout.Header.Header>
          </FormLayout.Header>
          <FormLayout.Content>
            <FormFactory formService={formService} />
          </FormLayout.Content>
        </FormLayout>
      )}
    </I18n>
  )
}

export default WillAppointmentForm
