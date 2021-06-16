import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch } from "react-redux"
import { t } from "@lingui/macro"

import AlertBox from "../../../../../components/AlertBox"
import FormFactory from "../../../../../FormFactory"
import FormLayout from "../../../../../components/FormLayout"

import { useOptions } from "../../../../../reducers/options/hooks"
import { useAssetData } from "../../../../../reducers/assets/hooks"

import {
  assetOptions,
  addAsset,
  editAsset,
} from "../../../../../reducers/assets"
import withOrderData from "../../../../../components/withOrderData"

const AssetForm = ({ params: { assetId, assetType, orderId } }) => {
  const action = assetId ? "EDIT" : "ADD"
  const dispatch = useDispatch()
  const options = useOptions(assetOptions, {
    orderId,
    assetType,
    key: `${assetType.toUpperCase()}_ASSET`,
  })

  const assets = useAssetData({ orderId, details: false })

  const formService = {
    mode: action,
    options,
    data:
      action === "ADD"
        ? undefined
        : assets.find(_asset => String(_asset.id) === assetId),
    debug: true,
    submit: formValues => {
      return action === "ADD"
        ? dispatch(addAsset({ orderId, assetType, params: formValues }))
        : dispatch(
            editAsset({
              orderId,
              assetType,
              assetId: assetId,
              params: formValues,
            })
          )
    },

    fieldOptions: {
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
      holding_type: {
        alert: (value, values) =>
          ["JOINTLY", "JOINT_TENANT"].includes(value) ? (
            <AlertBox
              alertText={t`
                        Note that Joint Assets pass by function of your Will
                        only if you are the last surviving owner. However, our
                        wills are drafted such that you <u>may still include it</u> in case you are the last
                        surviving owner.`}
            />
          ) : null,
      },
      country: {
        validators: [
          (fieldValue, formValues) => {
            return (
              fieldValue !== "SG" && `WillCraft only accepts Singapore Assets.`
            )
          },
        ],
      },
      has_existing_nomination: {
        alert: (value, values) =>
          ["YES"].includes(value) ? (
            <AlertBox
              alertText={t`
                        Note that benefits from insurance policies with nominations <u>will not pass</u> by virtue of your will, but instead by the nomination. If you intend for it to pass by virtue of your Will, please revoke the nomination with your insurer.`}
            />
          ) : null,
      },
    },
  }

  return (
    <I18n>
      {({ i18n }) => (
        <FormLayout>
          <FormLayout.Header headerText={t`Add Asset`} />
          <FormLayout.Content>
            <FormFactory formService={formService} />
          </FormLayout.Content>
        </FormLayout>
      )}
    </I18n>
  )
}

export default withOrderData(AssetForm)
