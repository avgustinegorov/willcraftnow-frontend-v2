import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch } from "react-redux"

import FormFactory from "../../../../FormFactory"
import FormLayout from "../../../../components/FormLayout"

import getArrangementFormTitle from "../../../../components/getArrangementFormTitle"
import { useOptions } from "../../../../reducers/options/hooks"
import { addLastRites, lastRitesOptions } from "../../../../reducers/lastRites"
import {
  addInstructions,
  instructionsOptions,
} from "../../../../reducers/instructions"

import withOrderData from "../../../../components/withOrderData"

const ArrangementsForm = ({ params: { arrangementType, orderId } }) => {
  const action = "ADD"
  const dispatch = useDispatch()

  const options = useOptions(
    arrangementType.toUpperCase() === "LAST_RITES"
      ? lastRitesOptions
      : instructionsOptions,
    {
      orderId,
      key: arrangementType.toUpperCase(),
    }
  )

  const formService = {
    options,
    data: undefined,
    submit: formValues => {
      const arrangementAction =
        arrangementType.toUpperCase() === "LAST_RITES"
          ? addLastRites
          : addInstructions
      dispatch(arrangementAction({ orderId, params: formValues }))
    },
    mode: action,
    debug: true,
    fieldOptions: {
      crematorium_location: {
        showOn: values => values.instructions === "CREMATED",
      },
      funeral_duration: {
        addProps: {
          icon: "Days",
          reverse: true,
        },
      },
    },
  }

  const title = getArrangementFormTitle({ action, arrangementType })

  return (
    <I18n>
      {({ i18n }) => (
        <FormLayout>
          <FormLayout.Header>
            <FormLayout.Header.Header>
              {`${i18n._(title.action)} ${i18n._(title.arrangementType)}`}
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

export default withOrderData(ArrangementsForm)
