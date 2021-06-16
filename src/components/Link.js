import { Link as GatsbyLink } from "gatsby"
import React from "react"

import LocaleContext from "../services/i18n/LocaleContext"

// Use the globally available context to choose the right path
const LocalizedLink = ({ to, ...props }) => {
  const { lang } = React.useContext(LocaleContext)

  const isIndex = to === `/`

  // If it's the default language, don't do anything
  // If it's another language, add the "path"
  // However, if the homepage/index page is linked don't add the "to"
  // Because otherwise this would add a trailing slash
  const path = isIndex ? `/${lang}` : `/${lang}/${to}`

  return <GatsbyLink {...props} to={path} />
}

const isHash = str => /^#/.test(str)
const isInternal = to => /^\/(?!\/)/.test(to)

// Only use <LocalizedLink /> for internal links
const Link = ({ href, ...props }) =>
  isHash(href) || !isInternal(href) ? (
    <a {...props} href={href} />
  ) : (
    <LocalizedLink {...props} to={href} />
  )

export default Link
