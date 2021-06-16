import React from "react"
import { Box, Button, Layer, Text, Heading } from "grommet"
import {
  FormClose,
  StatusCritical,
  StatusGood,
  StatusInfo,
} from "grommet-icons"
import { useDispatch, useSelector } from "react-redux"
import { t, Trans } from "@lingui/macro"
import { I18n } from "@lingui/react"

import { closeFormModal } from "../reducers/formModal/actions"

const modalMap = {
  success: {
    header: t`Success!`,
    icon: StatusGood,
    color: "brand",
  },
  info: {
    header: t`Information`,
    icon: StatusInfo,
    color: "status-warning",
  },
  error: {
    header: t`Oops!`,
    icon: StatusCritical,
    color: "status-critical",
  },
}

const InterfaceModal = props => {
  const dispatch = useDispatch()
  const formModalState = useSelector(state => state.formModal)

  if (!Object.keys(formModalState).length) return null

  const {
    action,
    category,
    message,
    resultStatus,
    cancelButton,
    modalType,
    header,
    subHeader,
    confirmButtonOnClick,
    confirmButtonText,
  } = formModalState

  const actionTextSchema = {
    DELETE: <Trans>Deleted</Trans>,
    ADD: <Trans>Added</Trans>,
    EDIT: <Trans>Edited</Trans>,
    ADD_SUB: <Trans>Added</Trans>,
    EDIT_SUB: <Trans>Edited</Trans>,
  }
  const categoryScheme = {
    PERSON: <Trans>Person</Trans>,
    APPOINTMENT: <Trans>Appointment</Trans>,
    LAWYER_APPOINTMENT: <Trans>Lawyers</Trans>,
    ARRANGEMENT: <Trans>Arrangement</Trans>,
    ALLOCATION: <Trans>Allocation</Trans>,
    ASSET: <Trans>Asset</Trans>,
    POWERS: <Trans>Power Restriction</Trans>,
  }

  const _modalType = modalType
    ? modalType
    : resultStatus >= 200 && resultStatus < 300
    ? "success"
    : "error"
  const _header = category ? (
    <>categoryScheme[category] actionTextSchema[action]</>
  ) : (
    header
  )
  const _confirmButtonOnClick = category
    ? () => dispatch(closeFormModal())
    : typeof confirmButtonOnClick === "function" && confirmButtonText
    ? () => confirmButtonOnClick()
    : () => dispatch(closeFormModal())

  const _confirmButtonText = category ? t`Close` : confirmButtonText

  const { icon: Icon, header: defaultHeader, color } = modalMap[
    _modalType.toLowerCase()
  ]

  return (
    <I18n>
      {({ i18n }) => (
        <Layer
          responsive={false}
          margin={{
            bottom: "large",
            top: cancelButton ? "none" : "large",
            horizontal: "small",
          }}
        >
          <Box width="medium" overflow="auto">
            {cancelButton && (
              <Box fill align="end">
                <Button
                  icon={<FormClose size="large" />}
                  focusIndicator={false}
                  onClick={() => dispatch(closeFormModal())}
                />
              </Box>
            )}
            <Box align="center" fill pad="large">
              <Heading
                dangerouslySetInnerHTML={{
                  __html: i18n._(defaultHeader),
                }}
                margin={{ top: "none", bottom: "medium" }}
              />
              <Icon size="100%" color={color} />
            </Box>
            <Box
              margin={{ bottom: "medium", horizontal: "medium" }}
              align="center"
            >
              {!category ? (
                <Text
                  textAlign="center"
                  dangerouslySetInnerHTML={{
                    __html: i18n._(header),
                  }}
                  size="xlarge"
                  margin={{ bottom: "small" }}
                />
              ) : (
                <Text
                  textAlign="center"
                  size="xlarge"
                  margin={{ bottom: "small" }}
                >
                  {categoryScheme[category]} {actionTextSchema[action]}
                </Text>
              )}
              {!subHeader ? null : Array.isArray(subHeader) ? (
                subHeader.map(e => (
                  <Text
                    textAlign="center"
                    dangerouslySetInnerHTML={{
                      __html: i18n._(e),
                    }}
                    margin={{ bottom: "xsmall" }}
                  />
                ))
              ) : (
                <Text
                  textAlign="center"
                  dangerouslySetInnerHTML={{
                    __html: i18n._(subHeader),
                  }}
                />
              )}
              {_modalType === "error" && (
                <Text size="xsmall" textAlign="center">
                  <Trans>
                    If you face this problem continuously, Please contact
                    directly us at enquiries@willcraftnow.com.
                  </Trans>
                </Text>
              )}
            </Box>
            {_confirmButtonOnClick && (
              <Button
                margin={{ horizontal: "small", vertical: "medium" }}
                onClick={() => _confirmButtonOnClick()}
                label={i18n._(_confirmButtonText)}
              />
            )}
          </Box>
        </Layer>
      )}
    </I18n>
  )
}

export default InterfaceModal
