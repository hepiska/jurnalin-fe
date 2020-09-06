import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import JurnalTable from '../components/organisms/jurnal-table';
import {useFormValidator} from '../hooks/useFormValidator'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AccountAutoComplete from '../components/molecules/account-autocompleate';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
  item: {marginTop: theme.spacing(2)},

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


const Pembelian = () => {
  const classes = useStyles()
  const [showerror, seterror] = useState(null)
  const [loading, setLoading] = useState(false)

  const _onSubmit = ({ isValid, state }) => {
    // request({url:"/auth/register", method: "POST", data: {}})
    if(isValid){
      const data = {}
      Object.keys(state).forEach(key => {
        data[key] = state[key].value
      })
      console.log(data)
      // setLoading(true)
      // request({url: "/transaction/subcribe", method: "POST",data}).then(res => {
      //   const data = res.data.data
      //   setLoading(false)

      //   if(data.status_code !== "00"){
      //     seterror({message: data.status_desc} )
      //   }else{
      //     history.goBack()
      //     window.open(data.redirect_url)
      //   }
      // }).catch(err => {
      //   setLoading(false)
      //   seterror(err.response.data)
     
      // })
      
    }else{
      seterror({message: "data tidak lengkap atau tidak sesuai format"})
      setLoading(false)

    }

  }


  const { state, handleOnChange, handleOnSubmit, setFieldError} = useFormValidator({
    transaction_date: {
      required: true,
     },
     account_kredit: {
      required: true,
    },
    account_debet : {
      required: true,
    },
    value: {
      required: true,
    }
  }, _onSubmit)

  const handleClose = () => {
    seterror(false)
  }


  return (
    <div className={classes.paper}>
        <Snackbar open={!!showerror} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {showerror?.message}
        </Alert>
      </Snackbar>
      <h1 className={classes.title}>Pembelian</h1>
      <div style={{width: '100%', padding: '0px 16px',   display: 'flex' ,flexDirection: "column"}}>
      <TextField
        id="date"
        label="Tanggal Transaksi"
        type="date"
        onChange={handleOnChange("transaction_date")}
        value={state.transaction_date.value}
        className={classes.item}
        InputLabelProps={{
          shrink: true,
        }}
      />
        
      <AccountAutoComplete 
        placeholder="pilih cara bayar"
        value={state.account_kredit.value}
        onChange={(_value) =>  handleOnChange("account_kredit")(_value._id)}
        label="Bayar Mengunakan"
        filter="sale"

      className={classes.item}
      />
        <AccountAutoComplete 
        placeholder="pilih cara bayar"
        value={state.account_debet.value}
        onChange={(_value) =>  handleOnChange("account_debet")(_value._id)}
        label="Untuk Pembayaran"
        filter="purchase"

      className={classes.item}
      />
          
      <TextField
        label="Jumlah"
        type="number"
        placeholder="2000000"
        onChange={handleOnChange("value")}
        value={state.value.value}
        className={classes.item}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <Button
            type="submit"
            fullWidth
            className={classes.item}
            onClick={handleOnSubmit}
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


export default Pembelian