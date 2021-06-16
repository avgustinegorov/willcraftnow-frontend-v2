import { Box, Collapsible, Button, Text, Grid } from "grommet"
import React from "react"

import { t, Trans } from "@lingui/macro"

import AddElementButton from "../../AddElementButton"
import Allocation from "./Allocation"

const AllocationContext = React.createContext()

const Allocations = ({ children, onAddAllocation }) => {
  const AllocationPanels = React.Children.map(children, (child, index) =>
    child && child.type.displayName === "AllocationPanel" ? child : null
  )

  const [collapseState, setCollapseState] = React.useState(null)

  return (
    <AllocationContext.Provider value={{ collapseState, setCollapseState }}>
      <Box gap="medium" fill="horizontal" align="center">
        {AllocationPanels}
        {onAddAllocation && (
          <AddElementButton
            onClick={onAddAllocation}
            label={t`Add Allocation`}
          />
        )}
      </Box>
    </AllocationContext.Provider>
  )
}

const AllocationPanel = ({ children }) => {
  const panel = {}
  React.Children.map(children, (child, index) => {
    if (child) panel[child.type.displayName] = child
  })
  const { Allocation, SubstituteAllocations } = panel

  return (
    <Box
      border
      round="medium"
      pad="medium"
      style={{ display: "table", width: "100%" }}
      width={{ max: "large" }}
      gap="medium"
    >
      <Box>{Allocation}</Box>
      <Box>{SubstituteAllocations}</Box>
    </Box>
  )
}
AllocationPanel.displayName = "AllocationPanel"
Allocations.AllocationPanel = AllocationPanel

const SubstituteAllocations = ({
  children,
  index,
  onAddSubsituteAllocation,
}) => {
  const { collapseState, setCollapseState } = React.useContext(
    AllocationContext
  )

  const Allocations = React.Children.map(children, (child, index) => {
    if (child.type.displayName === "Allocation") return child
  })

  const numAllocations = Allocations.length

  return (
    <Box align="center">
      <Box>
        <Button
          label={
            !numAllocations ? (
              <Trans>Add Substitute Allocation</Trans>
            ) : (
              <Trans>Show {numAllocations} Substitute Allocations</Trans>
            )
          }
          size="small"
          onClick={
            !numAllocations
              ? onAddSubsituteAllocation
              : () => {
                  setCollapseState(collapseState === index ? null : index)
                }
          }
        />
      </Box>

      <Collapsible open={collapseState === index}>
        <Box align="center">
          <hr
            style={{ width: "66%", marginBottom: "1.5em", marginTop: "1.4em" }}
          />
          <Text as="h4" margin="none">
            <Trans>Substitute Allocations</Trans>
          </Text>
          <Box gap="small" border="between" margin={{ vertical: "medium" }}>
            {Allocations}
          </Box>
          {onAddSubsituteAllocation && (
            <AddElementButton
              size="small"
              onClick={onAddSubsituteAllocation}
              label={t`Add Substitute Allocation`}
            />
          )}
        </Box>
      </Collapsible>
    </Box>
  )
}
SubstituteAllocations.displayName = "SubstituteAllocations"
Allocations.SubstituteAllocations = SubstituteAllocations

Allocations.Allocation = Allocation

export default Allocations
