import { Box, Heading, Text } from "grommet"
import React from "react"

import { I18n } from "@lingui/react"

const FormHeader = ({ children, headerText, subHeaderText }) => {
  const panel = {}
  React.Children.map(children, (child, index) => {
    panel[child.type.displayName] = child
  })
  const { Header, SubHeader } = panel
  const headerProps = {
    level: 1,
    size: "small",
    margin: "xsmall",
  }

  const subHeaderProps = { size: "small", color: "brand", textAlign: "center" }

  return (
    <I18n>
      {({ i18n }) => {
        if (!Header && headerText)
          headerProps["dangerouslySetInnerHTML"] = {
            __html: i18n._(headerText),
          }
        if (!SubHeader && subHeaderText)
          subHeaderProps["dangerouslySetInnerHTML"] = {
            __html: i18n._(subHeaderText),
          }
        return (
          <Box align="center">
            <Heading {...headerProps}>{Header}</Heading>
            <Text {...subHeaderProps}>{SubHeader}</Text>
          </Box>
        )
      }}
    </I18n>
  )
}
FormHeader.displayName = "FormHeader"

const Header = ({ children }) => {
  if (children.length === 0) {
    throw Error("Please include panel content")
  }
  return children
}
Header.displayName = "Header"
FormHeader.Header = Header

const Sub = ({ children }) => {
  if (children.length === 0) {
    throw Error("Please include panel content")
  }
  return children
}
Sub.displayName = "Sub"
FormHeader.Sub = Sub

export default FormHeader
