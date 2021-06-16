import { Box, Button, Text, Layer } from "grommet"
import { FormNextLink, FormPreviousLink, StatusCritical } from "grommet-icons"
import { I18n } from "@lingui/react"
import React from "react"
import { useSelector } from "react-redux"
import { Trans } from "@lingui/macro"

import { panelValidator } from "../utils/panelValidator"
import navigate from "../../utils/navigate"
import trackCustomEvent from "../../services/trackCustomEvent"

import { useAssetCategories } from "../../reducers/assets/hooks"
import { useUserDetails } from "../../reducers/user/hooks"
import { useEntityData } from "../../reducers/entities/hooks"
import { useAppointments } from "../../reducers/appointments/hooks"

const PanelButtons = ({
  backURL,
  nextURL,
  backLabel,
  nextLabel,
  orderData,
}) => {
  const [error, setError] = React.useState(null)
  const state = useSelector(state => state)

  const { id: orderId, order_type: orderType } = orderData
  const assets = useAssetCategories({ orderId })
  const userDetails = useUserDetails()
  const entities = useEntityData({ orderId })
  const appointments = useAppointments({ orderId, orderType })

  const onBackClick = () => {
    const url = backURL ? `/${orderId}/panel/` + backURL : `/`
    navigate(url)
  }

  const onNextClick = () => {
    const errorString = panelValidator(
      state,
      orderData,
      assets,
      entities,
      appointments,
      nextURL
    )

    if (errorString) {
      setError(errorString)
    } else {
      trackCustomEvent({
        category: "CustomizeProduct",
        action: "nextURL",
        label: nextURL,
      })
      const url = `/${orderId}/panel/` + nextURL
      navigate(url)
    }
  }

  return (
    <I18n>
      {({ i18n }) => (
        <>
          <Box
            direction="row-responsive"
            justify="evenly"
            width={{ max: "xlarge" }}
            fill="horizontal"
            gap="small"
          >
            {backLabel && (
              <Button
                size="small"
                onClick={onBackClick}
                icon={<FormPreviousLink />}
                label={
                  <Text size="small">
                    <Trans>Back :</Trans>&nbsp;{i18n._(backLabel)}
                  </Text>
                }
              />
            )}
            {nextLabel && (
              <Button
                reverse
                size="small"
                onClick={onNextClick}
                icon={<FormNextLink />}
                label={
                  <Text size="small">
                    <Trans>Next :</Trans>&nbsp;{i18n._(nextLabel)}
                  </Text>
                }
              />
            )}
          </Box>
          {error && (
            <Layer
              margin="medium"
              responsive={false}
              // background={{ opacity: "strong" }}
            >
              <Box align="center" overflow="hidden" pad="large" width="medium">
                <Text size="xxlarge" textAlign="center">
                  <Trans>Oops, something went wrong.</Trans>
                </Text>
                <Box margin="large" align="center" fill>
                  <StatusCritical color="status-critical" size="xlarge" />
                  <Text
                    size="medium"
                    weight="normal"
                    margin={{ top: "small", bottom: "none" }}
                    textAlign="center"
                    wordBreak="break-word"
                  >
                    {i18n._(error)}
                  </Text>
                  <Text
                    size="xsmall"
                    weight="normal"
                    margin={{ top: "small" }}
                    textAlign="center"
                  >
                    <Trans>
                      If you face this problem continuously, Please contact
                      directly us at enquiries@willcraftnow.com.
                    </Trans>
                  </Text>
                </Box>
                <Button
                  label={"Close"}
                  onClick={() => setError(null)}
                  margin={{ top: "small" }}
                />
              </Box>
            </Layer>
          )}
        </>
      )}
    </I18n>
  )
}

PanelButtons.displayName = "PanelButtons"

export default PanelButtons
