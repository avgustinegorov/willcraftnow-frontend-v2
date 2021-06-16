import React, { useCallback } from "react"
import { CheckBox, Box, Text } from "grommet"
import { navigate } from "gatsby"

import { useLocation } from "@reach/router"

import { addSubpath, getLangFromUrl, removeSubpath } from "../../utils/path"
import LocaleContext from "../../services/i18n/LocaleContext"

const LanguageSwitch = ({ toggleSidebar }) => {
  const { languages, lang } = React.useContext(LocaleContext)

  const location = useLocation()

  const onChange = useCallback(
    event => {
      const nextlang = event.target.checked ? "zh-CN" : "en"
      const urlLang = getLangFromUrl(location.pathname, languages)
      const nextUrl = "/"

      if (!urlLang) {
        navigate(addSubpath(nextUrl, nextlang))
      } else {
        navigate(
          addSubpath(removeSubpath(location.pathname, urlLang), nextlang)
        )
      }

      if (typeof toggleSidebar === "function") {
        toggleSidebar()
      }
    },
    [languages, location.pathname, toggleSidebar]
  )

  return (
    <Box direction="row" gap="xsmall" align="center">
      <Text size="xsmall">EN</Text>
      <CheckBox onChange={onChange} toggle checked={lang === "zh-CN"} />
      <Text size="xsmall">CN</Text>
    </Box>
  )
}

export default LanguageSwitch
