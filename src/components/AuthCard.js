import { Box, Heading, Text } from "grommet"
import React from "react"

import { t } from "@lingui/macro"
import { I18n } from "@lingui/react"
const AuthCard = ({
  children,
  headerText = t`Welcome!`,
  subHeaderText,
  footerText,
  additionalComponents,
}) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box fill align="center" justify="center" pad="medium">
          <Box
            margin="large"
            elevation="medium"
            pad={{ vertical: "large", horizontal: "medium" }}
            width="medium"
          >
            <Heading
              level={1}
              textAlign="center"
              margin={{ horizontal: "none", vertical: "small" }}
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
              {i18n._(t`By registering or logging in, you agree to our Terms and
              Conditions and our Privacy Policy.`)}
            </Text>
          </Box>
        </Box>
      )}
    </I18n>
  )
}
export default AuthCard
