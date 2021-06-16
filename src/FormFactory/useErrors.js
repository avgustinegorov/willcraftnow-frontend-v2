import React from "react"
import { useActiveFormCategory } from "../reducers/forms/hooks"

export const useErrors = props => {
  const { errors = {}, options = {} } = props
  const [errorState, setErrorState] = React.useState({})

  const { errors: apiErrors = {} } = useActiveFormCategory()

  React.useEffect(() => {
    setErrorState(errorState => ({
      non_field_errors: null,
      ...Object.fromEntries(
        Object.entries(options).map(([key, value]) => ({ [key]: null }))
      ),
      ...errorState,
      ...apiErrors,
      ...errors,
    }))
  }, [apiErrors, options, setErrorState])

  const clearErrorState = fieldKey => {
    setErrorState({
      ...errorState,
      [fieldKey]: null,
      non_field_errors: null,
    })
  }

  return [errorState, clearErrorState]
}
