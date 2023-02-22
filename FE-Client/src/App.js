import React from 'react';
import { ColorModeContext , useMode} from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route } from "react-router-dom"
import Topbar from "./global/Topbar";
import SideBar from "./global/Sidebar";
import Dashboard from "./Menu/Dashboard";
import AddOrder from "./Menu/AddOrder";
import ManageOrders from "./Menu/ManageOrders.js";
import AddEmployee from "./Menu/AddEmployee";
import ManageTeam from "./Menu/ManageTeam";
import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
  
  const [theme, colorMode]= useMode();
  

  return (

  <ColorModeContext.Provider value ={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>  {/*Reset the Css to default */}
        <div className="app">
          <ProSidebarProvider>
            <SideBar/>
          </ProSidebarProvider>
          <main className="content">

            <Topbar/>

          <Routes>
            <Route path="/Dashboard/:id/:shop" element={<Dashboard />}/>
            <Route path="/AddOrder/:id/:shop" element={<AddOrder />}/>
            <Route path="/ManageOrders/:id/:shop" element={<ManageOrders />}/>
            <Route path="/AddEmployee/:id/:shop" element={<AddEmployee />}/>
            <Route path="/ManageTeam/:id/:shop" element={<ManageTeam />}/>
         </Routes>

          </main>
        </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
