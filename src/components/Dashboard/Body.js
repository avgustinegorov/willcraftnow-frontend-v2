import { Box, Text, Heading } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"

import { Trans } from "@lingui/macro"

import { partnerAlerts } from "./partnerAlerts"
import AlertBox from "../AlertBox"
import DashboardPanel from "./DashboardPanel"
import linkConst from "./linkConst"
import productOverviewList from "./productOverviewList"

const Body = ({ panel, userDetails }) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box fill align="center">
          {linkConst(userDetails).map(link =>
            link.children
              ? link.children.map(
                  sublink =>
                    panel === sublink.key && (
                      <sublink.panel
                        key={sublink.key}
                        {...productOverviewList.find(
                          e => e.key === sublink.key
                        )}
                        {...sublink.props}
                      />
                    )
                )
              : panel === link.key && (
                  <link.panel
                    {...productOverviewList.find(e => e.key === link.key)}
                    {...link.props}
                  />
                )
          )}

          {panel === null && (
            <DashboardPanel>
              <DashboardPanel.Content>
                <Box fill align="center" justify="center">
                  <Heading
                    level={3}
                    margin={{ bottom: "small", top: "none" }}
                    textAlign="center"
                  >
                    <Trans>Welcome to your Dashboard.</Trans>
                  </Heading>
                  <Text textAlign="center">
                    <Trans>
                      Get access to all your legal documents. Click on the menu
                      on the left to get started.
                    </Trans>
                  </Text>
                  {userDetails.referring_applications.map(
                    partner =>
                      partnerAlerts[partner] &&
                      partnerAlerts[partner].dashboard && (
                        <AlertBox
                          size="xsmall"
                          alertText={partnerAlerts[partner].dashboard}
                        />
                      )
                  )}
                </Box>
              </DashboardPanel.Content>
            </DashboardPanel>
          )}
        </Box>
      )}
    </I18n>
  )
}
export default Body
