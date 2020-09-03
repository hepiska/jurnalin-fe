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
    // minWidth: 650,
  },
});


const data = [{name: "11-08-2020", description: "pembelian bahan baku daging" , debet: "Pembelian bahan baku: Rp 100.000", Kredit:"kas: Rp: 100.000" },{name: "11-08-2020",  description: "pembelian bahan baku daging" , debet: "Pembelian bahan baku: Rp 100.000", Kredit:"kas: Rp: 100.000"},{name: "11-08-2020",  description: "pembelian bahan baku daging" , debet: "Pembelian bahan baku: Rp 100.000", Kredit:"kas: Rp: 100.000"}]

const JurnalTable = () => {
  const classes = useStyles();

  return (
    <>
    <h2>Jurnal</h2>
    <TableContainer component={Paper} style={{margin: "16px"}}>
            <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
          <TableRow>
            <TableCell>Tanggal </TableCell>
            <TableCell align="right">Deskipsi</TableCell>
            <TableCell align="right">Debet</TableCell>
            <TableCell align="right">Kredit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.debet}</TableCell>
              <TableCell align="right">{row.Kredit}</TableCell>
              </TableRow>         
             ))}
        </TableBody>
            </Table>

      </TableContainer>
      </>

  )
}


export default JurnalTable