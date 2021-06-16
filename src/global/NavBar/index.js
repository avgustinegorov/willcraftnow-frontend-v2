import { Box, ResponsiveContext, Anchor } from "grommet"
import React from "react"

import NavBarContent from "./NavBarContent"
import NavBarSecondaryContent from "./NavBarSecondaryContent"
import SidebarContent from "./SidebarContent"
import WillCraftIcon from "../../components/WillCraftIcon"
import navigate from "../../utils/navigate"

const NavBar = props => {
  const [sidebar, setSidebar] = React.useState(false)
  const toggleSidebar = () => setSidebar(!sidebar)

  const [mainKey, setMainKey] = React.useState(null)

  const sidebarProps = {
    sidebar,
    toggleSidebar,
  }

  const navProps = {
    mainKey,
    setMainKey,
  }
  return (
    <>
      <Box
        tag="header"
        align="center"
        justify="between"
        background="white"
        pad={{ horizontal: "none", vertical: "none" }}
        elevation="medium"
        fill="horizontal"
        style={{ zIndex: "1", position: "fixed" }}
        {...props}
      >
        <Box
          width="xlarge"
          direction="row"
          align="center"
          justify="between"
          pad={{ horizontal: "small" }}
        >
          <Box width="small">
            <Anchor
              onClick={() => navigate(process.env.SITE_URL)}
              label={<WillCraftIcon />}
            />
          </Box>
          <ResponsiveContext.Consumer>
            {size =>
              size !== "large" ? (
                <SidebarContent {...sidebarProps} />
              ) : (
                <NavBarContent {...navProps} />
              )
            }
          </ResponsiveContext.Consumer>
        </Box>
        <ResponsiveContext.Consumer>
          {size => size === "large" && <NavBarSecondaryContent {...navProps} />}
        </ResponsiveContext.Consumer>
      </Box>
      <Box height="xxsmall" />
    </>
  )
}

export default NavBar
