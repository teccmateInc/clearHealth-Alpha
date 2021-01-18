import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name) {
  return { name };
}

const rows = [
  createData('Advocate Health Care > Advocate Illinois Masonic Medical Center'),
  createData('Rocky Mountain Cancer Center > Lone Tree > Sky Ridge Medical Center')
];

export default function BasicTable() {
  const classes = useStyles();


  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize:20, fontWeight:700}}>Facility</TableCell>
            <TableCell style={{fontSize:20, fontWeight:700}}>Current Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <p>{ Date().toLocaleString() }</p>
                <div style={{background: '#11B066', color: '#fff', padding: 6, borderRadius: 6, width: '30%', textAlign: 'center'}}>Complete</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
