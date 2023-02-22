import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import {Box, IconButton, useTheme, InputBase} from "@mui/material"
import { ColorModeContext, Tokens } from '../theme'
import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined'
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined'
import  NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import  PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined'
import SearchIcon from '@mui/icons-material/Search'


const Topbar = () => {

    const theme = useTheme()
    const colors = Tokens (theme.palette.mode)
    const colorMode = useContext(ColorModeContext);


    const handleClear = () =>{
        sessionStorage.clear()
    
      }
    

  return (

    <Box display="flex" justifyContent={'space-between'} p={2}>

        {/* Search Bar */}

        <Box display="flex" backgroundColor={colors.Primary[400]} borderRadius="3px">

            <InputBase sx={{ ml:2, flex:1 }} placeholder="Search"/>

            <IconButton type="button" sx={{ p:1 }}>
                <SearchIcon/>
            </IconButton>
        </Box>

        {/* Icons */}

        <Box display="flex" >

            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (<DarkModeOutlinedIcon/>): (<LightModeOutlinedIcon/>)}
            </IconButton>

            <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton>

            <IconButton onClick={handleClear}>
                <Link to='/' style={{textDecoration:"none", color:"inherit"}} >
                    <LogoutOutlinedIcon />
                </Link>
            </IconButton>

            <IconButton>
                <PersonOutlinedIcon/>
            </IconButton>

        </Box>


    </Box>
  )
}

export default Topbar