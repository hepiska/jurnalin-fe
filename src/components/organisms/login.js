import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {useFormValidator} from '../../hooks/useFormValidator'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import {request} from '../../utils/services'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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

export default function SignIn({ history, setSection, telegram}) {
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
      request({url:"/auth/login", method: "POST", data:{...data, telegram: telegram}}).then(res => {
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
  email: {
      required: false,
      initialValue: "",
      pattern: {
        regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address format',
      }
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
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={state.email.value || ""}
            error={!!state.email.error}
            onChange={handleOnChange("email")}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={() => {setSection("register")}} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}