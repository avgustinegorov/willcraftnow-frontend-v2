import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Text,
  Button,
  Spinner,
} from "grommet"
import { I18n } from "@lingui/react"
import React from "react"

import { t, Trans } from "@lingui/macro"

import { getAllocation } from "../AssetsAllocations/utils"
import DetailRender from "../DetailRender"
import LayerDetailRender from "../LayerDetailRender"
import MultiDetailRender from "../MultiDetailRender"
import Stepper from "../Stepper"
import getAppointmentHeaders from "../Appointments/getAppointmentHeaders"
import { getAssetDisplayName } from "../AssetsAllocations/getAssetDisplayName"
import { useAssetCategories } from "../../reducers/assets/hooks"
import { useOrderData } from "../../reducers/orders/hooks"
import { useEntityData } from "../../reducers/entities/hooks"
import { useUserDetails } from "../../reducers/user/hooks"
import { useInstructions } from "../../reducers/instructions/hooks"
import { useLastRites } from "../../reducers/lastRites/hooks"
import { useAppointments } from "../../reducers/appointments/hooks"

const getSubAllocations = (allocations, currentAllocation) => {
  return allocations.filter(
    allocation => allocation.parent_allocation === currentAllocation.id
  )
}

const getBeneficiary = (persons, allocation) => {
  return persons.find(person => person.id === allocation.entity)
}

