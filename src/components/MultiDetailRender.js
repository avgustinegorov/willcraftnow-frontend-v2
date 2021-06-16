import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Text,
} from "grommet"
import { Edit, Trash } from "grommet-icons"
import { I18n } from "@lingui/react"
import React from "react"

import { Trans, t } from "@lingui/macro"

import AddElementButton from "./AddElementButton"
import LayerDetailRender from "./LayerDetailRender"

const MultiDetailRender = ({
  header = "Header",
  limit = 1,
  children,
  onAdd,
  onRender,
  data,
  onDelete,
  onEdit,
  modalProps,
}) => {
  if (!Array.isArray(data))
    throw new Error(`${header} data needs to be an array`)

  if ((!data || !data.length) && onAdd) {
    return (
      <Box fill margin={{ vertical: "medium", horizontal: "small" }}>
        <AddElementButton onClick={onAdd} label={header} />
      </Box>
    )
  } else if (!data || !data.length) {
    return (
      <Box
        fill
        margin={{ vertical: "medium", horizontal: "small" }}
        align="center"
      >
        <Text>
          <I18n>{({ i18n }) => `${i18n._(t`No`)} ${i18n._(header)}`}</I18n>
        </Text>
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
                <TableCell scope="col" border="bottom" align="center">
                  {i18n._(header)}
                </TableCell>
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
              {data.map(e => (
                <TableRow>
                  <TableCell scope="row" align="center">
                    <Box gap="small" align="center" justify="center">
                      {onRender(e) && <Box>{onRender(e)}</Box>}
                      <LayerDetailRender modalProps={modalProps} data={e} />
                    </Box>
                  </TableCell>
                  {onEdit && (
                    <TableCell align="center">
                      <Edit onClick={() => onEdit(e)} />
                      <Button
                        icon={<Edit />}
                        focusIndicator={false}
                        onClick={() => onEdit(e)}
                      />
                    </TableCell>
                  )}
                  {onDelete && (
                    <TableCell align="center">
                      <Button
                        icon={<Trash />}
                        focusIndicator={false}
                        onClick={() => onDelete(e)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.length < limit && (
            <Box margin={{ vertical: "medium", horizontal: "small" }}>
              <AddElementButton onClick={onAdd} label={header} />
            </Box>
          )}
        </Box>
      )}
    </I18n>
  )
}
export default MultiDetailRender
