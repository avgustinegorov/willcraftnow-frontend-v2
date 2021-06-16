import { Box, Text, Button, Grid, Stack } from "grommet"
import React from "react"

import Dots from "../../components/Dots"

import trackCustomEvent from "../../services/trackCustomEvent"

const CheckoutPanel = ({ children, loading }) => {
  const panel = {}
  React.Children.map(children, (child, index) => {
    panel[child.type.displayName] = child
  })
  const { PanelHeader, PanelContent, PanelButton } = panel
  React.useEffect(() => {
    trackCustomEvent({
      category: "Checkout",
      action: "Checkout",
    })
  }, [])

  return (
    <Stack fill interactiveChild="first">
      <Grid
        fill
        columns={["auto"]}
        rows={["auto", "flex", "auto"]}
        gap="medium"
        pad="medium"
      >
        <Box align="center">{PanelHeader}</Box>
        {PanelContent && (
          <Box fill justify="center">
            {PanelContent}
          </Box>
        )}
        <Box>{PanelButton}</Box>
      </Grid>
      {loading && (
        <Box fill align="center" justify="center" background="white">
          <Box width="30%">
            <Dots.Plain />
          </Box>
        </Box>
      )}
    </Stack>
  )
}

const PanelHeader = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>
}
PanelHeader.displayName = "PanelHeader"
CheckoutPanel.Header = PanelHeader

const PanelContent = ({ children }) => {
  if (children.length === 0) {
    throw Error("Please include panel content")
  }
  return children
}
PanelContent.displayName = "PanelContent"
CheckoutPanel.Content = PanelContent

const PanelButton = props => {
  return <Button {...props} />
}
PanelButton.displayName = "PanelButton"
CheckoutPanel.Button = PanelButton

export default CheckoutPanel
