import { Text, Box, Button } from "grommet"
import React from "react"
import { graphql } from "gatsby"
import { t, Trans } from "@lingui/macro"
import { useDispatch, useSelector } from "react-redux"

import FlatAuthCard from "../../components/FlatAuthCard"
import FormFactory from "../../FormFactory"

import navigate from "../../utils/navigate"

import { useOptions } from "../../reducers/options/hooks"
import {
  isUserOptions,
  loginUserOptions,
  registerUser,
  registerUserOptions,
  resetPassword,
} from "../../reducers/user"
import {
  cancelRegisterLogin,
  IsUser,
  loginUser,
  tokenRegisterUser,
} from "../../reducers/user/actions"

const PartnerAuth = props => {
  const dispatch = useDispatch()
  const { authFormState } = useSelector(state => state.user.auth)

  const partner_client_id =
    props.data.allSitePartner.edges[0].node.application.client_id

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
      dispatch(registerUser({ params: { ...formvalues, partner_client_id } }))
    },
    debug: true,
  }

  const formService2 = {
    mode: "OPTIONS",
    options: loginOptionsData,
    submit: formValues => {
      dispatch(loginUser({ params: { ...formValues, partner_client_id } }))
    },
    debug: true,
  }

  const formService1 = {
    mode: "OPTIONS",
    options: isUserOptionsData,
    submit: formValues => {
      dispatch(IsUser({ params: formValues }))
    },
    debug: true,
  }

  const sendResetPasswordEmail = async event => {
    dispatch(resetPassword({}))
  }

  const proceedByToken = async event => {
    dispatch(tokenRegisterUser({ params: partner_client_id }))
  }

  return (
    <>
      {authFormState === 0 && (
        <FlatAuthCard
          {...props}
          initial={true}
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
        </FlatAuthCard>
      )}
      {authFormState === 1 && (
        <FlatAuthCard
          {...props}
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
            onCancel={e => dispatch(cancelRegisterLogin())}
          />
        </FlatAuthCard>
      )}

      {authFormState === 2 && (
        <FlatAuthCard
          {...props}
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
            onCancel={e => dispatch(cancelRegisterLogin())}
          />
        </FlatAuthCard>
      )}
    </>
  )
}

export const query = graphql`
  query($name: String!) {
    allSitePartner(filter: { name: { eq: $name } }) {
      edges {
        node {
          name
          application {
            name
            authorization_grant_type
            client_id
            client_type
            id
            skip_authorization
          }
          discount_applied_times
          id
          logo
          localImage {
            childImageSharp {
              gatsbyImageData(
                width: 660
                placeholder: TRACED_SVG
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          partner
          referred_users
        }
      }
    }
  }
`

export default PartnerAuth
