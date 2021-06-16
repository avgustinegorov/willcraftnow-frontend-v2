import { Box, Text, Anchor } from "grommet"
import React from "react"

import { Trans } from "@lingui/macro"

import navigate from "../utils/navigate"

const GlobalFooter = props => {
  return (
    <Box
      as="footer"
      gap="xsmall"
      justify="between"
      pad="medium"
      width="xlarge"
      alignSelf="center"
    >
      <hr style={{ width: "66%", marginBottom: "0.1em", opacity: "0.3" }} />
      <Text size="xsmall" textAlign="center" style={{ opacity: "0.3" }}>
        <Trans>
          WillCraft and Draftiy Pte. Ltd. are not law firms and are not
          permitted to engage in the practice of law. The information and
          service provided is not a substitute for the advice of a lawyer, and
          is not legal advice. For more details, see our &nbsp;
          <Anchor
            key="tncs"
            href={`${process.env.SITE_URL}/en/terms_and_conditions`}
            target="_blank"
          >
            Terms & Conditions &nbsp;
          </Anchor>
          and &nbsp;
          <Anchor
            key="privacy-policy"
            href={`${process.env.SITE_URL}/en/privacy_policy`}
            target="_blank"
          >
            Privacy Policy
          </Anchor>
          .
        </Trans>
      </Text>
    </Box>
  )
}
export default GlobalFooter
