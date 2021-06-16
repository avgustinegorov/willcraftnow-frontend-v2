import { Box, Text } from "grommet"
import React from "react"
import { I18n } from "@lingui/react"
const AlertBox = ({ alertText, size = "medium", children, width, margin }) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box
          fill="horizontal"
          align="center"
          role="alert"
          width={{ max: width ? width : "large" }}
          margin={margin ? margin : { horizontal: "none", vertical: "small" }}
          pad="medium"
          background={{ color: "brand", opacity: "0.05" }}
          round="medium"
        >
          {children ? (
            children
          ) : (
            <Text
              size={size}
              textAlign="center"
              dangerouslySetInnerHTML={{ __html: i18n._(alertText) }}
            />
          )}
        </Box>
      )}
    </I18n>
  )
}

AlertBox.displayName = "AlertBox"

export default AlertBox
