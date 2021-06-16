import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from "@lingui/macro"

import AlertBox from "../AlertBox"
import FormLayout from "../FormLayout"

import FormFactory from "../../FormFactory"
import { withRedirectChoices } from "../../FormFactory/withRedirectChoices"

import getAppointmentHeaders from "./getAppointmentHeaders"

import { useOptions } from "../../reducers/options/hooks"
import { useOrderData } from "../../reducers/orders/hooks"
import {
  addDoneePowers,
  doneePowersOptions,
} from "../../reducers/appointments/actions"
import { redirectForm } from "../../reducers/forms"

const LPAAppointmentForm = ({
  location: { pathname },
  params: { appointmentType },
  orderId,
}) => {
  const action = "ADD"
  const dispatch = useDispatch()
  const { persons } = useOrderData({ orderId })
  const options = useOptions(doneePowersOptions, { orderId })

  const entities = useSelector(state =>
    state.entities.data
      .filter(entity => entity.entity_type.toUpperCase() === "PERSON")
      .filter(entity => !entity.is_user)
      .map(entity => ({
        value: entity.id,
        display_name: entity.display_name,
      }))
  )

  const formService = {
    options,
    submit: formValues => {
      dispatch(
        addDoneePowers({
          orderId,
          params: formValues,
          updated_type: appointmentType.toUpperCase(),
        })
      )
    },
    data: undefined,
    mode: action,
    excludedFields:
      appointmentType === "REPLACEMENT_DONEE"
        ? ["powers"]
        : ["named_main_donee", "replacement_type"],
    fieldOptions: {
      powers: {
        alert: (value, values) => {
          switch (value) {
            case "PERSONAL_WELFARE":
              return (
                <AlertBox
                  alertText={t`
                          Includes decisions on where you should live, your day-to-day care, handling your letters and your mail, and any healthcare and medical treatment that you may need.`}
                />
              )
            case "PROPERTY_AND_AFFAIRS":
              return (
                <AlertBox
                  alertText={t`
                            Includes buying, selling, renting, and mortgaging your property, operating your bank accounts, managing your CPF monies and paying of household expenses.`}
                />
              )
            case "BOTH":
              return (
                <AlertBox
                  alertText={t`
                            Includes decisions on (1) where you should live, your day-to-day care, handling your letters and your mail, and any healthcare and medical treatment that you may need; and (2) buying, selling, renting, and mortgaging your property, operating your bank accounts, managing your CPF monies and paying of household expenses.`}
                />
              )
            default:
              return null
          }
        },
      },
      donee: {
        category: "person",
        choices: withRedirectChoices({
          choices: entities,
          category: "donee",
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
      named_main_donee: {
        category: "main_person",
        choices: entities.filter(entity =>
          persons
            .find(person => person.entity === entity.value)
            ?.entity_roles.includes("DONEE")
        ),
        showOn: values => {
          return values.replacement_type === "NAMED"
        },
      },
    },
  }

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

export default LPAAppointmentForm
