import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  List,
  Grid,
  Button,
  Text,
} from "grommet"
import { Edit, Trash } from "grommet-icons"
import { I18n } from "@lingui/react"
import PropTypes from "prop-types"
import React from "react"

import { t, Trans } from "@lingui/macro"

import AddElementButton from "./AddElementButton"
import toDisplayList from "../utils/toDisplayList"

const DetailRender = ({
  header,
  excludedFields = [],
  children,
  data,
  onDelete,
  onEdit,
  onAdd,
}) => {
  if (!data && onAdd) {
    return (
      <Box fill margin={{ vertical: "medium", horizontal: "small" }}>
        <AddElementButton onClick={onAdd} label={header} />
      </Box>
    )
  } else if (!data) {
    return (
      <Box
        fill
        margin={{ vertical: "medium", horizontal: "small" }}
        align="center"
      >
        <I18n>{({ i18n }) => `${i18n._(t`No`)} ${i18n._(header)}`}</I18n>
      </Box>
    )
  }

  return (
    <I18n>
      {({ i18n }) => (
        <Box fill margin={{ vertical: "medium", horizontal: "small" }}>
          <Table alignSelf="stretch">
            <TableHeader>
              <TableRow>
                {header && (
                  <TableCell scope="col" border="bottom" align="center">
                    {i18n._(header)}
                  </TableCell>
                )}
                {onEdit && (
                  <TableCell scope="col" border="bottom" align="center">
                    <Trans>Edit</Trans>
                  </TableCell>
                )}
                {onDelete && (
                  <TableCell scope="col" border="bottom" align="center">
                    <Trans>Delete</Trans>
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell scope="row" align="center">
                  <List
                    itemProps={{
                      0: { border: "bottom" },
                    }}
                    children={(datum, index) => {
                      return (
                        <Grid gap="small">
                          <Box align="start">
                            <Text size="small" color="dark-4">
                              {datum["key"]}
                            </Text>
                          </Box>
                          <Box align="center">
                            <Text>{datum["value"]}</Text>
                          </Box>
                        </Grid>
                      )
                    }}
                    data={toDisplayList(data)}
                  />
                </TableCell>
                {onEdit && (
                  <TableCell align="center">
                    <Button
                      icon={<Edit />}
                      focusIndicator={false}
                      onClick={onEdit}
                    />
                  </TableCell>
                )}
                {onDelete && (
                  <TableCell align="center">
                    <Button
                      icon={<Trash />}
                      focusIndicator={false}
                      onClick={onDelete}
                    />
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      )}
    </I18n>
  )
}

DetailRender.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DetailRender
