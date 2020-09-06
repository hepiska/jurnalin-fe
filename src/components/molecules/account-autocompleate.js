import React,{useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {request} from '../../utils/services'

const AccountAutoComplete = ({className, label, placeholder, filter, onChange}) =>  {
  
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  
  useEffect(() =>{
    const params = {
      limit: 1000
    }
    if(filter){
      params.search = "action_type-eq:"+ filter

    }
    setLoading(true)
    request({url: '/account', params}).then(res => {
      setLoading(false)
      setOptions(res.data.data.accounts)
    })

  },[])

  return (
    <Autocomplete
      id="combo-box-demo"
      className={className}
      options={options}
      getOptionLabel={(option) => option.name}
      onChange={(e, newValue) => {onChange(newValue)}}
      loading={loading}
      // style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  );
}


export default AccountAutoComplete