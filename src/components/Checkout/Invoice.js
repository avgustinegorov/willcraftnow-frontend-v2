import { Box, Table, TableBody, TableRow, TableCell, Text } from "grommet"
import { I18n } from "@lingui/react"
import React from "react"

import { Trans, t } from "@lingui/macro"
import moment from "moment"

const ShowBadge = ({ lineItem }) => {
  if (lineItem.name === "Discounts") {
    return (
      <Box
        justify="center"
        round="large"
        border
        background={{ color: "brand", opacity: "strong" }}
        pad={{ vertical: "none", horizontal: "small" }}
        margin={{ vertical: "none", horizontal: "small" }}
      >
        <Text size="xsmall">
          <Trans>Discount</Trans>
        </Text>
      </Box>
    )
  } else if (lineItem.price === 0.0) {
    return (
      <Box
        justify="center"
        round="large"
        border
        background={{ color: "brand", opacity: "strong" }}
        pad={{ vertical: "none", horizontal: "small" }}
        margin={{ vertical: "none", horizontal: "small" }}
      >
        <Text size="xsmall">
          <Trans>Free</Trans>
        </Text>
      </Box>
    )
  } else {
    return null
  }
}

const LineItems = ({ lineItems }) => {
  return lineItems.map((lineItem, i) => {
    if (lineItem.length !== 0) {
      return (
        <TableRow key={i}>
          <TableCell>
            <Box direction="row-responsive">
              <Text>{lineItem.name}</Text>
              <Box align="center">
                <ShowBadge lineItem={lineItem} />
              </Box>
            </Box>
            <Box>
              {lineItem.subparagraph &&
                lineItem.subparagraph.map(subLineItem => (
                  <Text
                    key={subLineItem.name}
                    size={subLineItem.name.startsWith("*") ? "xsmall" : "small"}
                    margin={
                      subLineItem.name.startsWith("*")
                        ? "none"
                        : { top: "xsmall" }
                    }
                  >
                    {subLineItem.name}
                  </Text>
                ))}
            </Box>
          </TableCell>
          <TableCell verticalAlign="top">
            <Box gap="xsmall" align="start">
              <Text size="medium" wordBreak="break-word">
                {`$${lineItem.price}`}
              </Text>
              {lineItem.gst && <Text size="xsmall">{lineItem.gst}</Text>}
            </Box>
          </TableCell>
        </TableRow>
      )
    } else {
      return null
    }
  })
}

const Invoice = ({ invoiceData }) => {
  if (!invoiceData) {
    return null
  }

  return (
    <I18n>
      {({ i18n }) => (
        <Box fill border round="medium" pad="medium">
          <Box align="center" margin={{ vertical: "medium" }}>
            <Text size="large" weight="bold">
              {i18n._("Invoice")}
            </Text>
            <Text size="small">
              {invoiceData.been_paid
                ? moment(invoiceData.date_paid).format("Do MMMM YYYY")
                : moment().format("Do MMMM YYYY")}
            </Text>
          </Box>
          <Box overflow="auto">
            <Table>
              {/* <TableHead className="no-border" columns={tableHeaders} /> */}
              <TableBody>
                <LineItems lineItems={invoiceData.line_items} />
                <TableRow>
                  <TableCell align="right">
                    <Text weight="bold">
                      <Trans>Total</Trans>
                    </Text>
                  </TableCell>
                  <TableCell border="top">
                    <Text>${invoiceData.net_price}</Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Box>
                      <Text size="small">
                        {i18n._(t`Credit Card Transaction Fees`)}
                      </Text>
                      <Text size="small">(3.4% + $0.50)</Text>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Text>{`$ ${invoiceData.card_fees}`}</Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Text weight="bold">
                      <Trans>Total Payable</Trans>
                    </Text>
                  </TableCell>
                  <TableCell border="top">
                    <Text>{`$${invoiceData.net_price_after_card_fees}`}</Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box align="center" margin={{ vertical: "medium" }}>
            {!invoiceData.been_paid && (
              <Text textAlign="center" size="xsmall">
                {i18n._(
                  t`*We've included ${invoiceData.expiry_time} days of edits, free! Just in case you want to change details, or if you realised you made any typos.`
                )}
              </Text>
            )}
            <Text textAlign="center" size="xsmall">
              {i18n._(
                t`Your free edit time ends on ${
                  invoiceData.been_paid
                    ? moment(invoiceData.expiry_date).format(
                        "Do MMMM YYYY, h:mm a"
                      )
                    : moment()
                        .utcOffset(8)
                        .add(7, "days")
                        .format("Do MMMM YYYY, h:mm a")
                }.`
              )}
            </Text>
          </Box>
        </Box>
      )}
    </I18n>
  )
}

export default Invoice
