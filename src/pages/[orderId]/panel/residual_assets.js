import React from "react"
import { useDispatch } from "react-redux"
import { t } from "@lingui/macro"

import { PanelLayout } from "../../../components/Panel"
import AlertBox from "../../../components/AlertBox"
import Allocations from "../../../components/AssetsAllocations/Allocations"

import { deleteAllocation } from "../../../reducers/allocations"
import withOrderData from "../../../components/withOrderData"
import { redirectForm } from "../../../reducers/forms"
import { useAssetCategories } from "../../../reducers/assets/hooks"
import { Spinner } from "grommet"

const ResidualAssets = ({ orderData, orderId, location: { pathname } }) => {
  const assets = useAssetCategories({ orderId })
  const dispatch = useDispatch()

  if (!assets) return <Spinner />

  const { Residual: residualAsset } = assets
  const asset = residualAsset[0]
  const { allocations, total_allocation } = asset

  const onClick = async ({ action, asset, allocation, parentAllocation }) => {
    if (action !== "DELETE") {
      dispatch(
        redirectForm({
          category: "ALLOCATION",
          action: action,
          redirectPath: !!parentAllocation
            ? !!allocation
              ? `/${orderId}/forms/allocation/${asset.id}/parent/${parentAllocation.id}/${allocation.id}`
              : `/${orderId}/forms/allocation/${asset.id}/parent/${parentAllocation.id}`
            : !!allocation
            ? `/${orderId}/forms/allocation/${asset.id}/${allocation.id}`
            : `/${orderId}/forms/allocation/${asset.id}`,
          data: {},
          pathname: pathname,
        })
      )
    } else if (action === "DELETE") {
      dispatch(deleteAllocation({ orderId, allocationId: allocation.id }))
    }
  }

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`General Distribution of Assets`}
        subHeaderText={t`Let us know how you'd like to distribute your Estate.`}
      />
      <PanelLayout.Alerts>
        <AlertBox
          alertText={t`
          The General Distribution of Assets covers
          <u>all your assets in Singapore</u>. The percentages that you put
          in will be the default allocations for your entire estate.`}
        />
        <AlertBox
          alertText={t`
          If there are any <u>Particular Assets</u> that you wish to
          distribute to <u>Specific Beneficiaries</u>, or if you have
          <u>Particular Assets</u> that you wish to distribute in
          <u>different percentages</u> you may enter them at the
          <u>Next Step</u>.`}
        />
      </PanelLayout.Alerts>
      <PanelLayout.Content>
        <Allocations
          onAddAllocation={
            total_allocation < 100
              ? () => onClick({ action: "ADD", asset })
              : null
          }
        >
          {allocations.map((allocation, index) => (
            <Allocations.AllocationPanel key={`entities.map_${index}`}>
              <Allocations.Allocation
                asset={asset}
                onClick={onClick}
                allocation={allocation}
              />
              {allocation.entity.entity_type !== "Charity" && (
                <Allocations.SubstituteAllocations
                  index={index}
                  onAddSubsituteAllocation={() =>
                    onClick({
                      action: "ADD",
                      asset,
                      parentAllocation: allocation,
                    })
                  }
                >
                  {allocation.allocations.map((sub_allocation, index) => (
                    <Allocations.Allocation
                      asset={asset}
                      onClick={onClick}
                      key={`sub_beneficiary.map_${index}`}
                      parentAllocation={allocation}
                      allocation={sub_allocation}
                    />
                  ))}
                </Allocations.SubstituteAllocations>
              )}
            </Allocations.AllocationPanel>
          ))}
        </Allocations>
      </PanelLayout.Content>
      <PanelLayout.Btns
        backLabel={t`Interface`}
        backURL={null}
        nextLabel={t`Specific Assets`}
        nextURL={"specific_assets"}
        orderData={orderData}
        orderId={orderId}
      />
    </PanelLayout>
  )
}

export default withOrderData(ResidualAssets)
