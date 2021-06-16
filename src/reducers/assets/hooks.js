import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { assetOptions, fetchAssets } from "./actions"
import { getDetails } from "../utils"

import { useOptions } from "../options/hooks"
import { useEntityData } from "../entities/hooks"
import { useOrderData } from "../orders/hooks"

export const useAssetData = ({ orderId, details = true } = {}) => {
  const dispatch = useDispatch()

  const { data: assets, isLoaded: assetsIsLoaded } = useSelector(
    store => store.assets
  )

  React.useEffect(() => {
    if (!assetsIsLoaded) {
      dispatch(fetchAssets())
    }
  }, [])

  const residualOptions = useOptions(assetOptions, {
    assetType: "Residual",
    orderId,
  })
  const companyOptions = useOptions(assetOptions, {
    assetType: "Company",
    orderId,
  })
  const investmentOptions = useOptions(assetOptions, {
    assetType: "Investment",
    orderId,
  })
  const insuranceOptions = useOptions(assetOptions, {
    assetType: "Insurance",
    orderId,
  })
  const bankaccountOptions = useOptions(assetOptions, {
    assetType: "BankAccount",
    orderId,
  })
  const realestateOptions = useOptions(assetOptions, {
    assetType: "RealEstate",
    orderId,
  })

  if (!details && assetsIsLoaded) return assets

  if (
    details &&
    assetsIsLoaded &&
    residualOptions &&
    companyOptions &&
    investmentOptions &&
    insuranceOptions &&
    bankaccountOptions &&
    realestateOptions
  ) {
    return [
      ...getDetails(
        residualOptions,
        assets.filter(asset => asset.asset_type.toUpperCase() === "RESIDUAL")
      ),
      ...getDetails(
        companyOptions,
        assets.filter(asset => asset.asset_type.toUpperCase() === "COMPANY")
      ),
      ...getDetails(
        insuranceOptions,
        assets.filter(asset => asset.asset_type.toUpperCase() === "INSURANCE")
      ),
      ...getDetails(
        investmentOptions,
        assets.filter(asset => asset.asset_type.toUpperCase() === "INVESTMENT")
      ),
      ...getDetails(
        bankaccountOptions,
        assets.filter(asset => asset.asset_type.toUpperCase() === "BANKACCOUNT")
      ),
      ...getDetails(
        realestateOptions,
        assets.filter(asset => asset.asset_type.toUpperCase() === "REALESTATE")
      ),
    ]
  }
}

export const getAllocations = ({
  asset,
  allocations,
  entities,
  allocationId = null,
}) => {
  const filteredAllocations = allocations.filter(
    allocation =>
      allocation.asset === asset.id &&
      allocation.parent_allocation === allocationId
  )

  return {
    allocations: filteredAllocations.map(allocation => ({
      ...allocation,
      entity: entities.find(
        entity => entity.id === parseInt(allocation.entity)
      ),
      asset,
      ...getAllocations({
        asset,
        allocations,
        entities,
        allocationId: allocation.id,
      }),
    })),
    total_allocation: filteredAllocations.reduce(
      (acc, allocation) => acc + parseFloat(allocation.allocation_percentage),
      0
    ),
  }
}

export const useAssetCategories = ({ orderId }) => {
  const orderData = useOrderData({ orderId })
  const entities = useEntityData({ orderId })
  const assets = useAssetData({ orderId })

  if (!entities.length || !assets || !orderData) return null

  const { allocations = [] } = orderData
  return assets.reduce((acc, asset) => {
    if (!(asset.asset_type in acc)) {
      acc[asset.asset_type] = []
    }
    acc[asset.asset_type].push({
      ...asset,
      ...getAllocations({ asset, allocations, entities }),
    })
    return acc
  }, {})
}
