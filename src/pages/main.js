import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import JurnalTable from '../components/organisms/jurnal-table';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  item: {marginTop: theme.spacing(2), padding: "p"},

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: 'rgb(150, 150, 150)',
    margin: theme.spacing(3, 0, 2),
  },
}));


const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid>
      <ButtonGroup  color="primary" aria-label="contained primary button group">
        <Button > Penjualan</Button>
        <Button  >Pembelian</Button>
        <Button  >Pengeluaran</Button>
        </ButtonGroup>

      </Grid>
      <JurnalTable></JurnalTable>

  
      
    </div>
  )
}


export default Main