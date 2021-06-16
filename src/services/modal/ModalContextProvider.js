import {
  FormClose,
  StatusCritical,
  StatusGood,
  StatusInfo,
} from "grommet-icons"
import { I18n } from "@lingui/react"
import { Layer, Box, Button, Heading, Text } from "grommet"
import React from "react"

import { t } from "@lingui/macro"

export const ModalContext = React.createContext()

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

const ModalContextProvider = ({ children }) => {
  const [modal, _setModal] = React.useState({
    header: "",
    subHeader: "",
    status: t`Success!`,
    type: "success",
    confirmButtonText: "",
    confirmButtonOnClick: null,
    cancelButton: true,
    fire: false,
  })

  const setModal = data =>
    _setModal({
      ...modal,
      ...data,
    })

  const onClick = () => {
    setModal({ fire: false })
    modal.confirmButtonOnClick && modal.confirmButtonOnClick()
  }

  const Icon = modalMap[modal.type.toLowerCase()].icon
  const defaultHeader = modalMap[modal.type.toLowerCase()].header
  const color = modalMap[modal.type.toLowerCase()].color

  return (
    <ModalContext.Provider value={{ setModal }}>
      {children}
      {modal.fire && (
        <I18n>
          {({ i18n }) => (
            <Layer responsive={false}>
              <Box
                width="medium"
                align="center"
                margin={{
                  bottom: "large",
                  top: modal.cancelButton ? "none" : "large",
                }}
              >
                {modal.cancelButton && (
                  <Box fill align="end">
                    <Button
                      icon={<FormClose size="large" />}
                      focusIndicator={false}
                      onClick={() => setModal({ fire: false })}
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
                  <Icon size="xxlarge" color={color} />
                </Box>
                <Box margin="medium" align="center" pad="medium">
                  <Text
                    textAlign="center"
                    dangerouslySetInnerHTML={{
                      __html: i18n._(modal.header),
                    }}
                    size="large"
                    margin={{ bottom: "small" }}
                  />
                  {Array.isArray(modal.subHeader) ? (
                    modal.subHeader.map(e => (
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
                        __html: i18n._(modal.subHeader),
                      }}
                    />
                  )}
                </Box>
                {modal.confirmButtonOnClick && (
                  <Box>
                    <Button
                      onClick={onClick}
                      label={i18n._(modal.confirmButtonText)}
                    />
                  </Box>
                )}
              </Box>
            </Layer>
          )}
        </I18n>
      )}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider
