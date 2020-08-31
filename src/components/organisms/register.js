import React ,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormValidator} from '../../hooks/useFormValidator'
import CircularProgress from '@material-ui/core/CircularProgress';
import {request} from '../../utils/services'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: 'rgb(150, 150, 150)',
    margin: theme.spacing(3, 0, 2),
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Register({changeType, history, telegram, setSection}) {
  const classes = useStyles();
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
      request({url:"/auth/register", method: "POST",  data: {...data, telegram:telegram}}).then(res => {
        localStorage.setItem("token", res.data.data.token)

        if(telegram){
          request({url:"/auth/sync/telegram", method: "POST", data: {telegram: telegram }})
        }

        setLoading(false)
        history.replace("/")

      }).catch(err => {
        if(err.response?.data?.data){
          seterror(err.response.data.data)

        }else{
          seterror(err)
        }
        setLoading(false)
      })
    }else{
      seterror({message: "data tidak lengkap atau tidak sesuai format"})
    }

  }

  const handleClose = () => {
    seterror(false)
  }
  const { state, handleOnChange, handleOnSubmit, setFieldError} = useFormValidator({
    name: {
      required: true,
     },
     tnc: {
      initialValue: true,
      required: true,
      message: 'Terms of Use and Privacy Policy must be accepted',
    },email: {
      required: false,
      initialValue: "",
      pattern: {
        regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address format',
      }
    },
    confirmPassword: {
      required: false,
      pattern: {
        condition: (value, { password }) => value === password.value,
        message: 'Passwords don`t match',
      },
    },
    password: {
      required: true,
    }

  }, _onSubmit)

  const handleSubmit = (e) => {
    e.preventDefault()

    handleOnSubmit()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Snackbar open={!!showerror} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {showerror?.message}
        </Alert>
      </Snackbar>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={state.email.value || ""}
            error={!!state.email.error}
            onChange={handleOnChange("email")}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            onChange={handleOnChange("name")}
            value={state.name?.value || ""}
            error={!!state.name.error}
            required
            fullWidth
          
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={state.password?.value || ""}
            error={!!state.password.error}
            onChange={handleOnChange("password")}

            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={state.confirmPassword?.value || ""}
            error={!!state.confirmPassword.error}    
            onChange={handleOnChange("confirmPassword")}
            name="confirm-password"
            label="Confim Password"
            type="password"
            id="password"
          />
          <FormControlLabel
            control={<Checkbox  
              error={!!state.tnc.error}    
              checked={state.tnc.value}  
              color="primary"  />}
              onChange={(e) =>{
                handleOnChange("tnc")(!state.tnc.value)
            }}       
            label="aggree with term and condition"
          />
          {loading ? <CircularProgress /> :  (<Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>) 
         
          }

          <Grid container>
            <Grid item>
              <Link  onClick={() => {setSection("login")}} variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}