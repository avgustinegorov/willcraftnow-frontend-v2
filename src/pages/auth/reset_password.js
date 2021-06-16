import { Text, Box, Button } from "grommet"
import React from "react"
import queryString from "query-string"

import { t, Trans } from "@lingui/macro"

import AuthCard from "../../components/AuthCard"
import FormFactory from "../../FormFactory"
import navigate from "../../utils/navigate"
import {
  confirmPassword,
  confirmPasswordOptions,
  resetPassword,
} from "../../reducers/user/actions"
import { useOptions } from "../../reducers/options/hooks"
import { useDispatch } from "react-redux"

const PasswordReset = ({ location }) => {
  const { email, uidb64, token } = queryString.parse(location.search)
  const dispatch = useDispatch()
  const confirmPasswordOptionsData = useOptions(confirmPasswordOptions)

  const formService1 = {
    mode: "OPTIONS",
    options: confirmPasswordOptionsData,
    submit: formvalues => {
      dispatch(
        confirmPassword({
          params: { email, uid: uidb64, token: token, ...formvalues },
        })
      )
    },
    excludedFields: ["uid", "token"],
  }

  return (
    <>
      <AuthCard
        headerText={t`Password Reset`}
        subHeaderText={t`You are resetting the password for ${email}.`}
        additionalComponents={
          <Box align="center" gap="small">
            <Button
              onClick={() => {
                dispatch(resetPassword({}))
              }}
              plain
              label={
                <Text size="small">
                  <Trans>
                    <u>Resend Reset Email</u>
                  </Trans>
                </Text>
              }
            />
            <Text size="small" textAlign="center">
              <Trans>
                If {email} is not your email, please exit immediately.
              </Trans>
            </Text>
          </Box>
        }
      >
        <FormFactory
          formService={formService1}
          onCancel={e => {
            navigate("/")
          }}
        />
      </AuthCard>
    </>
  )
}

export default PasswordReset
