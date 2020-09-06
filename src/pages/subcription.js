import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import {useFormValidator} from '../hooks/useFormValidator'
import JurnalTable from '../components/organisms/jurnal-table';
import Snackbar from '@material-ui/core/Snackbar';
import {request} from '../utils/services'
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    paddingHorizontal: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  item: {marginTop: theme.spacing(2), padding: "p"},
}));

const paymentOptions = [{value: "cc", title: "Credit Card"}]

const Subcription = ({history, location}) => {
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
      setLoading(true)
      request({url: "/transaction/subcribe", method: "POST",data}).then(res => {
        const data = res.data.data
        setLoading(false)

        if(data.status_code !== "00"){
          seterror({message: data.status_desc} )
        }else{
          history.goBack()
          window.open(data.redirect_url)
        }
      }).catch(err => {
        setLoading(false)
        seterror(err.response.data)
     
      })
      
    }else{
      seterror({message: "data tidak lengkap atau tidak sesuai format"})
      setLoading(false)

    }

  }


  const { state, handleOnChange, handleOnSubmit, setFieldError} = useFormValidator({
    payment_method: {
      required: true,
     },
     month_subscription: {
      required: true,
    },

    cust_id: {
      required: true,
      pattern: {
        regEx: /^[0-9]{12,14}$/i,
        message: 'invalid card number',
      }
    },
    cust_msisdn: {
      regEx: /^[0-9]{10,14}$/i,
      required: true,
    }
  }, _onSubmit)

  const handleClose = () => {
    seterror(false)
  }

  return (<div className={classes.paper}>
          <Snackbar open={!!showerror} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {showerror?.message}
        </Alert>
      </Snackbar>
        <Typography component="h1" variant="h5">
          Langganan
      </Typography>
      <div style={{width: '100%', padding: '0px 16px',   display: 'flex' ,flexDirection: "column"}}>
      <FormControl>
      <InputLabel id="demo-mutiple-name-label">Metode Pembayaran</InputLabel>
      <Select
          id="payment_method"
          onChange={handleOnChange("payment_method")}
          select
          placeholder="dalam bulan"    
          className={classes.item}
          SelectProps={{
            native: true,
          }}
        >
          {paymentOptions.map(data => {
              return <MenuItem value={data.value}>{data.title}</MenuItem>
          })}    
        </Select>
      </FormControl>
      
      <TextField
        id="month_subscription"
        label="Lama Langganan"
        className={classes.item}
        onChange={handleOnChange("month_subscription")}
        placeholder="dalam bulan"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="cust_id"
        label="Nomor Kartu"
        onChange={handleOnChange("cust_id")}
        className={classes.item}
        placeholder="11223344556677"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="cust_msisdn"
        onChange={handleOnChange("cust_msisdn")}
        label="Nomor HP"
        className={classes.item}
        placeholder="082233445566"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />

{loading ? <CircularProgress /> :  (   <Button
      type="submit"
      fullWidth
      onClick={handleOnSubmit}
      className={classes.item}
      variant="contained"
      color="primary"
    >
      Simpan
    </Button>) 
         
          }
    </div>
     

  </div>)

}


export default Subcription