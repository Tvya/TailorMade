
import './Mainpage.css';
import React, { useState} from 'react';
import { Link } from "react-router-dom";
import {Tab, Tabs} from '@mui/material';
import {TabContext,TabPanel} from '@mui/lab';
import Signin from './Signin';
import Signup from './Signup';




function Mainpage() {

  const [tab, setTab] = useState("SignIn");
  
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };


  return (
    <section className="main-container">

      <div className = "form-container">
       <div className = "border-form-container">
      <TabContext value={tab}>
       <Tabs value={tab} onChange={handleChange}
        TabIndicatorProps={{sx:{backgroundColor:"#DAA520", top:0, height:4}}} 

        sx={{
            "& button":{backgroundColor:"#D3D3D3", width:"50%"},
            "& button.MuiTab-textColorPrimary":{color:"black"},
            "& button.Mui-selected": {backgroundColor:"#F5F5F5", boxShadow:4, fontWeight:"bold"}
        }

      }
       >  
           
          <Tab label="Sign In" value="SignIn" />
          <Tab label="Sign Up" value="SignUp"  />

       </Tabs>


        <TabPanel value="SignIn" component={Link}  to="/SignIn">
         
          <Signin/>
            
        </TabPanel>
        

{/* Sign Up */}

       
        <TabPanel value="SignUp" component={Link}  to="/SignUp">
      
          <Signup/>
          
        </TabPanel>
   

      </TabContext>

      </div>
  
      </div>

    </section>
  );
}

export default Mainpage;
