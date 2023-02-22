import React, { useState} from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';


const Signup = () => {

    const navigate = useNavigate();

    //Visibility of Password
   const [showPassword, setShowPassword] = useState(false);
   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const signUpInitialValues = {
    sname:"",
    sadd:"",
    sno:"",
    oname:"",
    ono:"",
    email: "",
    password: "",
    cpassword:""
}

const [signUp, setSignUp] = useState(signUpInitialValues)

const handleSInputChange = (e) => {
  //const name = e.target.name 
  //const value = e.target.value 
  const { name, value } = e.target;

  setSignUp({
    ...signUp,
    [name]: value,
  });
};

  
  
    const SignUpform = {signUp}
  
  
  
    //the SignUpsettings of the request
    const SignUpsettings = {
      method : 'POST',
      credentials: "include",
      headers :{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(SignUpform)
    }
  
      //async function to post data to DB
      const newShop = async () => {
        const response = await fetch('/SignUp', SignUpsettings);
        try{ 
  
        const data = await response.json();

        if (response.status === 401 ){
            alert(data)
        }
        
        else{

            sessionStorage.setItem("TID",data.T_ID)
            sessionStorage.setItem("ShopID",data.Shop)
            sessionStorage.setItem("ShopName",data.ActualShopName)
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
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      if (signUp.password !== signUp.cpassword){
        alert ("Password doesn't match confirm password")
      }
      else{
        newShop()
      }
      
    }
  



  return (
    
    <form>
    <TextField
      required
      id="ShopName"
      label="ShopName"
      type="input"
      variant="standard"
      name="sname"
      value={signUp.sname}
      onChange = {handleSInputChange}
    />
      <br></br>
    
    <TextField
      required
      id="ShopAddress"
      label="Shop Address"
      type="input"
      variant="standard"
      name="sadd"
      value={signUp.sadd}
      onChange = {handleSInputChange}
    />
      <br></br>

    <TextField
      required
      id="ShopNo."
      label="Shop Phone No."
      type="input"
      variant="standard"
      name="sno"
      value = {signUp.sno}
      onChange = {handleSInputChange}
    />
      <br></br>

    <TextField
      required
      id="OwnerName"
      label="Your Name"
      type="input"
      variant="standard"
      name="oname"
      value = {signUp.oname}
      onChange = {handleSInputChange}
    />

    <br></br>

    <TextField
      required
      id="Owner No."
      label="Your Phone No."
      type="input"
      variant="standard"
      name="ono"
      value = {signUp.ono}
      onChange = {handleSInputChange}
    />
    
      <br></br>
    <TextField
      required
      id="Email"
      label="Email"
      type="email"
      variant="standard"
      name="email"
      value = {signUp.email.toLowerCase()}
      onChange = {handleSInputChange}
    />
      <br></br>
    
      <TextField
      required
      id="Password"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      variant="standard"
      name="password"
      value={signUp.password}
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

    <TextField
      required
      id="CPassword"
      label="Confirm Password"
      type={showPassword ? 'text' : 'password'}
      variant="standard"
      name="cpassword"
      value={signUp.cpassword}
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

      <Button 
      variant="contained" 
      disabled={signUp.sname.length < 1 || 
                signUp.sno.length < 1 || 
                signUp.oname.length < 1 || 
                signUp.ono.length < 1 || 
                signUp.email.length < 1 || 
                signUp.password.length < 1 ||
                signUp.cpassword.length < 1
                }
      onClick={handleSubmit}>SignUp</Button>
    </form>   

  )
}

export default Signup