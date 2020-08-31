import React,{useState, useMemo, useEffect} from 'react'
import LoginOrg from '../components/organisms/login'
import Register from '../components/organisms/register'
import {queryStringToObject} from '../utils/helpers'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {request} from '../utils/services'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Auth = ({location, history}) => {
  const query = queryStringToObject(location.search)
  const [section, setSection] = useState(query.section || 'login') 
  const [showerror, seterror] = useState(null)

  useEffect(() => {
      const token = localStorage.getItem('token')
      if(token){
        if(query.telegram){
          request({url:"/auth/sync/telegram", method: "POST", data: {telegram: query.telegram }}).then(() => {
            history.replace("/")
          }).catch(err => {
            if(err.response?.data?.data){
              seterror(err.response.data.data)
            }else{
              seterror(err)
            }
            history.replace("/")
          })
        }
      
      }
  },[])

  


  const _renderSection = useMemo(() => {
    const sectionmap = {
      login:  <LoginOrg telegram={query.telegram} history={history} setSection={setSection}></LoginOrg>,
      register: <Register telegram={query.telegram} history={history} setSection={setSection}></Register>
    }
    return sectionmap[section]
  },[section]) 

  return (
    <div>
            <Snackbar open={!!showerror} autoHideDuration={6000} >
        <Alert  severity="error">
          {showerror?.message}
        </Alert>
      </Snackbar>
      {_renderSection}
    </div>
  )
}


export default Auth