const AssetAllocation = ({ data, header, orderId }) => {
  const { display_name, asset_type, id: assetId } = data
  const [show, _setShow] = React.useState(null)
  const setShow = id => {
    _setShow(id === show ? null : id)
  }

  const { allocations: allAllocations } = useOrderData({ orderId })
  const entities = useEntityData({ orderId })
  const allocations = allAllocations.filter(
    allocation => allocation.asset === assetId
  )

  return (
    <Table alignSelf="stretch" margin={{ vertical: "medium" }}>
      <TableBody>
        <TableRow>
          <TableCell scope="col" align="center" pad={{ horizontal: "none" }}>
            <Box height={{ min: "xsmall" }} justify="center">
              <Text weight="bold" size="large">
                {display_name}
              </Text>
              {asset_type !== "Residual" && (
                <LayerDetailRender
                  modalProps={data => ({
                    header: display_name,
                    buttonProps: {
                      label: (
                        <Text size="xsmall" color="brand">
                          <u>
                            <Trans>See Asset Details</Trans>
                          </u>
                        </Text>
                      ),
                      plain: "true",
                    },
                  })}
                  data={data}
                />
              )}
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell justify="center" pad={{ horizontal: "none" }}>
            <Box fill>
              <Table alignSelf="stretch">
                <TableBody>
                  {!allocations.length && (
                    <TableRow>
                      <TableCell
                        scope="row"
                        align="center"
                        pad={{ vertical: "small", horizontal: "small" }}
                        background="light-2"
                      >
                        <Text>No Allocations</Text>
                      </TableCell>
                    </TableRow>
                  )}
                  {allocations
                    .filter(allocation => !allocation.parent_allocation)
                    .map((allocation, index) => (
                      <>
                        <TableRow>
                          <TableCell
                            scope="row"
                            align="center"
                            border={index !== 0 && "top"}
                            margin={{ top: "medium" }}
                          >
                            <Text>
                              {
                                getBeneficiary(entities, allocation)
                                  .display_name
                              }
                            </Text>
                            <LayerDetailRender
                              modalProps={data => ({
                                header: getBeneficiary(entities, allocation)
                                  .display_name,
                                buttonProps: {
                                  label: (
                                    <Text size="xsmall" color="brand">
                                      <u>
                                        <Trans>See Beneficiary Details</Trans>
                                      </u>
                                    </Text>
                                  ),
                                  plain: "true",
                                },
                              })}
                              data={getBeneficiary(entities, allocation)}
                            />
                          </TableCell>
                          <TableCell
                            scope="row"
                            align="center"
                            border={index !== 0 && "top"}
                            margin={{ top: "medium" }}
                          >
                            <Text>:</Text>
                          </TableCell>
                          <TableCell
                            scope="row"
                            align="center"
                            border={index !== 0 && "top"}
                            margin={{ top: "medium" }}
                          >
                            <Text>{getAllocation(allocation).number}</Text>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            align="center"
                            margin={{ vertical: "small" }}
                          >
                            <Button
                              onClick={() => setShow(allocation.id)}
                              size="small"
                              disabled={
                                !getSubAllocations(allocations, allocation)
                                  .length
                              }
                              label={
                                <Text size="xsmall">
                                  {!!getSubAllocations(allocations, allocation)
                                    .length ? (
                                    <Trans>
                                      Show{" "}
                                      {
                                        getSubAllocations(
                                          allocations,
                                          allocation
                                        ).length
                                      }
                                      Substitute Allocations
                                    </Trans>
                                  ) : (
                                    <Trans>No Substitute Allocations</Trans>
                                  )}
                                </Text>
                              }
                            />
                          </TableCell>
                        </TableRow>
                        {show === allocation.id &&
                          getSubAllocations(allocations, allocation).map(
                            (subAllocation, index) => (
                              <TableRow>
                                <TableCell
                                  scope="row"
                                  align="center"
                                  margin={
                                    index === 0
                                      ? { top: "small", bottom: "xxsmall" }
                                      : { vertical: "xxsmall" }
                                  }
                                  background="light-2"
                                >
                                  <Text>
                                    {
                                      getBeneficiary(entities, subAllocation)
                                        .display_name
                                    }
                                  </Text>
                                  <LayerDetailRender
                                    modalProps={data => ({
                                      header: getBeneficiary(
                                        entities,
                                        subAllocation
                                      ).display_name,
                                      buttonProps: {
                                        label: (
                                          <Text size="xsmall" color="brand">
                                            <u>
                                              <Trans>
                                                See Substitute Beneficiary
                                                Details
                                              </Trans>
                                            </u>
                                          </Text>
                                        ),
                                        plain: "true",
                                      },
                                    })}
                                    data={getBeneficiary(
                                      entities,
                                      subAllocation
                                    )}
                                  />
                                </TableCell>
                                <TableCell
                                  scope="row"
                                  align="center"
                                  margin={
                                    index === 0
                                      ? { top: "small", bottom: "xxsmall" }
                                      : { vertical: "xxsmall" }
                                  }
                                  background="light-2"
                                >
                                  <Text>:</Text>
                                </TableCell>
                                <TableCell
                                  scope="row"
                                  align="center"
                                  margin={
                                    index === 0
                                      ? { top: "small", bottom: "xxsmall" }
                                      : { vertical: "xxsmall" }
                                  }
                                  background="light-2"
                                >
                                  <Text>
                                    {getAllocation(subAllocation).number}
                                  </Text>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        {show === allocation.id &&
                          getSubAllocations(allocations, allocation).length !==
                            0 && (
                            <TableRow>
                              <TableCell
                                scope="row"
                                align="right"
                                margin={{ top: "xxsmall", bottom: "small" }}
                                background="light-2"
                              >
                                <Text>
                                  <Trans>Total</Trans>
                                </Text>
                              </TableCell>
                              <TableCell
                                scope="row"
                                align="center"
                                margin={{ top: "xxsmall", bottom: "small" }}
                                background="light-2"
                              >
                                <Text>:</Text>
                              </TableCell>
                              <TableCell
                                scope="row"
                                align="center"
                                background="light-2"
                                margin={{ top: "xxsmall", bottom: "small" }}
                              >
                                <Text>{getAllocation(allocation).number}</Text>
                              </TableCell>
                            </TableRow>
                          )}
                      </>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

const WillSummaryBody = ({ orderData, orderId, orderType }) => {
  const appointments = useAppointments({ orderId, orderType })
  const assetClasses = useAssetCategories({ orderId })
  const userDetails = useUserDetails()
  const entities = useEntityData({ orderId })
  const legalServices = orderData.legal_services
  const instructions = useInstructions({ orderId })
  const lastRites = useLastRites({ orderId })

  if (
    !appointments ||
    !assetClasses ||
    !userDetails ||
    !entities ||
    !instructions ||
    !lastRites
  )
    return <Spinner />

  return (
    <I18n>
      {({ i18n }) => (
        <Stepper>
          <Stepper.Panel headerText={t`Your Details`}>
            <Stepper.Body>
              <DetailRender data={userDetails} />
            </Stepper.Body>
          </Stepper.Panel>
          {Object.entries(appointments).map(
            ([appointment, appointmentData], index) => (
              <Stepper.Panel
                headerText={
                  getAppointmentHeaders({
                    appointment,
                    count: appointmentData.length,
                  }).headerText
                }
              >
                <Stepper.Body>
                  <MultiDetailRender
                    header={i18n._(
                      getAppointmentHeaders({
                        appointment,
                        count: appointmentData.length,
                      }).headerText
                    )}
                    onRender={data =>
                      appointment === "WITNESS" && legalServices.length
                        ? data.firm_details.name
                        : data.display_name
                    }
                    modalProps={
                      appointment === "WITNESS" && legalServices.length
                        ? data => ({
                            header: data.firm_details.name,
                            data: data,
                          })
                        : data => ({
                            header: data.display_name,
                            data: data,
                          })
                    }
                    data={
                      appointment === "WITNESS" && legalServices.length
                        ? legalServices.filter(
                            service =>
                              service.service_type === appointment.toUpperCase()
                          )
                        : appointmentData.map(appointment =>
                            entities.find(
                              entity => appointment.entity === entity.id
                            )
                          )
                    }
                  />
                </Stepper.Body>
              </Stepper.Panel>
            )
          )}
          <Stepper.Panel headerText={t`Instructions`}>
            <Stepper.Body>
              <DetailRender header={t`Instructions`} data={instructions} />
            </Stepper.Body>
          </Stepper.Panel>
          <Stepper.Panel headerText={t`Last Rites`}>
            <Stepper.Body>
              <DetailRender header={t`Last Rites`} data={lastRites} />
            </Stepper.Body>
          </Stepper.Panel>
          {Object.entries(assetClasses).map(
            ([assetClass, assetClassData], index) => (
              <Stepper.Panel
                headerText={getAssetDisplayName(assetClass)}
                show={!!assetClassData.length}
              >
                <Stepper.Body>
                  <Box
                    fill
                    gap="medium"
                    border={{
                      color: "border",
                      style: "dashed",
                      side: "between",
                    }}
                  >
                    {assetClassData.map(assetData => (
                      <AssetAllocation
                        header={assetClass}
                        data={assetData}
                        orderId={orderId}
                      />
                    ))}
                  </Box>
                </Stepper.Body>
              </Stepper.Panel>
            )
          )}
        </Stepper>
      )}
    </I18n>
  )
}

export default WillSummaryBody
