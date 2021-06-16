import { Box, ResponsiveContext, Button, Heading, Text } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"
import { useDispatch } from "react-redux"
import { Trans } from "@lingui/macro"

import { partnerAlerts } from "../components/Dashboard/partnerAlerts"
import AlertBox from "../components/AlertBox"
import Body from "../components/Dashboard/Body"
import DashboardPanel from "../components/Dashboard/DashboardPanel"
import Dots from "../components/Dots"
import SideBar from "../components/Dashboard/SideBar"
import TipBox from "../components/TipBox"

import { useUserDetails } from "../reducers/user/hooks"
import { clearCurrentOrder } from "../reducers/orders"
import { redirectForm } from "../reducers/forms"

const DashBoard = ({ location: { pathname } }) => {
  const dispatch = useDispatch()
  const [panel, _setPanel] = React.useState(null)

  const userDetails = useUserDetails()

  React.useEffect(() => {
    dispatch(clearCurrentOrder())
  }, [])

  const setPanel = key => {
    _setPanel(key === panel ? null : key)
  }

  if (!userDetails)
    return (
      <Box fill align="center" justify="center">
        <TipBox />
        <Dots />
      </Box>
    )

  if (!userDetails.name)
    return (
      <DashboardPanel>
        <DashboardPanel.Content>
          <Box fill align="center" justify="center">
            <Heading
              level={1}
              margin={{ bottom: "small", top: "none" }}
              textAlign="center"
            >
              <Trans>Welcome.</Trans>
            </Heading>
            <Text textAlign="center">
              <Trans>Before you start, we'll need some personal details.</Trans>
            </Text>
            <Text textAlign="center">
              <Trans>Don't worry, this will just take 2 mins.</Trans>
            </Text>
            <Button
              onClick={() =>
                dispatch(
                  redirectForm({
                    category: "USER_DETAILS",
                    action: "ADD",
                    redirectPath: `/forms/user_details/add/`,
                    data: {},
                    pathname,
                  })
                )
              }
              margin="medium"
              label={<Trans>Add Personal Details</Trans>}
            />
          </Box>
        </DashboardPanel.Content>
      </DashboardPanel>
    )

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <I18n>
          {({ i18n }) => (
            <Box>
              <Box align="center">
                <Heading margin={{ bottom: "medium" }}>
                  <Trans>Dashboard</Trans>
                </Heading>
                {size === "small" && panel && (
                  <Button
                    size="small"
                    onClick={() => setPanel(null)}
                    label={"Back to Menu"}
                  />
                )}
                {!panel &&
                  size === "small" &&
                  userDetails.referring_applications.map(
                    partner =>
                      partnerAlerts[partner] &&
                      partnerAlerts[partner].dashboard && (
                        <Box margin="medium" key={partner}>
                          <AlertBox
                            size="xsmall"
                            alertText={partnerAlerts[partner].dashboard}
                          />
                        </Box>
                      )
                  )}
              </Box>
              <Box
                alignSelf="center"
                width="xlarge"
                direction="row"
                pad="small"
                // align="start"
              >
                {(panel === null || size !== "small") && (
                  <Box
                    margin={{
                      top: "small",
                      horizontal: size === "small" ? "large" : "none",
                    }}
                    pad={{
                      top: "small",
                      horizontal: size === "small" ? "large" : "none",
                    }}
                    animation={["fadeIn", "slideRight"]}
                    fill={size === "small" ? "horizontal" : undefined}
                    width={size === "small" ? 0 : "small"}
                  >
                    <SideBar
                      userDetails={userDetails}
                      panel={panel}
                      setPanel={setPanel}
                    />
                  </Box>
                )}

                {(panel !== null || size !== "small") && (
                  <Box
                    fill
                    animation={["fadeIn"]}
                    margin="medium"
                    border
                    pad={{
                      horizontal: "large",
                      bottom: "large",
                      top: "medium",
                    }}
                    round="large"
                  >
                    <Body
                      setPanel={setPanel}
                      panel={panel}
                      userDetails={userDetails}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </I18n>
      )}
    </ResponsiveContext.Consumer>
  )
}

export default DashBoard
