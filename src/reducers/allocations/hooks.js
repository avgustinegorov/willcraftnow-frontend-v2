import { useAssetData } from "../assets/hooks"

export const useAllowableAllocations = ({
  action,
  assetId,
  allocationId,
  parentAllocationId,
  orderData,
  orderId,
}) => {
  const assets = useAssetData({ orderId, details: false }) || []
  const { allocations } = orderData
  const allocation = allocations.find(
    allocation => String(allocation.id) === allocationId
  )
  const parentAllocation = allocations.find(
    allocation => String(allocation.id) === parentAllocationId
  )

  const asset = assets.find(asset => String(asset.id) === assetId)

  switch (action) {
    case "ADD_SUB":
      // the beneficiary passed here is the parent
      if (allocation.allocation_percentage) {
        return "Percentage"
      } else {
        return "Cash"
      }
    case "EDIT_SUB":
      // the beneficiary passed here is the parent
      if (allocation.allocation_percentage) {
        return "Percentage"
      } else {
        return "Cash"
      }
    case "EDIT":
      var subAllocations = allocations.filter(
        allocation =>
          allocation.parent_allocation &&
          String(allocation.parent_allocation) === allocationId
      )
      if (subAllocations.length > 0) {
        if (
          subAllocations.some(sub_allocation => {
            return sub_allocation.allocation_percentage
          })
        ) {
          return "Percentage"
        } else {
          return "Cash"
        }
      } else {
        if (allocation.allocation_percentage) {
          return "Percentage"
        } else {
          return "Cash"
        }
      }
    case "ADD":
      if (parentAllocation) {
        if (parentAllocation.allocation_percentage) {
          return "Percentage"
        } else {
          return "Cash"
        }
      }

      if (asset?.asset_type !== "BankAccount") {
        return "Percentage"
      } else {
        return "Both"
      }

    default:
      return "Percentage"
  }
}
