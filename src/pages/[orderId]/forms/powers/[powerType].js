import React from "react"
import { t } from "@lingui/macro"
import { I18n } from "@lingui/react"
import { useDispatch } from "react-redux"

import FormFactory from "../../../../FormFactory"
import { withRedirectChoices } from "../../../../FormFactory/withRedirectChoices"

import FormLayout from "../../../../components/FormLayout"
import AlertBox from "../../../../components/AlertBox"

import {
  addPropertyAffairsRestrictions,
  propertyAffairsRestrictionsOptions,
} from "../../../../reducers/PropertyAndAffairsRestrictions"
import {
  addPersonalWelfareRestrictions,
  personalWelfareRestrictionsOptions,
} from "../../../../reducers/personalWelfareRestrictions/actions"

import { useOptions } from "../../../../reducers/options/hooks"
import { useAssetData } from "../../../../reducers/assets/hooks"
import { useAppointments } from "../../../../reducers/appointments/hooks"
import { redirectForm } from "../../../../reducers/forms"
import withOrderData from "../../../../components/withOrderData"

const PowersForm = ({
  params: { powerType, orderId },
  location: { pathname },
}) => {
  const action = "ADD"
  const dispatch = useDispatch()
  const assets = useAssetData({ orderId })
  const appointments = useAppointments()
  const donees = appointments["DONEE"]
  const doneeNum = donees.length
  const options = useOptions(
    powerType === "PROPERTY_AND_AFFAIRS"
      ? propertyAffairsRestrictionsOptions
      : personalWelfareRestrictionsOptions,
    {
      orderId,
    }
  )

  const formService = {
    options,
    data: undefined,
    submit: formValues => {
      const arrangementAction =
        powerType === "PROPERTY_AND_AFFAIRS"
          ? addPropertyAffairsRestrictions
          : addPersonalWelfareRestrictions
      dispatch(arrangementAction({ orderId, params: formValues }))
    },
    mode: action,
    excludedFields:
      doneeNum > 1 ? ["updated_type"] : ["updated_type", "jointly_severally"],
    fieldOptions: {
      power_to_give_cash: {
        alert: (value, values) => {
          switch (value) {
            case "Restricted":
              return (
                <AlertBox
                  alertText={t`
                      This restriction applies on a yearly basis (i.e. the amount entered in the Restriction of Cash Gifts is the max amount that can be gifted per year.`}
                />
              )
            default:
              return null
          }
        },
      },
      restricted_asset: {
        showOn: values => values.power_to_sell_property === "No",
        choices: withRedirectChoices({
          choices: assets.map(asset => ({
            value: asset.id,
            display_name: asset.display_name,
          })),
          category: "asset",
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

      cash_restriction: {
        showOn: values => values.power_to_give_cash === "Restricted",
      },
    },
  }

  const titleMap = {
    PERSONAL_WELFARE: t`Restrictions on Personal Welfare Powers`,
    PROPERTY_AND_AFFAIRS: t`Restrictions on Property and Affairs Powers`,
  }

  return (
    <FormLayout>
      <FormLayout.Header>
        <FormLayout.Header.Header>
          <I18n>
            {({ i18n }) => `${i18n._(t`Add`)} ${i18n._(titleMap[powerType])}`}
          </I18n>
        </FormLayout.Header.Header>
      </FormLayout.Header>
      <FormLayout.Content>
        <FormFactory formService={formService} />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default withOrderData(PowersForm)
