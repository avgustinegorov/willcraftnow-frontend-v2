import { Box, Grid, ResponsiveContext } from "grommet"
import React from "react"

import AssetDescription from "./AssetDescription"

const Assets = ({ children, onAddAsset }) => {
  const AssetPanels = React.Children.map(children, (child, index) =>
    child.type.displayName === "AssetPanel" ? child : null
  )
  return (
    <Box
      gap="large"
      border={{
        color: "border",
        size: "1px",
        style: "dashed",
        side: "between",
      }}
      style={{ display: "block" }}
    >
      {AssetPanels}
    </Box>
  )
}

const AssetPanel = ({ children }) => {
  const panel = {}
  React.Children.map(children, (child, index) => {
    panel[child.type.displayName] = child
  })
  const { AssetAlerts, Allocations, AssetDescription, AssetDetails } = panel

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Grid
          fill
          columns={size !== "large" ? ["auto"] : ["small", "auto"]}
          direction="horizontal"
          gap="small"
          align="center"
        >
          <Box pad="small">{AssetDescription}</Box>
          <Box margin="small">
            {AssetDetails}
            {AssetAlerts}
            {Allocations}
          </Box>
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  )
}

AssetPanel.displayName = "AssetPanel"
Assets.Panel = AssetPanel

const AssetDetails = ({ children }) => {
  if (children.length === 0) {
    return null
  }
  return children
}
AssetDetails.displayName = "AssetDetails"
Assets.AssetDetails = AssetDetails

const Allocations = ({ children }) => {
  if (children.length === 0) {
    return null
  }
  return children
}
Allocations.displayName = "Allocations"
Assets.Allocations = Allocations

const AssetAlerts = ({ children }) => {
  if (children.length === 0) {
    return null
  }
  return <Box>{children}</Box>
}
AssetAlerts.displayName = "AssetAlerts"
Assets.Alerts = AssetAlerts

Assets.Description = AssetDescription

export default Assets
