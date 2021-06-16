import { useEntityData } from "../entities/hooks"
import { useOrderData } from "../orders/hooks"

const appointmentConst = {
  WILL: ["EXECUTOR", "SUB_EXECUTOR", "GUARDIAN", "WITNESS"],
  LPA: ["DONEE", "REPLACEMENT_DONEE"],
  SCHEDULE_OF_ASSETS: [],
}

export const useAppointments = ({ orderId, orderType }) => {
  const orderData = useOrderData({ orderId })
  const entities = useEntityData({ orderId })

  if (!entities || !orderData) return null

  const { persons = [] } = orderData

  const appointmentCategories = appointmentConst[orderType]
  const appointments = persons.reduce((acc, person) => {
    person.entity_roles.forEach(role => {
      if (appointmentCategories.includes(role)) {
        if (!(role in acc)) {
          acc[role] = []
        }
        acc[role].push({
          ...person,
          entity_details: entities.find(entity => entity.id === person.id),
        })
      }
    })
    return acc
  }, {})

  appointmentCategories.forEach(category => {
    if (!(category in appointments)) {
      appointments[category] = []
    }
  })

  return appointments
}
