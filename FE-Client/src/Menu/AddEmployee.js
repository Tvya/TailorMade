import React, { useState }from 'react'
import { useParams } from "react-router-dom";
import { Tokens } from '../theme'
import Header from '../global/Header'
import Dropzone from '../global/Dropzone'
import { Box, TextField, Button, useTheme, Grid, InputAdornment, IconButton } from '@mui/material'
import {Visibility, VisibilityOff} from '@mui/icons-material';
import main from '../img/main.png';

const AddEmployee = () => {

  const theme = useTheme();
  const colors = Tokens (theme.palette.mode)


  const [ename, setEName] = useState('')
  const [eno, setENo] = useState('')
  const [email, setEmail] = useState('')

  

  //Generate random Password
  const randompassword= Math.random().toString(36).substring(2,10)
  const [password, setPassword] = useState('');
  const handleClickGeneratePassword = () => {
    setPassword(randompassword);
  }

  //Visibility of Password
  // const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);


  const {shop} = useParams() 
  const AddEmployee = {ename, eno, email, password}

  //the AddEmployeesettings of the request
  const AddEmployeesettings = {
    method : 'POST',
    credentials: "include",
    headers :{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(AddEmployee)
  }

    //async function to post data to DB
    const newEmployee = async () => {
      const response = await fetch(`/AddEmployee/${shop}`, AddEmployeesettings);
      const data = await response.json();
      
      try{ 


      if (response.status === 401 ){
        alert(data)
    }
    if (response.status === 200 ){
      alert("Employee created successfully")
      console.log(data)
    }

      }
      catch (error){
      alert (data)
      console.log(data)

      }

    }



    const handleSubmit = (e) =>{
      e.preventDefault();
      newEmployee()
      setEName('')
      setENo('')
      setEmail('')
      setPassword('')

     
    }  



  return (

    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="ADD EMPLOYEE" subtitle="Add new employee"/>
      </Box>    

      {/* Form */}

      <form>
      
    <Grid 
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1}}
      direction="row"
      alignItems="top"   
      justifyContent="center" 
    >
        <Grid item>
          <Box
            sx={{
              padding:"20px",
              '& .MuiTextField-root': { m: 1, width: '700px' },
            }}
            autoComplete="off"
          >
            <Box>
            <TextField
            required
            id="EmployeeName"
            label="Name"
            type="input"
            variant="outlined"
            value={ename}
            onChange = {(e) => setEName(e.target.value)}
            />
            </Box>

            <br></br>

            <Box>
            <TextField
            required
            id="PhoneNo"
            label="Phone No."
            type="input"
            variant="outlined"
            value={eno}
            onChange = {(e) => setENo(e.target.value)}
            />
            </Box>

            <br></br>

            <Box>
            <TextField
            required
            id="Email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
            />
            </Box>

            <br></br>

            <Box alignContent="center">
            <TextField 
            disabled
            required
            id="Password"
            label="Password"
            variant="outlined"
            type="password"
            // type={showPassword ? 'text' : 'password'}
            value={password}
            onChange = {(e) => setPassword(e.target.value)}
            InputProps={{endAdornment:
              <InputAdornment position="end">
                <Button sx={{ pr:"5px"}} variant="text" onClick={handleClickGeneratePassword}>Generate Password</Button>
                {/* <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton> */}
              </InputAdornment>
            }}
            />
            
            </Box>
          </Box>
        </Grid>

        <Grid item>
          <Box> 
            <Box display = "flex" justifyContent="center" alignItems="center]">
              <Dropzone/>
              {/* <img alt="profile-user"
                    width="320px"
                    height="320px"
                    src={main}
                    style ={{cursor: "pointer", padding:"27px"}}

              /> */}
            </Box>

            <br></br>

          </Box>     
        </Grid>

    </Grid>

    <Box display = "flex" justifyContent="center" alignItems="center">
      <Button variant="contained" type ="submit" onClick={handleSubmit}>Submit</Button>
    </Box>

    </form>

    </Box>

  )
}

export default AddEmployee