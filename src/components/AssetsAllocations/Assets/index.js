import { Box } from "grommet"
import React from "react"
import { useDispatch } from "react-redux"
import { t } from "@lingui/macro"

import { PanelLayout } from "../../../components/Panel"
import AddElementButton from "../../../components/AddElementButton"
import AlertBox from "../../../components/AlertBox"
import Stepper from "../../../components/Stepper"
import DetailRender from "../../../components/DetailRender"
import AssetsLayout from "../../../components/AssetsAllocations/AssetsLayout"
import withOrderData from "../../../components/withOrderData"

import { deleteAsset } from "../../../reducers/assets"
import { redirectForm } from "../../../reducers/forms"

export const sortForAssetCategory = (orderData, assetCategoryNameArray) => {
  /** this function accepts order data, and assetCategoryNameArray as Array
      Returns a dictionary with asset categories with value being a list of assets
  **/
  if (!orderData) {
    return null
  }

  const sortedAssetsDict = {}
  assetCategoryNameArray.forEach(assetCategoryName => {
    sortedAssetsDict[assetCategoryName] = orderData.assets.filter(el => {
      return el.asset_type === assetCategoryName
    })
  })
  return sortedAssetsDict
}

const Assets = ({ orderData, orderId, location: { pathname } }) => {
  const dispatch = useDispatch()
  const assetClasses = sortForAssetCategory(orderData, [
    "BankAccount",
    "Insurance",
    "Company",
    "Investment",
    "RealEstate",
  ])

  const onAssetClick = async ({ action, asset }) => {
    if (action !== "DELETE") {
      dispatch(
        redirectForm({
          category: "ASSET",
          action: action,
          redirectPath:
            action === "ADD"
              ? `/${orderId}/forms/asset/`
              : `/${orderId}/forms/asset/${asset.asset_type}/${asset.id}/`,
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

  return (
    <PanelLayout>
      <PanelLayout.Header
        headerText={t`All Assets`}
        subHeaderText={t`Here's a list of all your assets. `}
      />
      <PanelLayout.Alerts>
        <AlertBox
          alertText={t`
          The assets listed here will be included in your Schedule of Assets. This should be as complete as possible.`}
        />
      </PanelLayout.Alerts>
      <PanelLayout.Content>
        <Stepper>
          {Object.entries(assetClasses).map(
            ([assetClassName, assets], index) => (
              <Stepper.Panel headerText={assetClassName}>
                <Stepper.Body>
                  <AssetsLayout>
                    {assets.map(asset => (
                      <AssetsLayout.Panel>
                        <AssetsLayout.Description
                          asset={asset}
                          onClick={onAssetClick}
                        />
                        <AssetsLayout.AssetDetails>
                          <DetailRender
                            header={asset.display_name}
                            data={asset}
                          />
                        </AssetsLayout.AssetDetails>
                      </AssetsLayout.Panel>
                    ))}
                  </AssetsLayout>
                </Stepper.Body>
              </Stepper.Panel>
            )
          )}
        </Stepper>
        <Box fill="horizontal" margin={{ vertical: "large" }} align="center">
          <AddElementButton
            onClick={() => onAssetClick({ action: "ADD" })}
            label={t`Add Asset`}
          />
        </Box>
      </PanelLayout.Content>

      <PanelLayout.Btns
        backLabel={t`Interface`}
        nextLabel={t`Checkout`}
        nextURL={"checkout"}
        orderData={orderData}
      />
    </PanelLayout>
  )
}

export default withOrderData(Assets)
