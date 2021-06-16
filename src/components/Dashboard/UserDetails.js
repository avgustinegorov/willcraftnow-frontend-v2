import { Box, Grid, List, Text } from "grommet"
import React from "react"

import { t } from "@lingui/macro"
import { Edit } from "grommet-icons"
import DashboardPanel from "../Dashboard/DashboardPanel"
import toDisplayList from "../../utils/toDisplayList"

import { useDispatch } from "react-redux"
import { useLocation } from "@reach/router"
import { redirectForm } from "../../reducers/forms"

const UserDetails = ({ userDetails }) => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  return (
    <DashboardPanel>
      <DashboardPanel.Header headerText={t`Your Details`} />
      <DashboardPanel.Content>
        <List
          children={(datum, index) => {
            return (
              <Grid gap="small">
                <Box>
                  <Text size="small">{datum["key"]}</Text>
                </Box>
                <Box align="center">
                  <Text>{datum["value"]}</Text>
                </Box>
              </Grid>
            )
          }}
          data={toDisplayList(userDetails)}
        />
      </DashboardPanel.Content>
      <DashboardPanel.Btn
        margin={{ top: "medium" }}
        label={"Edit User Details"}
        icon={<Edit />}
        onClick={() =>
          dispatch(
            redirectForm({
              category: "USER_DETAILS",
              action: "EDIT",
              redirectPath: `/forms/user_details/edit/`,
              data: {},
              pathname,
            })
          )
        }
      />
    </DashboardPanel>
  )
}
export default UserDetails
