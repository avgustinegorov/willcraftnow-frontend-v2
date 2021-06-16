import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t } from "@lingui/macro"

import FormFactory from "../../../../../FormFactory"
import FormLayout from "../../../../../components/FormLayout"

import getAllocationFormTitle from "../../../../../components/AssetsAllocations/getAllocationFormTitle"

import {
  addAllocation,
  addAllocationOptions,
  editAllocation,
} from "../../../../../reducers/allocations"
import { useOptions } from "../../../../../reducers/options/hooks"
import { withRedirectChoices } from "../../../../../FormFactory/withRedirectChoices"
import { useOrderData } from "../../../../../reducers/orders/hooks"
import { redirectForm } from "../../../../../reducers/forms"
import { useAllowableAllocations } from "../../../../../reducers/allocations/hooks"
import withOrderData from "../../../../../components/withOrderData"

const AllocationForm = ({
  params: { orderId, assetId, allocationId, parentAllocationId },
  location: { pathname },
}) => {
  const action = allocationId ? "EDIT" : "ADD"
  const orderData = useOrderData({ orderId })
  const dispatch = useDispatch()

  const options = useOptions(addAllocationOptions, {
    orderId,
    assetId: assetId,
    key: "ALLOCATION",
  })

  const charities = useSelector(state =>
    state.entities.data
      .filter(entity => entity.entity_type.toUpperCase() === "CHARITY")
      .map(entity => ({
        value: entity.id,
        display_name: entity.display_name,
      }))
  )

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
    mode: action,
    options,
    data:
      action === "ADD"
        ? undefined
        : orderData?.allocations.find(
            _allocation => String(_allocation.id) === allocationId
          ),
    submit: formValues => {
      const params = {
        asset_store: assetId,
        ...formValues,
      }
      if (parentAllocationId) params["parent_allocation"] = parentAllocationId
      return action === "ADD"
        ? dispatch(addAllocation({ orderId, assetId: assetId, params }))
        : dispatch(
            editAllocation({ orderId, allocationId: allocationId, params })
          )
    },
    excludedFields: ["allocation_amount", "asset_store", "parent_allocation"],
    fieldOptions: {
      allocation_percentage: {
        addProps: {
          icon: "%",
          reverse: true,
        },
      },
      allocation_amount: {
        addProps: {
          icon: "$",
        },
      },
      entity: [
        {
          category: "person",
          choices: withRedirectChoices({
            choices: persons,
            category: "person",
            redirectPaths: {
              onAll: ({ value, option, category }) => {
                dispatch(
                  redirectForm({
                    category: category.toUpperCase(),
                    action: value.toUpperCase(),
                    redirectPath: `/${orderId}/forms/entity/${category.toLowerCase()}/${value.toLowerCase()}`,
                    data: {},
                    pathname: pathname,
                  })
                )
              },
            },
          }),
        },
        {
          category: "charity",
          choices: withRedirectChoices({
            choices: charities,
            category: "charity",
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
      ],
    },
  }

  const allowableAllocationType = useAllowableAllocations({
    action,
    assetId,
    allocationId,
    parentAllocationId,
    orderData,
    orderId,
  })

  const {
    action: formAction,
    allocation_type: formAllocationType,
  } = getAllocationFormTitle({
    action,
    allocation_type: allowableAllocationType,
  })

  return (
    <I18n>
      {({ i18n }) => (
        <FormLayout>
          <FormLayout.Header>
            <FormLayout.Header.Header>
              {`${i18n._(formAction)} ${i18n._(formAllocationType)} ${i18n._(
                t`Allocation`
              )}`}
            </FormLayout.Header.Header>
          </FormLayout.Header>
          <FormLayout.Content>
            {allowableAllocationType === "Percentage" && (
              <FormFactory formService={formService} />
            )}
            {/* {allowableAllocationType === "Cash" && (
              <FormFactory
                formService={{
                  ...formService,
                  excludedFields: [
                    "allocation_percentage",
                    "asset_store",
                    "parent_allocation",
                  ],
                }}
              />
            )}
            {allowableAllocationType === "Both" && (
              <Tabs fill alignControls="stretch">
                <Tab title={i18n._(t`Percentage`)} align="stretch">
                  <Box align="center">
                    <FormFactory
                      formService={{
                        ...formService,
                        excludedFields: [
                          "allocation_amount",
                          "asset_store",
                          "parent_allocation",
                        ],
                      }}
                    />
                  </Box>
                </Tab>
                <Tab title={i18n._(t`Cash`)}>
                  <Box align="center">
                    <FormFactory
                      formService={{
                        ...formService,
                        excludedFields: [
                          "allocation_percentage",
                          "asset_store",
                          "parent_allocation",
                        ],
                      }}
                    />
                  </Box>
                </Tab>
              </Tabs>
            )} */}
          </FormLayout.Content>
        </FormLayout>
      )}
    </I18n>
  )
}

export default AllocationForm
