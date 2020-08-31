import React,{useState, useEffect} from 'react'
import Header from '../components/molecules/header'
import Drawer from '@material-ui/core/Drawer';
import {Switch,Route} from 'react-router-dom'
import Register from './register'
import Main from './main.js'




const MainPages = ({history}) => {
  useEffect(() => {
    
    const token = localStorage.getItem('token')

    if(!token){
      history.replace("/auth")
    }
  },[])
    return (
      <Route exact path="/" component={Main} />
    )
}


const RootPages = () =>{
  const [visible, setVisible] = useState(false)
  const _onBarClick =() => {
    setVisible(true)
  }
  const _closeDrawer =() => {
    setVisible(false)
  }
  return (<div className="root"><Header onBarClick={_onBarClick}></Header>
     <Drawer  open={visible} onClose={_closeDrawer}>
       <div>
         drawer
       </div>
    </Drawer>
    <Switch>
      <Route exact path="/auth" component={Register} />
      <Route exact path="/" component={MainPages} />

    </Switch>

 
  </div>)
} 

export default RootPages
