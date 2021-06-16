import { Box, ResponsiveContext } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"
import { useLocation } from "@reach/router"
import LanguageSwitch from "./LanguageSwitch"
import LoginButton from "./LoginButton"
import mainLinks from "./mainLinks"

const NavBarContent = ({ mainKey, setMainKey, i18n }) => {
  const location = useLocation()
  const isExcluded =
    location.pathname.includes("/") || location.pathname.includes("/partner")
  const isForm = location.pathname.includes("/form")
  const isPartner = location.pathname.includes("/partner")
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <I18n>
          {({ i18n }) => (
            <Box direction="row" gap="small" align="center">
              {mainLinks.map(
                (link, index) =>
                  !isExcluded && (
                    <Box
                      key={`NavBarContent_${index}`}
                      onMouseEnter={() => setMainKey(link.title)}
                      onClick={() =>
                        setMainKey(link.title === mainKey ? null : link.title)
                      }
                      pad={{ horizontal: "xsmall" }}
                      fill="vertical"
                    >
                      {i18n._(link.title)}
                    </Box>
                  )
              )}
              {}
              {!isForm && !isPartner && <LoginButton />}
              {!isForm && <LanguageSwitch />}
            </Box>
          )}
        </I18n>
      )}
    </ResponsiveContext.Consumer>
  )
}

export default NavBarContent
