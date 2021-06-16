import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { t } from "@lingui/macro"

import FormFactory from "../../../../../FormFactory"
import FormLayout from "../../../../../components/FormLayout"

import { deleteEntity } from "../../../../../reducers/entities"

import { cancelForm } from "../../../../../reducers/forms"
import withOrderData from "../../../../../components/withOrderData"

const DeletePersonForm = ({ orderId }) => {
  const dispatch = useDispatch()
  const options = useSelector(state => state.options["PERSONONLY"])

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
        deleteEntity({
          orderId,
          personId: formValues.person,
          entityType: "PERSON",
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
      <FormLayout.Header headerText={t`Delete Contact`} />
      <FormLayout.Content>
        <FormFactory
          formService={formService}
          onCancel={() => dispatch(cancelForm())}
        />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default withOrderData(DeletePersonForm)
