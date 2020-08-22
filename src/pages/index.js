import React,{useState} from 'react'
import Header from '../components/molecules/header'
import Drawer from '@material-ui/core/Drawer';
import {Switch,Route} from 'react-router-dom'
import Register from './register'
import Main from './main.js'


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
      <Route exact path="/register">
      <Register></Register>
      </Route>
      <Route exact path="/">
      <Main></Main>
      </Route>
    </Switch>

 
  </div>)
} 

export default RootPages
