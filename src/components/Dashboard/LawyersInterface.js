import { Box, TextInput, Text, Button } from "grommet"
import { Search } from "grommet-icons"
import React from "react"

import { t, Trans } from "@lingui/macro"

import DashboardPanel from "../Dashboard/DashboardPanel"
import navigate from "../../utils/navigate"
import { useDispatch } from "react-redux"
import { setCurrentOrder } from "../../reducers/orders/actions"

const LawyersInterface = props => {
  const dispatch = useDispatch()
  const [state, setState] = React.useState("")
  const onChange = e => {
    setState(e.target.value.trim().toUpperCase())
  }
  return (
    <DashboardPanel>
      <DashboardPanel.Header headerText={t`Lawyers Interface`} />
      <DashboardPanel.Content>
        <Text textAlign="center">
          <Trans>
            You are placed under an obligation of confidentiality with regard to
            the information you are accessing. Do not access orders unless you
            have client consent, or have an engagement with the client.
          </Trans>
        </Text>
        <Box
          flex={false}
          overflow="auto"
          round="large"
          background={{ color: "dark-5", opacity: "weak" }}
          direction="row"
          align="center"
          pad={{ horizontal: "medium", vertical: "small" }}
          margin={{ vertical: "small" }}
        >
          <Search color="brand" />
          <TextInput
            onChange={onChange}
            value={state}
            plain
            placeholder={<Trans>Order Number</Trans>}
            type="search"
          />
        </Box>
        <Button
          margin="xsmall"
          label={<Trans>Access Order</Trans>}
          onClick={() => {
            // TODO: adjust set current order
            dispatch(setCurrentOrder(state))
            navigate(`/lawyers_portal`)
          }}
        />
      </DashboardPanel.Content>
    </DashboardPanel>
  )
}

export default LawyersInterface
