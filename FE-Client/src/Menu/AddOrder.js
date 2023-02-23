import React, { useState, useEffect } from 'react'
import { Tokens } from '../theme'
import Header from '../global/Header'
import Measurement from '../global/Mesaurementinput'
import { Box, TextField, Button,Typography, useTheme, Grid, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel,OutlinedInput, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from "react-router-dom";
import * as yup from 'yup';
import main from '../img/main.png';





const AddOrder = () => {
  const theme = useTheme();
  const colors = Tokens (theme.palette.mode)

  const {id} = useParams()
  const {shop} = useParams()

  const CircumM1 = [

    { 
      field:"Waist", 
      name: "waist"
    },
    { 
      field:"Chest", 
      name: "chest"
    },
    { 
      field:"Upper Chest", 
      name: "upperChest"
    },
    { 
      field:"Lower Chest", 
      name: "lowerChest"
    },
    { 
      field:"Neck Circum", 
      name: "neckCircum"
    },
    { 
      field:"Thigh Circum", 
      name: "thighCircum"
    },
    { 
      field:"Knee Circum", 
      name: "kneeCircum"
    },
    { 
      field:"Ankle Circum", 
      name: "ankleCircum"
    },
    { 
      field:"Calf Circum", 
      name: "calfCircum"
    },
    { 
      field:"Crotch", 
      name: "crotch"
    }
  ]
  
  const CircumM2 = [
    {
      field: "High Hip",
      name: "hipHip"
    }, 
  
    {
      field: "Hip",
      name: "hip"
    },
    
    { 
      field: "Armhole",
      name: "armhole"
    },
    
    {
      field:"Arm Grith",
      name: "armGrith"
    },
  
    {
      field:"Wrist",
      name: "wrist"
    }
  ]

  const HorizontalM = [
    {
      field: "Shoulder",
      name: "shoulder"
    }, 
  
    {
      field: "Chest Width",
      name: "chestWidth"
    },
    
    { 
      field: "Bust Dist",
      name: "bustDist"
    },
    
    {
      field:"Shoulder Slope",
      name: "shoulderSlope"
    },
  
    {
      field:"Back Width",
      name: "backWidth"
    }
  ]
  
  const VerticalM = [
  
    { 
      field:"Shoulder to Waistline", 
      name: "s2w"
    },
    { 
      field:"Chest Height", 
      name: "chestHeight"
    },
    { 
      field:"Front Neck Depth", 
      name: "fnd"
    },
    { 
      field:"Back Neck Depth", 
      name: "bnd"
    },
    { 
      field:"Shirt/Dress Length", 
      name: "sdl"
    },
    { 
      field:"Short Sleeve Length", 
      name: "ssl"
    },
    { 
      field:"Long Sleeve Length", 
      name: "lsl"
    },
    { 
      field:"Pants/Skirt Length", 
      name: "psl"
    },
    { 
      field:"Inseam", 
      name: "inseam"
    }
  ]
  
  
  const mergedMeasurements = [...CircumM1, ...CircumM2, ...HorizontalM, ...VerticalM ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const orderInitialValues = {
      cname: "",
      gender: "",
      mobile:"",
      email:"",
      comments:"",
      image:"",
      remainder:0.00,
      deposit:0.00,
      totalAmt:0.00,
      assignTo:""
  };

   mergedMeasurements.map(input => {

    orderInitialValues[input.name] = "";

    return orderInitialValues;
  })

  const [employeeDetails, setEmployeeDetails] = useState([])

  useEffect(() => {

  // declare the async data fetching function
  const fetchData = async () => {
      // get the data from the api
      const data = await fetch(`${process.env.REACT_APP_BASE_URL}/ManageTeam/${shop}`);
      // convert the data to json
      const json = await data.json();

  
      setEmployeeDetails(json)
      
      }
      fetchData()

      },[shop])


  const [order , SetOrder] = useState(orderInitialValues)

  const [date , SetDate] = useState({collection: new Date()})

  // const [orderDetails , SetOrderDetails] = useState(orderDetailsinitialValues)

  const handleMInputChange = (e) => {
    //const name = e.target.name 
    //const value = e.target.value 
    const { name, value } = e.target;

    SetOrder({
      ...order,
      [name]: value,
    });
  };

 

  const handleDInputChange = (cdate) => {
    SetDate((prevState) => ({
      ...prevState,
      collection: cdate
    }));
  };


  const AddOrder = { order, date }
 

  //the AddEmployeesettings of the request
  const AddOrdersettings = {
    method : 'POST',
    credentials: "include",
    headers :{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(AddOrder)
  }

    //async function to post data to DB
    const newOrder = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/AddOrder/${id}/${shop}`, AddOrdersettings);
      try{ 

      const data = await response.json();

      alert('success')

      console.log(data)

      }
      catch (error){
      alert (error)


      }

    }





  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(order)
    // console.log(orderDetails)
    newOrder()

   
  }  

  return (

    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="ADD ORDER" subtitle="Add new order"/>
      </Box>

      <form>
<Grid
container
rowSpacing={1}
columnSpacing={{ xs: 1}}
direction="column"
alignItems="center"   
justifyContent="center" 
>

{/* CustomerDetails */}
<Grid item>
  <Grid
  container
  rowSpacing={1}
  columnSpacing={{ xs: 1}}
  direction="row"
  sx={{'& .MuiTextField-root': { m: 1, width: '280px', pr:"20px" }}}
  display="flex" 
  justifyContent="space-between"
  alignItems="center"

  >

    <Grid item>
      <TextField
        required
        id="CustomerName"
        label="Customer Name"
        type="input"
        variant="outlined"
        name = "cname"
        value = {order.cname}
        onChange={handleMInputChange}
        />
    </Grid>

    <Grid item>
      <FormLabel id="Gender">Gender</FormLabel>
      <RadioGroup
        required
        row
        onChange={handleMInputChange}
      >
        <FormControlLabel name = "gender" value="F" checked={order.gender === "F"} onChange={handleMInputChange} control={<Radio />} label="Female" />
        <FormControlLabel name ="gender" value="M" checked={order.gender === "M"} onChange={handleMInputChange} control={<Radio />} label="Male" />
      </RadioGroup>
    </Grid>

    <Grid item>
      <TextField
        required
        id="Mobile Number"
        label="Mobile Number"
        type="input"
        variant="outlined"
        name = "mobile"
        value = {order.mobile}
        onChange={handleMInputChange}
        />
    </Grid>

    <Grid item>
     <TextField
        id="Email"
        label="Email"
        type="email"
        variant="outlined"
        name = "email"
        value = {order.email}
        onChange={handleMInputChange}
        />
    </Grid>

  </Grid>

</Grid>

{/* Measurements */}
<Grid item>
  <Grid
    container
    rowSpacing={1}
    columnSpacing={{ xs: 1}}
    direction="row"
    alignItems="bottom"   
    justifyContent="center" 
    sx={{ pt:"20px"}}
    >
  
  {/* Circumference Measurement */}
    <Grid item  sx={{ p:"30px" }}>

    {CircumM1.map(
      (input, i) => <Measurement field = {input.field} name = {input.name} value={order.name} onChange={handleMInputChange} key={i} />
      )}

    </Grid>

    <Grid item  sx={{ p:"30px" }}>

    {CircumM2.map(
      (input, i) => <Measurement field={input.field}  name = {input.name} value={order.name} onChange={handleMInputChange} key={i} />
      )}

    </Grid>


  {/* Horizontal Measurement */}
    <Grid item sx={{ p:"30px"}}>

    {HorizontalM.map(
      (input, i) => <Measurement field={input.field}  name = {input.name} value={order.name} onChange={handleMInputChange} key={i} />
      )}

    </Grid>

  {/* Vertical Measurement */}      
    <Grid item sx={{ p:"30px"}}>
      
    {VerticalM.map(
      (input, i) => <Measurement field={input.field}  name = {input.name} value={order.name} onChange={handleMInputChange} key={i} />
      )}

    </Grid>
   
  </Grid>

</Grid>


<Grid item>
   <Grid
    container
    rowSpacing={1}
    columnSpacing={{ xs: 1}}
    direction="row"
    alignItems="top"   
    justifyContent="center" 
    >


    <Grid item sx={{ p:"50px"}} >
      <Box> 
        <Box display = "flex" justifyContent="center" alignItems="center">
          <img alt="profile-user"
                width="250px"
                height="250px"
                src={main}
                style ={{cursor: "pointer"}}
                name = "image"
                value = {order.image}
                onChange={handleMInputChange}

          />
        </Box>

        <br></br>
        
        <Button variant="contained" component="label" alignContent="center">
          Upload Image
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Box>     
    </Grid>

    <Grid item sx={{ p:"50px"}} >
        <Box display = "flex" justifyContent="center" alignItems="center">
        <TextField
          id="outlined-multiline-static"
          label="Comments"
          name="comments"
          value={order.comments}
          onChange={handleMInputChange}
          multiline
          rows={11}
        />
      </Box>     
    </Grid>


    <Grid item sx={{ p:"50px"}} >

    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{pb:"10px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            label="Collection Date"
            name = "collection"
            inputFormat="DD/MM/YYYY"
            minDate={new Date()}
            value={date.collection}
            onChange={handleDInputChange}
            renderInput={(params) => <TextField {...params} sx={{width :"230px"}}/>}
          />
        </LocalizationProvider>
    </Box>

    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mb :"7px"}}>
      <Typography variant='h5' sx={{p :"7px"}}>Remainder Amt</Typography>
      <OutlinedInput
        disabled
        id= "Remainder"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        size="small"
        name = "remainder"
        value = {order.remainder = order.totalAmt - order.deposit}
        onChange={handleMInputChange}
        type = "number"
        sx={{
              width:"100px"
        }}
      />
   </Box>

   <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mb :"7px"}}>
      <Typography variant='h5' sx={{p :"7px"}}>Deposit Amt *</Typography>
      <OutlinedInput
        id= "Deposit"
        placeholder="0"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        size="small"
        name = "deposit"
        value = {order.deposit}
        onChange={handleMInputChange}
        type = "number"
        sx={{
              width:"100px"
        }}
      />
   </Box>

   <Box display="flex" justifyContent="space-between" alignItems="center" sx={{mb :"7px"}}>
      <Typography variant='h5' sx={{p :"7px"}}>Total Amt *</Typography>
      <OutlinedInput
        id= "TotalAmt"
        required
        placeholder="0"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        size="small"
        name = "totalAmt"
        value = {order.totalAmt}
        onChange={handleMInputChange}
        type = "number"
        sx={{
              width:"100px"
        }}
      />
   </Box>

   <Box display="flex" justifyContent="space-between" alignItems="center" sx={{pt:1}} >
          <Select
            id="age"
            autoWidth
            label="Assign To"
            name = "assignTo"
            value={order.assignTo}
            placeholder="Assign To"
            onChange={handleMInputChange}
           
            sx={{ minWidth: 230 }}
          >
            <MenuItem>
              <em>None</em>
            </MenuItem>
            {employeeDetails.map(
      (input, i) => <MenuItem value={input.T_ID} key={i}>{input.TailorName}</MenuItem>
      )}

        </Select>
    </Box>  

    </Grid>
   
  </Grid>

</Grid>   

<Box display = "flex" justifyContent="center" alignItems="center">
<Button variant="contained" type ="submit" onClick={handleSubmit}>Submit</Button>
</Box>


</Grid>



</form>
    </Box>

    

     

  )
}

export default AddOrder