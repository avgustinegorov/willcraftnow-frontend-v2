import { Box, Heading, Text } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"

import AddElementButton from "../AddElementButton"

const DashboardPanel = ({ children, isloaded, tips }) => {
  const panel = {}
  React.Children.map(children, (child, index) => {
    panel[child.type.displayName] = child
  })
  const {
    PanelHeader,
    PanelDescription,
    PanelContent,
    AddElementButton,
  } = panel

  return (
    <Box fill>
      <Box fill="horizontal" align="center">
        {PanelHeader}
      </Box>
      <Box fill="horizontal" align="center">
        {PanelDescription}
      </Box>
      <Box
        fill="horizontal"
        margin={{ vertical: "medium" }}
        height="40vh"
        overflow="auto"
      >
        {PanelContent}
      </Box>
      <Box align="center">{AddElementButton}</Box>
    </Box>
  )
}

const PanelHeader = ({ headerText, subHeaderText }) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box align="center">
          <Heading
            level={2}
            size="small"
            margin="xsmall"
            textAlign="center"
            dangerouslySetInnerHTML={{ __html: i18n._(headerText) }}
          />
          <Text
            size="small"
            color="brand"
            textAlign="center"
            dangerouslySetInnerHTML={{ __html: i18n._(subHeaderText) }}
          />
        </Box>
      )}
    </I18n>
  )
}
DashboardPanel.Header = PanelHeader
PanelHeader.displayName = "PanelHeader"

const PanelDescription = ({ text }) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box align="center">
          <Text
            size="small"
            color="brand"
            textAlign="center"
            dangerouslySetInnerHTML={{ __html: i18n._(text) }}
          />
        </Box>
      )}
    </I18n>
  )
}
PanelDescription.displayName = "PanelDescription"
DashboardPanel.Description = PanelDescription

const PanelContent = ({ children }) => {
  if (children.length === 0) {
    throw Error("Please include panel content")
  }
  return children
}
PanelContent.displayName = "PanelContent"
DashboardPanel.Content = PanelContent

DashboardPanel.Btn = AddElementButton

export default DashboardPanel
