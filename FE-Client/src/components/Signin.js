import React, { useState} from 'react';
import {useNavigate } from "react-router-dom";
import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import ForgetPassword from './ForgetPassword';
import FP from './FP';

const Signin = () => {

    const navigate = useNavigate();


   //Visibility of Password
   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);

    const signInInitialValues = {
      email: "",
      password: ""
  }

  const [signIn, setSignIn] = useState(signInInitialValues)

  const handleSInputChange = (e) => {
    //const name = e.target.name 
    //const value = e.target.value 
    const { name, value } = e.target;

    setSignIn({
      ...signIn,
      [name]: value,
    });
  };
  

   const SignInform = {signIn}

    //the SignInsettings of the request
    const SignInsettings = {
      method : 'POST',
      credentials: "include",
      headers :{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(SignInform)
    }

  //async function to post data to DB
  const SignIn = async () => {
    const response = await fetch('/SignIn', SignInsettings);
    try{ 

    const data = await response.json();

    if (response.status === 401 ){
        alert(data)
    }

    else{

     sessionStorage.setItem("TID",data.T_ID)
     sessionStorage.setItem("ShopID",data.Shop)
     sessionStorage.setItem("ShopName",data.ShopName)
     sessionStorage.setItem("TName",data.TailorName)
     sessionStorage.setItem("isOwner",data.isOwner)

   navigate(`/Dashboard/${data.T_ID}/${data.Shop}`);
    }
    

    console.log(data)

    }
    catch (error){
    alert (error)
    console.log(error)

    }

  }


  const LoginSubmit = (e) =>{
    e.preventDefault();
    SignIn()
  }

  return (

    <Box>
      <Box>
    <form>

          <TextField
          required
          className="SignIn"
          id="Email"
          label="Email"
          type="email"
          variant="standard"
          name="email"
          value = {signIn.email.toLowerCase()}
          onChange = {handleSInputChange}
          />
          <br></br>
        
          <TextField
          required
          className="SignIn"
          id="Password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="standard"
          name="password"
          value = {signIn.password}
          onChange = {handleSInputChange}
          InputProps={{endAdornment:
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }}
        />
          <br></br>

          <Button variant="contained" type="submit" disabled={signIn.email.length < 1 ||  signIn.password.length < 1} onClick={LoginSubmit}>Sign In</Button>

        </form>  
        </Box> 

        <Box><ForgetPassword/></Box>
        </Box>
       
  )
}

export default Signin