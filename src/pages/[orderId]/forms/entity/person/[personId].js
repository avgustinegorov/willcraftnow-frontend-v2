import React from "react"
import { useDispatch } from "react-redux"
import { t } from "@lingui/macro"

import FormFactory from "../../../../../FormFactory"
import FormLayout from "../../../../../components/FormLayout"

import {
  addEntity,
  editEntity,
  entityOptions,
} from "../../../../../reducers/entities"
import { useOptions } from "../../../../../reducers/options/hooks"
import { useEntityData } from "../../../../../reducers/entities/hooks"

import withOrderData from "../../../../../components/withOrderData"

const AddPersonForm = ({ params: { personId, orderId } }) => {
  const action = personId ? "EDIT" : "ADD"
  const entityType = "PERSON"
  const options = useOptions(entityOptions, {
    orderId,
    entityType,
  })
  const entities = useEntityData({ orderId, details: false })
  const dispatch = useDispatch()

  const formService = {
    options,
    submit: formValues => {
      action === "ADD"
        ? dispatch(
            addEntity({
              orderId,
              entityType,
              params: { ...formValues, entity_type: entityType },
            })
          )
        : dispatch(
            editEntity({
              orderId,
              entityType,
              personId,
              params: formValues,
            })
          )
    },
    data:
      action === "ADD" ? null : entities.find(entity => entity.id === personId),
    excludedFields: ["relationship_status", "underage_children"],
    mode: action,
    fieldOptions: {
      relationship_other: {
        showOn: values => values.relationship === "Other",
      },
      block_number: {
        showOn: values =>
          ["HDB_FLAT", "HDB_EC", "PRIVATE_CONDOMINIUM"].includes(
            values.real_estate_type
          ),
      },
      floor_number: {
        showOn: values =>
          ["HDB_FLAT", "HDB_EC", "PRIVATE_CONDOMINIUM"].includes(
            values.real_estate_type
          ),
      },
    },
  }
  return (
    <FormLayout>
      <FormLayout.Header
        headerText={personId ? t`Edit Stored Contact` : t`Add Stored Contact`}
        subHeaderText={personId ? t`You can edit this later at any time` : null}
      />
      <FormLayout.Content>
        <FormFactory formService={formService} />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default withOrderData(AddPersonForm)
