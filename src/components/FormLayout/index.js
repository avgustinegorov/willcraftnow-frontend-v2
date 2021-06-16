import { Box, Grid } from "grommet"
import React from "react"

import AlertBox from "../AlertBox"
import FormHeader from "./FormHeader"

const FormLayout = ({ children, isloaded, tips }) => {
  const panel = {}
  React.Children.map(children, (child, index) => {
    panel[child.type.displayName] = child
  })
  const { FormHeader, AlertBox, Content } = panel

  return (
    <Box gap="medium" fill className="PanelGrid" pad="medium" width="large">
      <Box align="center">{FormHeader}</Box>
      {AlertBox && <Box align="center">{AlertBox}</Box>}
      <Box align="center">{Content}</Box>
    </Box>
  )
}

FormLayout.Header = FormHeader

const Content = ({ children }) => {
  if (children.length === 0) {
    throw Error("Please include panel content")
  }
  return children
}
Content.displayName = "Content"
FormLayout.Content = Content

FormLayout.Alerts = AlertBox

export default FormLayout
