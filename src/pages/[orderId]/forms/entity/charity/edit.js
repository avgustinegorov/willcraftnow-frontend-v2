import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from "@lingui/macro"

import FormFactory from "../../../../../FormFactory"
import FormLayout from "../../../../../components/FormLayout"

import { continueForm } from "../../../../../reducers/forms"
import withOrderData from "../../../../../components/withOrderData"

const EditCharityForm = ({ orderId }) => {
  const options = useSelector(state => state.options["PERSONONLY"])
  const dispatch = useDispatch()
  const charities = useSelector(state =>
    state.entities.data
      .filter(entity => entity.entity_type.toUpperCase() === "CHARITY")
      .map(entity => ({
        value: entity.id,
        display_name: entity.display_name,
      }))
  )

  const formService = {
    options,
    submit: formValues =>
      dispatch(
        continueForm({
          redirectPath: `/${orderId}/forms/add_charity`,
          data: { charityId: formValues.person },
        })
      ),
    data: undefined,
    mode: "ADD",
    debug: true,
    fieldOptions: {
      person: {
        choices: charities,
        category: "person",
      },
    },
  }

  return (
    <FormLayout>
      <FormLayout.Header headerText={t`Edit Charity`} />
      <FormLayout.Content>
        <FormFactory formService={formService} />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default withOrderData(EditCharityForm)
