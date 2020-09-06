import React from 'react'
import { Icon } from 'rsuite'
import {Link} from 'react-router-dom'
import AccessAlarmIcon from '@material-ui/icons/Menu';



const Header = ({onBarClick}) => {
  return (
    <div className="header">
        <div>
        <AccessAlarmIcon style={{margin: "0px 8px"}} onClick={onBarClick}> </AccessAlarmIcon>
        </div>
        <Link to="/"
        ><img src="./jurnalin.png" alt=""  className="logo"/></Link>
        
    </div>
  )
}


export default Header