import { Box, Button, Text } from "grommet"
import React, { useState } from "react"

import { Trans, t } from "@lingui/macro"

import { request } from "../../utils/request"
import DashboardPanel from "../Dashboard/DashboardPanel"

const PartnersInterface = props => {
  const [discountCode, setDiscountCode] = useState(null)
  const [error, setError] = useState(null)

  const onRequestDiscountCode = async () => {
    const res = await request({
      url: "/partners/get_discount/",
      method: "POST",
    })

    res.status === 201
      ? setDiscountCode(res.data.discount)
      : setError(res.data[0])
  }

  const getDiscountDescription = discountCode => {
    const discount =
      discountCode.discount_type === "PERCENTAGE"
        ? `${discountCode.discount_amount}%`
        : `$${discountCode.discount_amount}`
    return <Trans>Discount Code for {discount} off the Will Price.</Trans>
  }

  return (
    <DashboardPanel>
      <DashboardPanel.Header headerText={t`Partners Interface`} />
      <DashboardPanel.Content>
        <Box
          flex={false}
          overflow="auto"
          round="large"
          background={{ color: "dark-5", opacity: "weak" }}
          direction="row"
          align="center"
          justify="center"
          pad={{ vertical: "small" }}
          margin={{ bottom: "small" }}
        >
          <Box height="xxsmall" pad="medium" justify="center" align="center">
            {discountCode && (
              <>
                <Text variant="h5">{discountCode.discount_code}</Text>
                <Text size="small">{getDiscountDescription(discountCode)}</Text>
              </>
            )}
          </Box>
        </Box>
        <Button
          margin="xsmall"
          onClick={() => onRequestDiscountCode()}
          label={<Trans>Request Discount Code</Trans>}
        />
        {error}
      </DashboardPanel.Content>
    </DashboardPanel>
  )
}

export default PartnersInterface
