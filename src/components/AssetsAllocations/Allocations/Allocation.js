import { Edit, Trash } from "grommet-icons"
import { I18n } from "@lingui/react"
import { Text, Box, Button, Grid, ResponsiveContext } from "grommet"
import React from "react"

import { getAllocation } from "../utils"

const Allocation = ({ asset, allocation, parentAllocation, onClick }) => {
  const {
    entity: { display_name },
  } = allocation
  const { label, number } = getAllocation(allocation)
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box align="center" alignSelf="center">
          <Grid
            columns={
              size !== "large" ? ["flex", "auto"] : ["flex", "auto", "auto"]
            }
            rows={size !== "large" ? ["flex", "auto"] : ["flex"]}
            areas={
              size !== "large"
                ? [
                    ["content", "editButton"],
                    ["content", "deleteButton"],
                  ]
                : [["content", "editButton", "deleteButton"]]
            }
            gap="medium"
          >
            <Box align="center" gridArea="content" justify="center">
              <Text
                as="h5"
                margin={{ top: "none", bottom: "small" }}
                textAlign="center"
              >
                {display_name}
              </Text>
              <Text size="small">
                <I18n>{({ i18n }) => `${i18n._(label)} ${number}`}</I18n>
              </Text>
            </Box>
            <Box gridArea="editButton">
              <Box
                round="full"
                overflow="hidden"
                border={{ color: "brand", opacity: "strong" }}
                pad="xsmall"
              >
                <Button
                  icon={<Edit />}
                  focusIndicator={false}
                  onClick={() =>
                    onClick({
                      action: "EDIT",
                      asset,
                      allocation,
                      parentAllocation,
                    })
                  }
                />
              </Box>
            </Box>
            <Box gridArea="deleteButton">
              <Box
                round="full"
                overflow="hidden"
                border={{ color: "brand", opacity: "strong" }}
                pad="xsmall"
              >
                <Button
                  icon={<Trash />}
                  focusIndicator={false}
                  onClick={() =>
                    onClick({
                      action: "DELETE",
                      asset,
                      allocation,
                      parentAllocation,
                    })
                  }
                />
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  )
}

Allocation.displayName = "Allocation"

export default Allocation
