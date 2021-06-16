import { Text, Box, Button } from "grommet"
import React from "react"

import { t, Trans } from "@lingui/macro"

import AuthCard from "../../components/AuthCard"
import FormFactory from "../../FormFactory"
import navigate from "../../utils/navigate"
import { useOptions } from "../../reducers/options/hooks"
import {
  isUserOptions,
  registerUserOptions,
  loginUserOptions,
  registerUser,
  loginUser,
} from "../../reducers/user"
import { useDispatch, useSelector } from "react-redux"
import {
  cancelRegisterLogin,
  IsUser,
  resetPassword,
  tokenRegisterUser,
} from "../../reducers/user/actions"
import { addForm, updateFormNotLoading } from "../../reducers/forms/actions"

const Auth = props => {
  const dispatch = useDispatch()
  const { authFormState } = useSelector(state => state.user.auth)

  const hasForm = useSelector(state =>
    state.forms.data.some(form => form.category === "AUTH")
  )

  React.useEffect(() => {
    if (!hasForm) dispatch(addForm({ category: "AUTH" }))
    dispatch(updateFormNotLoading())
  }, [])

  const registerOptionsData = useOptions(registerUserOptions, {
    key: "REGISTER_USER_FORM",
  })

  const loginOptionsData = useOptions(loginUserOptions, {
    key: "LOGIN_USER_FORM",
  })

  const isUserOptionsData = useOptions(isUserOptions, {
    key: "IS_USER",
  })

  const formService3 = {
    mode: "OPTIONS",
    options: registerOptionsData,
    submit: formvalues => {
      dispatch(registerUser({ params: formvalues }))
    },
  }

  const formService2 = {
    mode: "OPTIONS",
    options: loginOptionsData,
    submit: formValues => {
      dispatch(loginUser({ params: formValues }))
    },
  }

  const formService1 = {
    mode: "OPTIONS",
    options: isUserOptionsData,
    submit: formValues => {
      dispatch(IsUser({ params: formValues }))
    },
  }

  const sendResetPasswordEmail = async event => {
    dispatch(resetPassword({}))
  }

  const proceedByToken = async event => {
    dispatch(tokenRegisterUser({}))
  }

  console.log({ registerOptionsData, loginOptionsData, isUserOptionsData })

  if (!registerOptionsData || !loginOptionsData || !isUserOptionsData)
    return null

  return (
    <>
      {authFormState === 0 && (
        <AuthCard
          subHeaderText={t`We'll first need your contact details to ensure your privacy.`}
          additionalComponents={
            <Box align="center">
              <Text size="small">
                <Trans>
                  <u>No Credit Card Required</u>.
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
      )}
      {authFormState === 1 && (
        <AuthCard
          subHeaderText={t`You have already registered with WillCraft. Please enter your Password to Login.`}
          additionalComponents={
            <Box align="center">
              <Text size="small">
                <Trans>Can't remember your Password?</Trans>
              </Text>
              <Button
                onClick={sendResetPasswordEmail}
                plain
                label={
                  <Text size="small">
                    <Trans>
                      <u>Reset Password Here.</u>
                    </Trans>
                  </Text>
                }
              />
            </Box>
          }
        >
          <FormFactory
            formService={formService2}
            onCancel={e => {
              dispatch(cancelRegisterLogin())
              dispatch(updateFormNotLoading())
            }}
          />
        </AuthCard>
      )}

      {authFormState === 2 && (
        <AuthCard
          subHeaderText={t`Enter your desired password to register.`}
          additionalComponents={
            <Box align="center">
              <Text size="small">
                <Trans>
                  Registration is <u>absolutely free</u>.
                </Trans>
              </Text>
              <Button
                onClick={proceedByToken}
                plain
                label={
                  <Text size="small">
                    <Trans>
                      <u>Proceed without Registering.</u>
                    </Trans>
                  </Text>
                }
              />
            </Box>
          }
        >
          <FormFactory
            formService={formService3}
            onCancel={e => {
              dispatch(cancelRegisterLogin())
              dispatch(updateFormNotLoading())
            }}
          />
        </AuthCard>
      )}
    </>
  )
}

export default Auth
