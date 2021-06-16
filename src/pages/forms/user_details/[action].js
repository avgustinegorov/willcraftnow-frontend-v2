import React from "react"

import { t } from "@lingui/macro"

import AlertBox from "../../../components/AlertBox"
import FormFactory from "../../../FormFactory"
import FormLayout from "../../../components/FormLayout"
import { useDispatch, useSelector } from "react-redux"
import { useUserDetails } from "../../../reducers/user/hooks"
import { editUser } from "../../../reducers/user"

const UserDetailsForm = ({ params: { action } }) => {
  const options = useSelector(state => state.options["USER"])
  const userDetails = useUserDetails({ details: false })
  const dispatch = useDispatch()

  const formService = {
    options,
    data: userDetails,
    submit: formValues => {
      dispatch(editUser({ params: formValues }))
    },
    mode: action,
    excludedFields: ["email", "relationship"],
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
      relationship_status: {
        alert: (value, values) =>
          ["Single", "Divorced"].includes(value) ? (
            <AlertBox
              alertText={t`
                  Please note that getting married will invalidate your Will, and you'll have to set a fresh one.`}
            />
          ) : null,
      },
      age: {
        validators: [
          (fieldValue, formValues) => {
            return fieldValue < 21 && `Please enter a number larger than 21.`
          },
        ],
      },
    },
  }

  return (
    <FormLayout>
      <FormLayout.Header
        headerText={t`User Details`}
        subHeaderText={t`Just some basic information about yourself.`}
      />

      <FormLayout.Content>
        <FormFactory formService={formService} />
      </FormLayout.Content>
    </FormLayout>
  )
}

export default UserDetailsForm
