import { Button } from "grommet"
import React from "react"

import { Trans } from "@lingui/macro"

import { useIsLoggedIn } from "../../reducers/user/hooks"
import navigate from "../../utils/navigate"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../reducers/user"

const LoginButton = ({ toggleSidebar }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useIsLoggedIn()
  return (
    <Button
      size="small"
      label={isLoggedIn ? <Trans>Logout</Trans> : <Trans>Login</Trans>}
      onClick={
        !isLoggedIn
          ? () => {
              toggleSidebar && toggleSidebar()
              navigate("/")
            }
          : () => {
              toggleSidebar && toggleSidebar()
              dispatch(logoutUser())
            }
      }
    />
  )
}

export default LoginButton
