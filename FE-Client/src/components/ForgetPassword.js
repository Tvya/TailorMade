import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton, Link, 
        Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle   } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ForgetPassword = () => {


    const FPInitialValues = {
        email: "",
        password: ""
    }
  
    const [ForgetP, setForgetP] = useState(FPInitialValues)
  
    const handleFInputChange = (e) => {
      //const name = e.target.name 
      //const value = e.target.value 
      const { name, value } = e.target;
  
      setForgetP({
        ...ForgetP,
        [name]: value,
      });
    };

     //Visibility of Password
     const [showPassword, setShowPassword] = useState(false);
     const handleClickShowPassword = () => setShowPassword((show) => !show);

     const [open, setOpen] = useState(false);

     const handleClickOpen = () => {
       setOpen(true);
     };  

     const handleClose = () => {
       setOpen(false);
     };


    const ForgetPasswordform = {ForgetP}

    //the ForgetPasswordsettings of the request
    const ForgetPasswordsettings = {
      method : 'POST',
      credentials: "include",
      headers :{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(ForgetPasswordform)
    }

  //async function to post data to DB
  const ForgetPassword = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/ForgetPassword`,ForgetPasswordsettings);
    try{ 

        const data = await response.json();

        if (response.status === 401 ){
            alert(data)
            console.log(data)
        }

        if (response.status === 200 ){
            alert("Password updated successfully. Kindly Login")
            console.log(data)
            handleClose()
        }

    }
    catch (error){
    alert (error)
    console.log(error)

    }

  }

    const ForgetSubmit = (e) =>{
        e.preventDefault();
        ForgetPassword() 
        setForgetP(FPInitialValues)
    
      }

  return (
    
    <Box>
     
      <Link onClick={handleClickOpen}>Forget Password</Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forget Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset or change password, please enter your email address and new password here.
          </DialogContentText>
             <form >

            <TextField
            id="Email"
            label="Email"
            type="email"
            variant="standard"
            name="email"
            value = {ForgetP.email.toLowerCase()}
            onChange = {handleFInputChange}
            />
            <br></br>

            <TextField
            id="Password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="standard"
            name="password"
            value = {ForgetP.password}
            onChange = {handleFInputChange}
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
            </form>   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={ForgetP.email.length < 1 ||  ForgetP.password.length < 1} onClick={ForgetSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ForgetPassword