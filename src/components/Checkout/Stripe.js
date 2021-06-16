import { Box, Text } from "grommet"
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"

import { Trans } from "@lingui/macro"

import CheckoutPanel from "./CheckoutPanel"
import { useDispatch } from "react-redux"
import { addPayment } from "../../reducers/invoice/actions"

const StripeContainer = props => {
  const { invoiceData, orderId, siteAdminConfig } = props

  const stripe = loadStripe(siteAdminConfig.stripe_key, {
    locale: typeof window !== "undefined" ? window.language : "en",
  })

  if (invoiceData.been_paid) {
    return null
  }

  if (parseFloat(invoiceData.net_price_after_card_fees) === 0) {
    return <ProceedNoPayment orderId={orderId} invoiceData={invoiceData} />
  }

  return (
    <Elements stripe={stripe}>
      <StripeForm orderId={orderId} invoiceData={invoiceData} />
    </Elements>
  )
}
export default StripeContainer

const ProceedNoPayment = ({ orderId, invoiceData }) => {
  const dispatch = useDispatch()
  const { payment = { submitted: false, error: null } } = invoiceData

  return (
    <CheckoutPanel loading={payment.submitted}>
      <CheckoutPanel.Header>
        <Trans>Complete Order</Trans>
      </CheckoutPanel.Header>
      <CheckoutPanel.Content>
        <Text size="xsmall" alignSelf="center" textAlign="center">
          <Trans>
            Thank you for using WillCraft! Click on Submit Order to complete
            your order.
          </Trans>
        </Text>
      </CheckoutPanel.Content>
      <CheckoutPanel.Button
        primary
        label={<Trans>Submit Order</Trans>}
        onClick={() => dispatch(addPayment({ orderId }))}
      />
    </CheckoutPanel>
  )
}
const StripeForm = ({ invoiceData, orderId }) => {
  const dispatch = useDispatch()
  const { payment = { submitted: false, error: null } } = invoiceData
  const stripe = useStripe()
  const elements = useElements()

  const submit = async ev => {
    ev.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }
    const cardElement = elements.getElement(CardElement)

    const { error, token } = await stripe.createToken(cardElement)

    if (error) {
      payment.error = error.message
    } else {
      dispatch(addPayment({ orderId }))
    }
  }

  return (
    <form onSubmit={submit}>
      <CheckoutPanel loading={payment.submitted}>
        <CheckoutPanel.Header>
          <Trans>Make Payment</Trans>
        </CheckoutPanel.Header>
        <CheckoutPanel.Content>
          <Box
            width="100%"
            overflow="auto"
            round="large"
            background={{ color: "dark-5", opacity: "weak" }}
            pad={{ horizontal: "medium", vertical: "small" }}
            margin={{ horizontal: "none", top: "none" }}
          >
            <CardElement
              onChange={() => {
                payment.error = null
              }}
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>

          <Box height={{ min: "20px" }}>
            <Text size="xsmall" alignSelf="center">
              {payment.error}
            </Text>
          </Box>
        </CheckoutPanel.Content>
        <CheckoutPanel.Button
          size="small"
          onClick={submit}
          label={<Trans>Pay Now!</Trans>}
        />
      </CheckoutPanel>
    </form>
  )
}
