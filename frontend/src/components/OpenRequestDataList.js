import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function BasicTable() {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: 20, fontWeight: 700 }}>
              Facility
            </TableCell>
            <TableCell style={{ fontSize: 20, fontWeight: 700 }}>
              Current Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell style={{ textAlign: 'center', width: '100%' }} colSpan={2}>
            <Typography variant='h5'>
              You have no open record requests.
            </Typography>
            <Typography variant='p'>
              Records missing? Let us know by starting a new request.
            </Typography>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
