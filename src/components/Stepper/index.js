import { Box, Grid, Heading, Text, Collapsible, Stack } from "grommet"

import { I18n } from "@lingui/react"
import React from "react"

const StepperContext = React.createContext()

const Stepper = ({ children }) => {
  let StepperPanels = React.Children.map(children, (child, index) =>
    child &&
    child.type.displayName === "StepperPanel" &&
    child.props.show !== false
      ? child
      : null
  )

  StepperPanels = React.Children.toArray(StepperPanels).map((child, index) =>
    React.cloneElement(child, { _index: index })
  )

  const [collapseState, setCollapseState] = React.useState(null)
  return (
    <StepperContext.Provider
      value={{
        collapseState,
        setCollapseState,
        totalCollapse: StepperPanels.length,
      }}
    >
      <Box width="large" className="Stepper">
        {StepperPanels}
      </Box>
    </StepperContext.Provider>
  )
}

const StepperPanel = ({ children, headerText, subHeaderText, _index }) => {
  const { collapseState, setCollapseState, totalCollapse } = React.useContext(
    StepperContext
  )
  const panel = {}
  React.Children.map(children, (child, index) => {
    panel[child.type.displayName] = child
  })
  const { StepperBody } = panel

  return (
    <Box>
      <I18n>
        {({ i18n }) => (
          <Box>
            <Grid columns={["1.6em", "flex"]} rows={["flex"]}>
              <Stack guidingChild="last">
                <Grid
                  fill
                  rows={["flex", "auto", "flex"]}
                  columns={["flex"]}
                  justify="center"
                >
                  <Box border={_index !== 0 && "left"} height="100%" />
                  <Box flex="grow" justify="center">
                    <Box
                      background={{
                        color: "brand",
                        opacity: collapseState === _index ? "strong" : "medium",
                      }}
                      width="1.6em"
                      height="1.6em"
                      pad={{ horizontal: "small" }}
                      round="full"
                      border
                      align="center"
                      justify="center"
                      overflow="visible"
                    >
                      <Text>{_index + 1}</Text>
                    </Box>
                  </Box>

                  <Box
                    border={
                      (_index + 1 < totalCollapse ||
                        collapseState === _index) &&
                      "left"
                    }
                    height="100%"
                  />
                </Grid>
                <Box />
              </Stack>
              <Box
                margin={{ left: "medium" }}
                pad={{ horizontal: "medium", vertical: "small" }}
                onClick={() =>
                  setCollapseState(collapseState === _index ? null : _index)
                }
                round="medium"
                hoverIndicator={true}
              >
                <Heading
                  level={3}
                  size="small"
                  margin={{ vertical: "xsmall" }}
                  dangerouslySetInnerHTML={{ __html: i18n._(headerText) }}
                />

                <Text
                  size="small"
                  color="brand"
                  dangerouslySetInnerHTML={{ __html: i18n._(subHeaderText) }}
                />
              </Box>
            </Grid>
          </Box>
        )}
      </I18n>
      <Collapsible open={collapseState === _index}>
        {collapseState === _index && <Box>{StepperBody}</Box>}
      </Collapsible>
    </Box>
  )
}
StepperPanel.displayName = "StepperPanel"
Stepper.Panel = StepperPanel

const StepperBody = ({ children }) => {
  if (children.length === 0) {
    return null
  }
  return (
    <Box>
      <Grid columns={["1.6em", "flex"]} rows={["flex"]}>
        <Stack guidingChild="last">
          <Box fill align="center">
            <Box border="left" height="100%" width="1px" />
          </Box>
          <Box fill />
        </Stack>
        <Box className="stepperBody">{children}</Box>
      </Grid>
    </Box>
  )
}
StepperBody.displayName = "StepperBody"
Stepper.Body = StepperBody

export default Stepper
