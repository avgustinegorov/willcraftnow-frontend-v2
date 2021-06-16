import { Box, Button, Text, Collapsible, ResponsiveContext } from "grommet"
import { FormDown, FormNext } from "grommet-icons"
import { I18n } from "@lingui/react"
import React from "react"

import linkConst from "./linkConst"

const SideBar = ({ userDetails, setPanel }) => {
  const [sidebarKey, _setSidebarKey] = React.useState(null)

  const setSidebarKey = key => {
    _setSidebarKey(key === sidebarKey ? null : key)
  }

  return (
    <I18n>
      {({ i18n }) => (
        <ResponsiveContext.Consumer>
          {size =>
            linkConst(userDetails).map(link =>
              link.children ? (
                <div key={link.key}>
                  <Button
                    hoverIndicator="background"
                    onClick={() => setSidebarKey(link.key)}
                  >
                    <Box
                      direction="row"
                      align="center"
                      pad="small"
                      gap="xsmall"
                    >
                      <link.labelIcon />

                      <Text>{i18n._(link.heading)}</Text>
                      {sidebarKey === link.key ? (
                        <FormDown color="brand" />
                      ) : (
                        <FormNext color="brand" />
                      )}
                    </Box>
                  </Button>
                  <Collapsible open={sidebarKey === link.key}>
                    {link.children.map(
                      subLink =>
                        !subLink.disabled && (
                          <Button
                            key={subLink.key}
                            hoverIndicator="background"
                            onClick={() => setPanel(subLink.key)}
                          >
                            <Box
                              margin={{ left: "2em" }}
                              direction="row"
                              align="center"
                              pad="xsmall"
                            >
                              <Text size={"small"}>
                                {i18n._(subLink.heading)}
                              </Text>
                            </Box>
                          </Button>
                        )
                    )}
                  </Collapsible>
                </div>
              ) : (
                !link.disabled && (
                  <Button
                    hoverIndicator="background"
                    onClick={() => setPanel(link.key)}
                  >
                    <Box
                      direction="row"
                      align="center"
                      pad={{ horizontal: "small", vertical: "xsmall" }}
                      gap="xsmall"
                    >
                      <link.labelIcon />
                      <Text size="medium">{i18n._(link.heading)}</Text>
                    </Box>
                  </Button>
                )
              )
            )
          }
        </ResponsiveContext.Consumer>
      )}
    </I18n>
  )
}
export default SideBar
