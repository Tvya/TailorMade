import React from 'react'
import { Tokens } from '../theme'
import Header from '../global/Header'
import Measurement from '../global/Mesaurementinput'
import { Box, TextField, Button,Typography, useTheme, Grid, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel,OutlinedInput, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as yup from 'yup';
import main from '../img/main.png';
import { WrapText, YardOutlined } from '@mui/icons-material'
import { margin } from '@mui/system'
import { GridRow } from '@mui/x-data-grid'

const AddOrder = () => {
  const theme = useTheme();
  const colors = Tokens (theme.palette.mode)

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)"
  
  };

  const gridContainer2 = {
    display: "grid",
    gridAutoColumns: "1fr",
    gridAutoFlow: "column"
  };
  const gridItem = {
    margin: "8px",
    border: "1px solid red",
    height: "100%",
    maxWidth: "100%",
    overflow: "auto"
  };  

  const gridItem2 = {
    margin: "8px",
    border: "1px solid red",
    height: "50%",
    maxWidth: "100%",
    overflow: "auto"
    
  };  

  const gridItem4 = {
    margin: "8px",
    border: "1px solid red",
    height: "50%",
    width: "535px"
  
  };

  const CircumM1 = ["Neck Circum", "Chest", "Upper Chest", "Lower Chest", "Waist", "High Hip", "Hip", "Armhole", "Arm Grith", "Wrist"]
  const CircumM2 = ["Thigh Circum", "Knee Circum", "Ankle Circum", "Calf Circum", "Crotch" ]

  const VerticalM = ["Shoulder to Waistline", "Chest Height", "Front Neck Depth", "Shirt/Dress Length", "Short Sleeve Length", "Long Sleeve Length", "Pants/Skirt Length", "Back Neck Depth", "Inseam"]

  const HorizontalM = ["Shoulder", "Chest Width", "Bust Dist", "Shoulder Slope", "Back Width"]

  return (

    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="ADD ORDER" subtitle="Add new order"/>
      </Box>

      <Box sx={{ width: "100%", maxWidth: "100%", p:"100px" }} >
      <Box sx={gridContainer} display="flex" justifyContent="space-between" alignItems="top">
          <Box sx={gridItem}>
                {CircumM1.map(
                (input, i) => <Measurement field={input} key={i} />
                )}
           </Box>
          <Box sx={gridItem2}>
            {CircumM2.map(
            (input, i) => <Measurement field={input} key={i} />
            )}
          </Box>
        <Box sx={gridItem2}> 
        {HorizontalM.map(
        (input, i) => <Measurement field={input} key={i} />
        )}
      </Box>
        <Box sx={gridItem}> 
        {VerticalM.map(
        (input, i) => <Measurement field={input} key={i} />
        )}
      </Box>
       
      
      </Box>
      <Box sx={{ml:"280px", mt:"-200px"}} display="flex" justifyContent="space-between" alignItems="center" >
      <Grid item sx={{ p:"50px"}} >
        <Box>

        <TextField
        id="outlined-multiline-static"
        label="Comments"
        multiline
        rows={11}
        sx={{width:"400px"}}
        />
        
        </Box>
        </Grid >
        
       
      </Box>
    </Box>

      {/* Form */}
  
    </Box>

    

     

  )
}

export default AddOrder