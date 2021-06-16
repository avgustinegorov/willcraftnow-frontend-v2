import { useDispatch, useSelector } from "react-redux"
import React from "react"

import { entityOptions, fetchEntitys } from "./actions"
import { getDetails } from "../utils"

import { useOptions } from "../options/hooks"

export const useEntityData = ({ orderId, details = true } = {}) => {
  const dispatch = useDispatch()

  const { data: entities, isLoaded: entitiesIsLoaded } = useSelector(
    store => store.entities
  )

  const charityOptions = useOptions(entityOptions, {
    entityType: "CHARITY",
    orderId,
  })
  const personOptions = useOptions(entityOptions, {
    entityType: "PERSON",
    orderId,
  })

  React.useEffect(() => {
    if (!entitiesIsLoaded) {
      dispatch(fetchEntitys())
    }
  }, [])

  if (details && charityOptions && personOptions) {
    return [
      ...getDetails(
        personOptions,
        entities.filter(entity => entity.entity_type.toUpperCase() === "PERSON")
      ),
      ...getDetails(
        charityOptions,
        entities.filter(
          entity => entity.entity_type.toUpperCase() === "CHARITY"
        )
      ),
    ]
  }

  return details ? [] : entities
}
