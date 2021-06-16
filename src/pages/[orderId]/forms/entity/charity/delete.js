import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from "@lingui/macro"

import FormFactory from "../../../../../FormFactory"
import FormLayout from "../../../../../components/FormLayout"

import { deleteEntity } from "../../../../../reducers/entities"

import { cancelForm } from "../../../../../reducers/forms"
import withOrderData from "../../../../../components/withOrderData"

const DeleteCharityForm = ({ orderId }) => {
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
        choices: charities,
        category: "person",
      },
    },
  }

  return (
    <FormLayout>
      <FormLayout.Header headerText={t`Delete Charity`} />
      <FormLayout.Content>
        <FormFactory
          formService={formService}
          onCancel={() => dispatch(cancelForm())}
        />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default withOrderData(DeleteCharityForm)
