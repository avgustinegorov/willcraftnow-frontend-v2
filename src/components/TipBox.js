import { Box, Text } from "grommet"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { TipContext } from "./TipContextProvider"

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef()

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  React.useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current()
    }, delay)
    return () => clearInterval(id)
  }, [delay])
}

const pickRandomTip = tips => {
  const randomTipIndex = Math.floor(Math.random() * tips.length)
  const randomTip = tips[randomTipIndex]

  return {
    title: randomTip.title,
    content: randomTip.content,
  }
}

const TipBox = props => {
  const {
    allStrapiTips: { edges },
  } = useStaticQuery(graphql`
    query {
      allStrapiTips {
        edges {
          node {
            id
            step
            tipType
            title
            content
          }
        }
      }
    }
  `)

  const tips = edges.map(edge => edge.node)
  const [currentTip, setCurrentTip] = React.useState({ title: "", content: "" })

  useInterval(() => {
    setCurrentTip(pickRandomTip(tips))
  }, 1000)

  return (
    <Box align="center">
      <Text size="xlarge" margin="12px 0" textAlign="center" weight="bold">
        {currentTip.title}
      </Text>
      <Box width={{ max: "80%" }} margin="0 0 24px 0">
        <Text
          dangerouslySetInnerHTML={{ __html: currentTip.content }}
          textAlign="center"
        />
      </Box>
    </Box>
  )
}
export default TipBox
