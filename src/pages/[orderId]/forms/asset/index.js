import { Box, Button, Text } from "grommet"
import { Checkmark, Close } from "grommet-icons"
import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch } from "react-redux"
import { t } from "@lingui/macro"
import { useLocation } from "@reach/router"

import FormLayout from "../../../../components/FormLayout"
import assetList from "../../../../components/AssetsAllocations/assetList"

import { cancelForm, continueForm } from "../../../../reducers/forms"
import withOrderData from "../../../../components/withOrderData"

const AssetCategoryForm = ({ orderId }) => {
  const [value, setValue] = React.useState(null)
  const dispatch = useDispatch()

  const onButtonClick = buttonType => event => {
    if (buttonType === "cancel") {
      dispatch(cancelForm())
    } else if (buttonType === "AddAsset") {
      const assetType = value
      const nextURL = `/${orderId}/forms/asset/${assetType}`
      dispatch(continueForm({ redirectPath: nextURL, data: {} }))
    }
  }

  return (
    <I18n>
      {({ i18n }) => (
        <FormLayout>
          <FormLayout.Header headerText={t`Add Asset`} />

          <FormLayout.Content>
            <Box direction="row" wrap align="center" justify="center">
              {assetList.map(item => (
                <Box
                  onClick={() => setValue(item.asset_type)}
                  align="center"
                  pad="medium"
                  margin="medium"
                  background={
                    item.asset_type === value
                      ? { color: "brand", opacity: "weak" }
                      : null
                  }
                  round="medium"
                  width="small"
                >
                  <item.icon size="large" />
                  <Text size="small">{i18n._(item.name)}</Text>
                </Box>
              ))}
            </Box>
            {assetList.map(
              item =>
                item.asset_type === value && (
                  <Box
                    border
                    round="medium"
                    pad="medium"
                    width="large"
                    gap="small"
                  >
                    {item.content.map(contentItem => (
                      <Box direction="row" gap="small">
                        {contentItem.includes === null ? (
                          ""
                        ) : contentItem.includes ? (
                          <Checkmark color="brand" />
                        ) : (
                          <Close />
                        )}

                        <Text
                          size={
                            contentItem.includes === null ? "xsmall" : "medium"
                          }
                        >
                          {i18n._(contentItem.content)}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                )
            )}
            <Box
              direction="row-responsive"
              gap="large"
              margin={{ vertical: "large" }}
            >
              <Button onClick={onButtonClick("cancel")} label={"Cancel"} />
              <Button
                primary
                disabled={!value}
                onClick={onButtonClick("AddAsset")}
                label={"Add Asset"}
              />
            </Box>
          </FormLayout.Content>
        </FormLayout>
      )}
    </I18n>
  )
}

export default withOrderData(AssetCategoryForm)
