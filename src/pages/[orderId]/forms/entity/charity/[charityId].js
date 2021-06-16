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

import { useEntityData } from "../../../../../reducers/entities/hooks"
import { useOptions } from "../../../../../reducers/options/hooks"

import withOrderData from "../../../../../components/withOrderData"

const AddCharityForm = ({ params: { charityId, orderId } }) => {
  const action = charityId ? "EDIT" : "ADD"
  const entityType = "CHARITY"
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
              personId: charityId,
              params: formValues,
            })
          )
    },
    data:
      action === "ADD"
        ? null
        : entities.find(entity => entity.id === charityId),
    mode: action,
    debug: true,
  }

  return (
    <FormLayout>
      <FormLayout.Header
        headerText={charityId ? t`Edit Stored Charity` : t`Add Stored Charity`}
        subHeaderText={
          charityId ? t`You can edit this later at any time` : null
        }
      />

      <FormLayout.Content>
        <FormFactory formService={formService} />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default withOrderData(AddCharityForm)
