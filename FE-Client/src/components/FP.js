import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';

const FP = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     
      <Link onClick={handleClickOpen}>Forget Password</Link>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forget Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset or change password, please enter your email address and new password here.
          </DialogContentText>
             <form >

            <TextField
            required
            id="Email"
            label="Email"
            type="email"
            variant="standard"
            name="email"
            // value = {ForgetP.email.toLowerCase()}
            // onChange = {handleBothChange}
            />
            <br></br>

            <TextField
            required
            id="Password"
            label="Password"
            // type={showPassword ? 'text' : 'password'}
            variant="standard"
            name="password"
            // value = {ForgetP.password}
            // onChange = {handleBothChange}
            // InputProps={{endAdornment:
            // <InputAdornment position="end">
            //     <IconButton
            //     aria-label="toggle password visibility"
            //     onClick={handleClickShowPassword}
            //     edge="end"
            //     >
            //     {showPassword ? <VisibilityOff /> : <Visibility />}
            //     </IconButton>
            // </InputAdornment>
            // }}
            />
            <br></br>
            </form>   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FP