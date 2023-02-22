import React from 'react'
import { Tokens } from '../theme'
import { Box ,Typography, useTheme, OutlinedInput, InputAdornment} from '@mui/material'


const Mesaurement = ({field, name, value, onChange}) => {

    const theme = useTheme()
    const colors = Tokens(theme.palette.mode)


  return (
    
    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mb :"7px", p:"5px"}}>
            <Typography variant='h5' sx={{p :"7px"}}>{field}</Typography>
            <OutlinedInput
              id= {field}
              endAdornment={<InputAdornment position="end">in.</InputAdornment>}
              size="small"
              name = {name}
              value= {value}
              onChange = {onChange}
              type="number"
              inputProps={{
                step: 0.5,
              }}
              sx={{
                    width:"100px"
              }}
            />
    </Box>
  )
}

export default Mesaurement