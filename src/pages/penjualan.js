import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import JurnalTable from '../components/organisms/jurnal-table';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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
  title: {
    margin: "0px 16px 24px"
  },
  submit: {
    backgroundColor: 'rgb(150, 150, 150)',
    margin: theme.spacing(3, 0, 2),
  },
}));


const Penjualan = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.paper}>
      <h1 className={classes.title}>Penjualan</h1>
      <div style={{width: '100%', padding: '0px 16px',   display: 'flex' ,flexDirection: "column"}}>
      <TextField
        id="date"
        label="Tanggal Transaksi"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
          <TextField
          id="standard-select-currency-native"
          select
          label="Transaksi ke "
          SelectProps={{
            native: true,
          }}
        >
          
        </TextField>
        <TextField
          id="standard-select-currency-native"
          select
          label="Nominal"
          SelectProps={{
            native: true,
          }}
        >
          
        </TextField>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Simpan
          </Button>
      </div>
      


  
      
    </div>
  )
}


export default Penjualan