import { AddCircle } from "grommet-icons"
import { Box, Button } from "grommet"
import React from "react"
import { I18n } from "@lingui/react"

import Dots from "./Dots"

const AddElementButton = ({
  onClick,
  label,
  disabled = false,
  icon,
  size = "large",
  isLoading,
}) => {
  return (
    <I18n>
      {({ i18n }) => (
        <Box width={{ max: "large" }} height={{ max: "xsmall" }} fill>
          <Button
            icon={
              isLoading !== false
                ? undefined
                : icon || <AddCircle size="medium" />
            }
            label={
              isLoading ? (
                <Box height="24px" align="center" justify="center">
                  <Dots.Plain />
                </Box>
              ) : (
                i18n._(label)
              )
            }
            size={size}
            fill
            onClick={e => onClick(e)}
            disabled={isLoading || disabled}
          />
        </Box>
      )}
    </I18n>
  )
}
AddElementButton.displayName = "AddElementButton"
export default AddElementButton
