import { t } from "@lingui/macro"

import { sortForPersonsCategory } from "./sortForPersonsCategory"

export const panelValidator = (
  state,
  orderData,
  assets,
  entities,
  appointments,
  nextURL,
  i18n
) => {
  const { order_type: orderType } = orderData
  const donees = orderData.persons?.filter(person =>
    person.entity_roles.includes("DONEE")
  )

  if (orderType.toUpperCase() === "WILL") {
    switch (nextURL) {
      case "specific_assets":
        var residualAllocations = orderData.allocations.filter(
          allocation =>
            state.assets.data.find(asset => asset.id === allocation.asset)
              .asset_type === "Residual"
        )
        var rootResidualAllocations = residualAllocations.filter(
          allocation => !allocation.parent_allocation
        )
        var totalRootResidualAllocation = rootResidualAllocations.reduce(
          (acc, curr) => {
            acc += parseFloat(curr.allocation_percentage)
            return acc
          },
          0.0
        )

        for (var rootResidualAllocation of rootResidualAllocations) {
          var subAllocations = residualAllocations.filter(
            allocation =>
              allocation.parent_allocation === rootResidualAllocation.id
          )
          var totalSubAllocation = subAllocations.reduce((acc, curr) => {
            acc += parseFloat(curr.allocation_percentage)
            return acc
          }, 0.0)
          if (subAllocations.length !== 0 && totalSubAllocation !== 100) {
            return t`You have only distributed ${totalSubAllocation}% of the sub-allocations for the allocation to ${"entity.name"}. Please distribute 100%.`
          }
        }

        if (!totalRootResidualAllocation || totalRootResidualAllocation === 0) {
          return t`Please allocate 100% of your Estate.`
        } else if (totalRootResidualAllocation < 100) {
          return t`
            You've only allocated ${totalRootResidualAllocation}% of your Estate. Please allocate the full 100%.`
        } else {
          return null
        }

      case "arrangements":
        var executors = appointments.EXECUTOR
        var witnesses = appointments.WITNESS
        var witnessService = orderData.legal_services.find(
          service => service.service_type === "WITNESS"
        )

        if (executors.length < 1) {
          return t`Please appoint at least one Executor`
        } else if (executors.length > 4) {
          return t`You may only appoint a maximum of 4 Executors`
        } else if ((!witnesses || !witnesses.length) && !witnessService) {
          return t`Please appoint Witnesses.`
        } else if (!witnessService && witnesses.length < 2) {
          return t`Please appoint two Witness.`
        }

        break
      default:
        return null
    }
  } else if (orderType.toUpperCase() === "LPA") {
    switch (nextURL) {
      case "donee_powers":
        var err_msg = null
        if (donees.length < 1) {
          err_msg = t`Please appoint at least one Donee.`
        }
        if (
          !(
            orderData.legal_services &&
            orderData.legal_services.length > 0 &&
            orderData.legal_services[0].service_type === "LPA_CERTIFICATE"
          )
        ) {
          err_msg = t`Please appoint a Certificate Provider.`
        }
        return err_msg
      case "summary":
        var available_restrictions = {
          property_and_affairs_restrictions: donees.some(donee =>
            ["PROPERTY_AND_AFFAIRS", "BOTH"].includes(
              donee.donee_powers?.powers
            )
          ),
          personal_welfare_restrictions: donees.some(donee =>
            ["PROPERTY_AND_AFFAIRS", "BOTH"].includes(
              donee.donee_powers?.powers
            )
          ),
        }
        if (
          available_restrictions.property_and_affairs_restrictions &&
          !orderData.property_and_affairs_restrictions
        ) {
          return t`Please enter Restrictions for Property and Affairs.`
        }
        if (
          available_restrictions.personal_welfare_restrictions &&
          !orderData.personal_welfare_restrictions
        ) {
          return t`Please enter Restrictions for Personal Welfare.`
        }
        break
      default:
        return null
    }
  }
}
