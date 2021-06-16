import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from "@lingui/macro"

import FormFactory from "../../../../../FormFactory"
import FormLayout from "../../../../../components/FormLayout"

import { continueForm } from "../../../../../reducers/forms"
import withOrderData from "../../../../../components/withOrderData"

const EditPersonForm = ({ orderId }) => {
  const options = useSelector(state => state.options["PERSONONLY"])
  const dispatch = useDispatch()
  const persons = useSelector(state =>
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
    submit: formValues =>
      dispatch(
        continueForm({
          redirectPath: `/${orderId}/forms/add_person`,
          data: { personId: formValues.person },
        })
      ),
    data: undefined,
    mode: "ADD",
    debug: true,
    fieldOptions: {
      person: {
        choices: persons,
        category: "person",
      },
    },
  }

  return (
    <FormLayout>
      <FormLayout.Header headerText={t`Edit Contact`} />
      <FormLayout.Content>
        <FormFactory formService={formService} />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default withOrderData(EditPersonForm)
