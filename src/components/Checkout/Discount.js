import { Box, Text, TextInput } from "grommet"
import React from "react"

import { t, Trans } from "@lingui/macro"

import CheckoutPanel from "./CheckoutPanel"
import { useDispatch } from "react-redux"
import { addDiscount } from "../../reducers/invoice/actions"

const Discount = ({
  orderId,
  invoiceData: { discountStatus = { submitted: false, error: null } },
}) => {
  const dispatch = useDispatch()
  const [discountCode, setDiscountCode] = React.useState("")

  const onChange = event => {
    discountStatus.error = null
    setDiscountCode(
      event.target.value && event.target.value.trim().toUpperCase()
    )
  }

  return (
    <CheckoutPanel loading={discountStatus.submitted}>
      <CheckoutPanel.Header>
        <Trans>Referral/Discount Code</Trans>
      </CheckoutPanel.Header>
      <CheckoutPanel.Content>
        <Box
          flex={false}
          overflow="auto"
          round="large"
          background={{ color: "dark-5", opacity: "weak" }}
          direction="row"
          align="center"
          pad={{ horizontal: "medium", vertical: "xxsmall" }}
          margin={{ horizontal: "none", top: "none" }}
        >
          <TextInput
            style={{ padding: "0.6em" }}
            plain
            margin="none"
            value={discountCode}
            onChange={onChange}
            aria-describedby="discount-code"
            size="xsmall"
          />
        </Box>
        <Box height={{ min: "20px" }}>
          <Text size="xsmall" alignSelf="center">
            {discountStatus.error?.discount_code}
          </Text>
        </Box>
      </CheckoutPanel.Content>
      <CheckoutPanel.Button
        onClick={e =>
          dispatch(
            addDiscount({ orderId, params: { discount_code: discountCode } })
          )
        }
        size="small"
        label={<Trans>Apply Code</Trans>}
        disabled={!discountCode}
      />
    </CheckoutPanel>
  )
}

export default Discount
