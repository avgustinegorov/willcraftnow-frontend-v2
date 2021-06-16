import { useDispatch, useSelector } from "react-redux"
import React from "react"
export const useOptions = (action, params = {}) => {
  const dispatch = useDispatch()
  const resolvedAction = action(params)

  const option =
    useSelector(store => store.options[resolvedAction.payload.key]) || null

  React.useEffect(() => {
    if (!option) {
      dispatch(resolvedAction)
    }
  }, [])

  return option
}
