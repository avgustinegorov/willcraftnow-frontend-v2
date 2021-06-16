import { Box } from "grommet"
import React from "react"

const Plain = (props) => (
  <svg
    version="1.1"
    id="L4"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 40 50 20"
    enableBackground="new 0 0 0 0"
  >
    <circle fill={props.circlesColor} stroke="none" cx="6" cy="50" r={props.circlesRadius}>
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"
      />
    </circle>
    <circle fill={props.circlesColor} stroke="none" cx="26" cy="50" r={props.circlesRadius}>
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.2"
      />
    </circle>
    <circle fill={props.circlesColor} stroke="none" cx="46" cy="50" r={props.circlesRadius}>
      <animate
        attributeName="opacity"
        dur="1s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.3"
      />
    </circle>
  </svg>
)

Plain.defaultProps = {
  circlesColor: 'rgb(28, 81, 100)',
  circlesRadius: '4'
}

const Dots = (props) => {
  return (
    <Box width="80px" height="xxsmall" align="center">
      <Plain {...props} />
    </Box>
  )
}

Dots.Plain = Plain

Dots.defaultProps = {
  circlesColor: 'rgb(28, 81, 100)',
  circlesRadius: '4'
}

export default Dots
