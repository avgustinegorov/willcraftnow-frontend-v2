import { Box, Button, Layer, Heading, Text } from "grommet"
import React from "react"

import DetailRender from "./DetailRender"
import { Trans } from "@lingui/macro"
const LayerDetailRender = ({ data, modalProps }) => {
  const [open, setOpen] = React.useState(false)
  if (!modalProps) return null
  const { header, excludedFields, data: _data, buttonProps } = modalProps(data)

  return (
    <Box>
      <Button
        label={<Trans>See Details</Trans>}
        size="small"
        {...buttonProps}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <Layer
          margin="xsmall"
          onClickOutside={() => setOpen(!open)}
          onEsc={() => setOpen(!open)}
          responsive={false}
        >
          <Box pad="medium" gap="medium">
            <Heading level={3} textAlign="center" margin="none">
              {header}
            </Heading>
            <Box overflow={{ vertical: "scroll", horizontal: "auto" }}>
              <DetailRender
                data={_data ? _data : data}
                excludedFields={excludedFields}
              />
            </Box>
            <Box margin={{ horizontal: "large" }} flex="false">
              <Button
                label={
                  <Text size="small">
                    <Trans>Close</Trans>
                  </Text>
                }
                onClick={() => setOpen(!open)}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  )
}
export default LayerDetailRender
