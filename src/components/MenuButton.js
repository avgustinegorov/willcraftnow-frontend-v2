import { Box, Button, Text } from "grommet"
import { FormDown, FormNext } from "grommet-icons"
import React from "react"

const MenuButton = ({ label, open, submenu, ...rest }) => {
  const Icon = open ? FormDown : FormNext
  return (
    <Button hoverIndicator="background" {...rest}>
      <Box
        margin={submenu ? { left: "small" } : undefined}
        direction="row"
        align="center"
        pad="small"
        gap="xsmall"
      >
        <Icon color="brand" />
        <Text>{label}</Text>
      </Box>
    </Button>
  )
}

export default MenuButton
