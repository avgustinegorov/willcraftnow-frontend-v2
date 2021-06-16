import { PureComponent } from "react"
import { navigate } from "gatsby"

import { addSubpath } from "../utils/path"

// import { lookup, navigatorLanguages } from "langtag-utils"

function isBrowser() {
  return typeof window === "undefined"
}

class Redirect extends PureComponent {
  componentDidMount() {
    if (!isBrowser()) this.perform()
  }

  perform = () => {
    const {
      fallbackLng,
      availableLngs,
      redirectPage,
      lang,
    } = this.props.pageContext

    const detectedLng = lang || fallbackLng

    //const newUrl = withPrefix(`/${detectedLng}${redirectPage}`);
    const newUrl = addSubpath(redirectPage, lang)
    navigate(newUrl, { replace: true })
  }

  render() {
    return null
  }
}

export default Redirect
