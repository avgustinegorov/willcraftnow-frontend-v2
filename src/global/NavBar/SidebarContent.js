import { Button, Box, Layer, Text, Collapsible } from "grommet"
import { Close, Menu } from "grommet-icons"
import { I18n } from "@lingui/react"
import React from "react"
import { useLocation } from "@reach/router"
import LanguageSwitch from "./LanguageSwitch"
import LoginButton from "./LoginButton"
import MenuButton from "../../components/MenuButton"
import mainLinks from "./mainLinks"
import navigate from "../../utils/navigate"

const SidebarContent = ({ toggleSidebar, sidebar, i18n }) => {
  const [mainKey, _setMainKey] = React.useState(null)
  const setMainKey = key => _setMainKey(key === mainKey ? null : key)

  const location = useLocation()
  const isExcluded =
    location.pathname.includes("/") || location.pathname.includes("/partner")
  const isForm = location.pathname.includes("/form")
  const isPartner = location.pathname.includes("/partner")

  if (isForm) return null

  if (!sidebar)
    return <Button icon={<Menu />} onClick={() => toggleSidebar()} />

  return (
    <I18n>
      {({ i18n }) => (
        <Layer
          position="right"
          full="vertical"
          responsive={false}
          onClickOutside={() => toggleSidebar()}
          onEsc={() => toggleSidebar()}
        >
          <Button
            onClick={() => toggleSidebar()}
            icon={<Close />}
            hoverIndicator
            reverse
            size="large"
            margin={{ horizontal: "small", vertical: "xsmall" }}
            alignSelf="end"
          />
          <Box
            height="min: '100vh'"
            width={"small"}
            alignSelf="center"
            margin="medium"
            align="center"
            gap="small"
          >
            <Box gap="medium" margin={{ vertical: "small" }}>
              {!isForm && <LanguageSwitch toggleSidebar={toggleSidebar} />}
              {!isPartner && <LoginButton toggleSidebar={toggleSidebar} />}
            </Box>

            <hr width="80%" />

            {!isExcluded && (
              <Box margin={{ vertical: "small" }}>
                {mainLinks.map((link, index) => {
                  if (Array.isArray(link.link)) {
                    return (
                      <Box fill="horizontal" reverse size="large">
                        <MenuButton
                          open={index === mainKey}
                          label={i18n._(link.title)}
                          onClick={() => setMainKey(index)}
                        />
                        <Collapsible open={index === mainKey}>
                          {link.link.map(link => (
                            <Button
                              margin={{ vertical: "xsmall", left: "small" }}
                              hoverIndicator="background"
                              onClick={() => {
                                navigate(link.link)
                                toggleSidebar()
                                setMainKey(null)
                              }}
                            >
                              <Box
                                margin={{ left: "medium" }}
                                direction="row"
                                align="center"
                                pad="xsmall"
                              >
                                <Text size="medium">{i18n._(link.title)}</Text>
                              </Box>
                            </Button>
                          ))}
                        </Collapsible>
                      </Box>
                    )
                  } else {
                    return (
                      <Button
                        onClick={() => {
                          navigate(link.link)
                          toggleSidebar()
                          setMainKey(null)
                        }}
                        hoverIndicator
                        fill="horizontal"
                      >
                        {i18n._(link.title)}
                      </Button>
                    )
                  }
                })}
              </Box>
            )}
          </Box>
        </Layer>
      )}
    </I18n>
  )
}
export default SidebarContent
