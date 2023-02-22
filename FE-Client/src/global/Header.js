import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import { Tokens } from '../theme'

const Header = ({title, subtitle}) => {
    const theme = useTheme()
    const colors = Tokens(theme.palette.mode)


  return (
    <Box mb="30px">
        <Typography variant="h2" color={colors.Grey[100]} fontWeight="bold" sx={{mb:"5px"}}>{title}</Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>{subtitle}</Typography>
    </Box>
  )
}

export default Header