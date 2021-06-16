import { I18n, withI18n } from "@lingui/react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { t, Trans } from "@lingui/macro"
import { Text } from "grommet"

import FormFactory from "../../../../FormFactory"
import { toCapitalCase } from "../../../../FormFactory/utils"
import FormLayout from "../../../../components/FormLayout"
import AlertBox from "../../../../components/AlertBox"
import getAppointmentHeaders from "../../../../components/Appointments/getAppointmentHeaders"

import useOptions from "../../../../reducers/options/hooks"
import {
  addLegalService,
  legalServicesOptions,
} from "../../../../reducers/legalServices"
import withOrderData from "../../../../components/withOrderData"

const LawyerAppointmentForm = withI18n()(
  ({ params: { legalService }, orderId, orderType }) => {
    const dispatch = useDispatch()
    const _orderType = toCapitalCase(orderType)
    const action = "ADD"

    const firms = useSelector(state => state.firms.data).map(firm => ({
      value: String(firm.id),
      display_name: firm.name,
    }))

    const options = useOptions(legalServicesOptions, {
      orderId,
      legalService,
      key: "FIRM",
    })

    const formService = {
      options,
      data: undefined,
      submit: formValues => {
        dispatch(
          addLegalService({
            orderId,
            legalService,
            params: formValues,
          })
        )
      },
      mode: action,
      debug: true,
      fieldOptions: {
        firm: {
          choices: firms,
          category: "Firm",
          alert: (value, values) => {
            return (
              <AlertBox>
                <Text>
                  <Trans>Our Legal Service Provider will:</Trans>
                </Text>
                <ol>
                  <li>
                    <Text>
                      <Trans>
                        Explain the {_orderType} to you and check that your
                        intentions are accurately effected in the draft{" "}
                        {_orderType} according to what is entered into
                        WillCraft; and
                      </Trans>
                    </Text>
                  </li>
                  <li className="pt-2">
                    {(() => {
                      switch (orderType) {
                        case "WILL":
                          return (
                            <Text>
                              <Trans>
                                Be Witness to your {_orderType}. (Note: there
                                will be two Witnesses, and the lawyers will be
                                both witnesses); and
                              </Trans>
                            </Text>
                          )
                        case "LPA":
                          return (
                            <Text>
                              <Trans>
                                Be Certificate Provider to your {_orderType};
                                and
                              </Trans>
                            </Text>
                          )
                        default:
                          return null
                      }
                    })()}
                  </li>
                  <li className="pt-2">
                    <Text>
                      <Trans>
                        Check that the draft {_orderType} complies with all
                        verifiable legal formalities including checking that you
                        are above 21 years old, of sound mind, and that you
                        understand the contents of the {_orderType}.
                      </Trans>
                    </Text>
                  </li>
                </ol>
              </AlertBox>
            )
          },
        },
      },
    }

    return (
      <I18n>
        {({ i18n }) => (
          <FormLayout>
            <FormLayout.Header>
              <FormLayout.Header.Header>
                {`${i18n._(t`Add`)} ${i18n._(
                  getAppointmentHeaders({
                    appointment: legalService,
                  }).headerText
                )}`}
              </FormLayout.Header.Header>
            </FormLayout.Header>
            <FormLayout.Content>
              <FormFactory formService={formService} />
            </FormLayout.Content>
          </FormLayout>
        )}
      </I18n>
    )
  }
)

export default withOrderData(LawyerAppointmentForm)
