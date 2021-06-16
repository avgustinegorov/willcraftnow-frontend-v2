import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { userOptions, getUser } from "./actions"
import { useOptions } from "../options/hooks"
import { getDetails } from "../utils"

export const isExpired = tokenExpiry => {
  const expiryDate = new Date(parseInt(tokenExpiry))
  const today = new Date()
  return today > expiryDate
}

export const useIsLoggedIn = (action, params = {}) => {
  const dispatch = useDispatch()
  const { email, status, token, refreshToken, tokenExpiry } = useSelector(
    state => state.user.auth
  )

  return token && !isExpired(tokenExpiry) // handwaiving here
}

export const useUserDetails = ({ details = true } = {}) => {
  const dispatch = useDispatch()
  const { data: userDetails, isLoaded: userIsLoaded } = useSelector(
    store => store.user
  )
  const options = useOptions(userOptions, {})

  React.useEffect(() => {
    if (!userIsLoaded) {
      dispatch(getUser())
    }
  }, [])

  if (userIsLoaded) {
    if (details) {
      return options ? getDetails(options, userDetails) : undefined
    }

    return userDetails
  }
}
