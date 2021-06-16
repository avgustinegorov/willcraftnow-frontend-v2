import { Box, Heading, Text, ResponsiveContext } from "grommet"
import { I18n } from "@lingui/react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

import { t } from "@lingui/macro"

import { partnerAlerts } from "./Dashboard/partnerAlerts"
import AlertBox from "./AlertBox"
import WillCraftIcon from "./WillCraftIcon"

const LogoPanel = ({ pathContext, boxProps, logo }) => {
  const image = getImage(logo)

  return (
    <Box width="350px" margin="small" alignSelf="center" {...boxProps}>
      <Box>
        <Box pad={{ horizontal: "large", vertical: "medium" }}>
          <GatsbyImage image={image} alt="" />
        </Box>
        <Text weight={300} size="40px" textAlign="center">
          X
        </Text>
        <WillCraftIcon />
      </Box>
    </Box>
  )
}

const LoginPanel = ({
  headerText = t`Welcome!`,
  subHeaderText,
  children,
  additionalComponents,
  boxProps,
  pageContext,
  partnerName,
}) => {
  return (
    <I18n>
      {({ i18n }) => (
        <ResponsiveContext.Consumer>
          {size => (
            <Box align="center" {...boxProps}>
              <Box
                margin={{ horizontal: "large" }}
                border
                round="medium"
                pad={{ vertical: "large", horizontal: "medium" }}
                width="medium"
              >
                <Heading
                  level={1}
                  textAlign="center"
                  margin={{
                    horizontal: "none",
                    bottom: "small",
                    top: "none",
                  }}
                >
                  {i18n._(headerText)}
                </Heading>
                <Text size="small" textAlign="center" margin="none">
                  {i18n._(subHeaderText)}
                </Text>

                <Box
                  margin={{ vertical: "large" }}
                  height={{ min: "small" }}
                  justify="center"
                >
                  {children}
                </Box>
                {additionalComponents}
                <hr width="66%" />
                <Text size="xsmall" textAlign="center" margin="none">
                  {i18n._(
                    t`By registering or logging in, you agree to our Terms and Conditions and our Privacy Policy.`
                  )}
                </Text>
              </Box>
              {partnerAlerts[partnerName] &&
                partnerAlerts[partnerName].landing && (
                  <AlertBox
                    size="xsmall"
                    width="medium"
                    alertText={partnerAlerts[partnerName].landing}
                  />
                )}
            </Box>
          )}
        </ResponsiveContext.Consumer>
      )}
    </I18n>
  )
}
const FlatAuthCard = props => {
  const [time, setTime] = React.useState(props.initial ? false : true)
  const {
    name: partnerName,
    localImage: logo,
  } = props.data.allSitePartner.edges[0].node
  React.useEffect(() => {
    const timer = setTimeout(() => setTime(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <I18n>
      {({ i18n }) => (
        <ResponsiveContext.Consumer>
          {size =>
            size !== "small" ? (
              <Box
                fill
                align="center"
                justify="center"
                pad="medium"
                gap="large"
                direction="row-responsive"
                margin={"medium"}
              >
                <LogoPanel {...props} logo={logo} />
                <LoginPanel {...props} partnerName={partnerName} />
              </Box>
            ) : (
              <Box
                fill
                align="center"
                justify="center"
                pad="medium"
                gap="large"
                direction="row-responsive"
                margin={"medium"}
              >
                {time === false ? (
                  <LogoPanel
                    {...props}
                    logo={logo}
                    boxProps={{
                      height: "65vh",
                      justify: "center",
                      pad: "medium",
                      animation: [
                        {
                          type: "fadeIn",
                          delay: 0,
                          duration: 1500,
                          size: "medium",
                        },
                        {
                          type: "fadeOut",
                          delay: 1500,
                          duration: 1500,
                          size: "medium",
                        },
                      ],
                    }}
                  />
                ) : (
                  <LoginPanel
                    {...props}
                    partnerName={partnerName}
                    boxProps={
                      props.initial && {
                        animation: [
                          {
                            type: "fadeIn",
                            delay: 0,
                            duration: 1000,
                            size: "medium",
                          },
                        ],
                      }
                    }
                  />
                )}
              </Box>
            )
          }
        </ResponsiveContext.Consumer>
      )}
    </I18n>
  )
}
export default FlatAuthCard
