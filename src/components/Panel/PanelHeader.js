import { Box, Heading, Text } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"

const PanelHeader = ({ headerText, subHeaderText }) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box align="center">
          <Heading
            level={1}
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
PanelHeader.displayName = "PanelHeader"
export default PanelHeader
