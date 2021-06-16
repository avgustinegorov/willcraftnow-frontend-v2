import React, { useEffect, useContext, useCallback, useMemo } from "react"
import { Box, Text } from "grommet"
import queryString from "query-string"
import { useDispatch } from "react-redux"
import { Trans, t } from "@lingui/macro"

import AuthCard from "../../components/AuthCard"
import FormFactory from "../../FormFactory"

import {
  cancelRegisterLogin,
  loginUserOptions,
  registerUser,
} from "../../reducers/user"
import { useOptions } from "../../reducers/options/hooks"
import { updateFormNotLoading } from "../../reducers/forms/actions"

const TokenLogin = ({ location }) => {
  const dispatch = useDispatch()
  const { email } = useMemo(() => queryString.parse(location.search), [
    location.search,
  ])

  const options = useOptions(loginUserOptions)
  const loginFormService = {
    options,
    submit: formValues => dispatch(registerUser({ ...formValues, email })),
    mode: "ADD",
  }

  return (
    <AuthCard
      headerText={t`Welcome Back!`}
      subHeaderText={t`Please set the desired password for ${email}.`}
      additionalComponents={
        <Box align="center">
          <Text size="small" textAlign="center">
            <Trans>Don't worry, you can change this later.</Trans>
          </Text>
          <Text size="small" textAlign="center">
            <Trans>
              Registration is <u>absolutely free</u>.
            </Trans>
          </Text>
        </Box>
      }
    >
      <FormFactory
        formService={loginFormService}
        onCancel={e => {
          dispatch(cancelRegisterLogin())
          dispatch(updateFormNotLoading())
        }}
      />
    </AuthCard>
  )
}

export default TokenLogin
