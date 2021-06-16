import React from "react"
import { Box } from "grommet"
import { request } from "../utils/request"

export const TipContext = React.createContext()

const TipContextProvider = ({ children }) => {
  const fetchTips = React.useCallback(async () => {
    try {
      const response = await request({ url: "/content/tips_keywords/" })
      return response.data
    } catch (error) {
      // TODO: display error message
      console.log(error)
    }

    return []
  }, [])

  const pickRandomTip = React.useCallback(tips => {
    const randomTipIndex = Math.floor(Math.random() * tips.length)
    const randomTip = tips[randomTipIndex]

    return {
      title: randomTip.title,
      content: randomTip.content,
    }
  }, [])

  const [tips, setTips] = React.useState([])

  React.useEffect(() => {
    ;(async () => {
      const fetchedTips = await fetchTips()
      setTips(fetchedTips)
    })()
  }, [fetchTips])

  return (
    <TipContext.Provider value={{ pickRandomTip: pickRandomTip, tips: tips }}>
      <Box fill className="ContextProvider">
        {children}
      </Box>
    </TipContext.Provider>
  )
}
export default TipContextProvider
