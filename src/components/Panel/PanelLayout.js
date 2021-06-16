import { Box, Grid } from "grommet"
import React from "react"

import PanelButtons from "./PanelButtons"
import PanelHeader from "./PanelHeader"

const PanelLayout = ({ children, isloaded, tips }) => {
  const panel = {}
  React.Children.map(children, (child, index) => {
    panel[child.type.displayName] = child
  })
  const { PanelHeader, PanelAlerts, PanelContent, PanelButtons } = panel

  return (
    <Box
      className="PanelGrid"
      pad={{ horizontal: "small", vertical: "large" }}
      align="center"
      fill
    >
      <Grid width="large" rows={["auto", "auto", "flex", "auto"]} fill>
        <Box fill="horizontal" align="center">
          {PanelHeader}
        </Box>
        <Box fill="horizontal" align="center">
          {PanelAlerts}
        </Box>
        <Box margin={{ vertical: "large" }} align="center">
          {PanelContent}
        </Box>
        <Box align="center">{PanelButtons}</Box>
      </Grid>
    </Box>
  )
}

const PanelAlerts = ({ children }) => {
  if (children.length === 0) {
    return null
  }
  return children
}
PanelAlerts.displayName = "PanelAlerts"
PanelLayout.Alerts = PanelAlerts

const PanelContent = ({ children }) => {
  if (children.length === 0) {
    throw Error("Please include panel content")
  }
  return children
}
PanelContent.displayName = "PanelContent"
PanelLayout.Content = PanelContent

PanelLayout.Header = PanelHeader
PanelLayout.Btns = PanelButtons

export default PanelLayout
