import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchFirms } from "./actions"

export const useFirmData = () => {
  const dispatch = useDispatch()
  const { data: firms, isLoaded: firmsIsLoaded } = useSelector(
    store => store.firms
  )

  React.useEffect(() => {
    if (!firmsIsLoaded) {
      dispatch(fetchFirms())
    }
  }, [])

  return firms
}
