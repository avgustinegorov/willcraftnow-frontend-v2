import { Edit, Trash } from "grommet-icons"
import { Text, Box, Button, Grid, ResponsiveContext } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"

const AssetDescription = ({ allocations, onClick, asset }) => {
  return (
    <I18n>
      {({ i18n }) => (
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill="horizontal" align="center">
              <Grid
                columns={["flex", "flex"]}
                rows={["1fr", "flex"]}
                areas={[
                  ["content", "content"],
                  ["editButton", "deleteButton"],
                ]}
                gap="medium"
                pad="medium"
              >
                <Box align="center" gridArea="content" justify="center">
                  <Text
                    level={1}
                    size="small"
                    margin="xsmall"
                    textAlign="center"
                    dangerouslySetInnerHTML={{
                      __html: i18n._(asset.display_name),
                    }}
                  />
                </Box>
                <Box gridArea="editButton" fill align="end">
                  <Box
                    round="full"
                    overflow="hidden"
                    border={{ color: "brand", opacity: "strong" }}
                  >
                    <Button
                      icon={<Edit />}
                      onClick={() => onClick({ action: "EDIT", asset })}
                    />
                  </Box>
                </Box>
                <Box gridArea="deleteButton" fill align="start">
                  <Box
                    round="full"
                    overflow="hidden"
                    border={{ color: "brand", opacity: "strong" }}
                  >
                    <Button
                      icon={<Trash />}
                      onClick={() => onClick({ action: "DELETE", asset })}
                    />
                  </Box>
                </Box>
              </Grid>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      )}
    </I18n>
  )
}
AssetDescription.displayName = "AssetDescription"
export default AssetDescription
