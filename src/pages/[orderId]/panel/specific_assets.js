import { Box } from "grommet"
import React from "react"
import { useDispatch } from "react-redux"
import { t } from "@lingui/macro"

import { PanelLayout } from "../../../components/Panel"
import AlertBox from "../../../components/AlertBox"
import AddElementButton from "../../../components/AddElementButton"
import Allocations from "../../../components/AssetsAllocations/Allocations"
import Assets from "../../../components/AssetsAllocations/AssetsLayout"
import Stepper from "../../../components/Stepper"

import { deleteAllocation } from "../../../reducers/allocations"
import { deleteAsset } from "../../../reducers/assets"
import withOrderData from "../../../components/withOrderData"
import { redirectForm } from "../../../reducers/forms"
import { useAssetCategories } from "../../../reducers/assets/hooks"

const getAssetDisplayName = assetKey => {
  const label_map = {
    RealEstate: t`Real Estate`,
    BankAccount: t`Bank Account`,
    Insurance: t`Insurance Policy`,
    Investment: t`Investment Account`,
    Company: t`Company Ordinary Shares`,
    Residual: t`Residual Asset`,
  }
  return label_map[assetKey]
}

const SpecificAssets = ({ orderData, orderId, location: { pathname } }) => {
  const dispatch = useDispatch()
  const assets = useAssetCategories({ orderId })
  const onAssetClick = async ({ action, asset }) => {
    if (action !== "DELETE") {
      dispatch(
        redirectForm({
          category: "ASSET",
          action: action,
          redirectPath:
            action === "ADD"
              ? `/${orderId}/forms/asset`
              : `/${orderId}/forms/asset/${asset.asset_type}/${asset.id}`,
          data: {},
          pathname: pathname,
        })
      )
    } else {
      dispatch(
        deleteAsset({ orderId, assetType: asset.asset_type, assetId: asset.id })
      )
    }
  }

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
        headerText={t`Specific Assets`}
        subHeaderText={t`Are there any assets that you wish to give to particular beneficairies?`}
      />
      <PanelLayout.Alerts>
        <AlertBox
          alertText={t`
          Allocations listed here have priority and will be distributed <u>before</u> the general allocations are distributed.`}
        />
        <AlertBox
          alertText={t`
          You <u>do not</u> have to list all your assets, only the ones you wish to give to particular beneficiaries.`}
        />
      </PanelLayout.Alerts>
      <PanelLayout.Content>
        <Stepper>
          {Object.entries(assets)
            .filter(([assetClassName, assets]) => assetClassName !== "Residual")
            .map(([assetClassName, assets], index) => (
              <Stepper.Panel
                key={assetClassName}
                headerText={getAssetDisplayName(assetClassName)}
                show={!!assets.length}
              >
                <Stepper.Body>
                  <Assets>
                    {assets.map(asset => (
                      <Assets.Panel key={asset.id}>
                        <Assets.Description
                          asset={asset}
                          onClick={onAssetClick}
                        />
                        <Assets.Allocations>
                          <Allocations
                            onAddAllocation={
                              asset.total_allocation < 100
                                ? () => onClick({ action: "ADD", asset })
                                : null
                            }
                          >
                            {asset.allocations.map((allocation, index) => (
                              <Allocations.AllocationPanel
                                key={`entities.map_${index}`}
                              >
                                <Allocations.Allocation
                                  asset={asset}
                                  allocation={allocation}
                                  onClick={onClick}
                                />
                                {allocation.entity.entity_type !==
                                  "Charity" && (
                                  <Allocations.SubstituteAllocations
                                    index={index}
                                    onAddSubsituteAllocation={
                                      allocation.total_allocation < 100
                                        ? () =>
                                            onClick({
                                              action: "ADD",
                                              asset,
                                              parentAllocation: allocation,
                                            })
                                        : null
                                    }
                                  >
                                    {allocation.allocations.map(
                                      (sub_allocation, index) => (
                                        <Allocations.Allocation
                                          asset={asset}
                                          parentAllocation={allocation}
                                          allocation={sub_allocation}
                                          onClick={onClick}
                                          key={`sub_allocation.map_${index}`}
                                        />
                                      )
                                    )}
                                  </Allocations.SubstituteAllocations>
                                )}
                              </Allocations.AllocationPanel>
                            ))}
                          </Allocations>
                        </Assets.Allocations>
                      </Assets.Panel>
                    ))}
                  </Assets>
                </Stepper.Body>
              </Stepper.Panel>
            ))}
        </Stepper>
        <Box fill="horizontal" margin={{ vertical: "large" }} align="center">
          <AddElementButton
            onClick={() => onAssetClick({ action: "ADD" })}
            label={t`Add Asset`}
          />
        </Box>
      </PanelLayout.Content>
      <PanelLayout.Btns
        backLabel={t`Default Allocation`}
        backURL={"residual_assets"}
        nextLabel={t`Appointments`}
        nextURL={"appointments"}
        orderData={orderData}
        orderId={orderId}
      />
    </PanelLayout>
  )
}

export default withOrderData(SpecificAssets)
