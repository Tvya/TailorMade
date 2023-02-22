import React, {useState, useEffect} from 'react'
import {Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import {Box, IconButton, Typography, useTheme} from '@mui/material'
import { Link , useParams} from 'react-router-dom'
import { Tokens } from '../theme'
import  MenuOutlinedIcon  from '@mui/icons-material/MenuOutlined'
import  HomeOutlinedIcon  from '@mui/icons-material/HomeOutlined'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import  ReceiptOutlinedIcon  from '@mui/icons-material/ReceiptOutlined'
import  PeopleOutlinedIcon  from '@mui/icons-material/PeopleOutlined'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import main from '../img/main.png';


const Item = ({title, to, icon, selected , setSelected}) =>{
    const theme = useTheme();
    const colors = Tokens (theme.palette.mode)
    return(
        <Link to={to} style={{textDecoration:"none", color:"inherit"}}>
            <MenuItem 
            active = {selected === title} 
            style={{ color:colors.Grey[100]}} 
            onClick={() => setSelected(title)} 
            icon={icon}
            > 
            
                <Typography>{title}</Typography>
            </MenuItem>
        </Link>
    )
}


const SideBar = () => {
    const theme = useTheme()
    const colors = Tokens (theme.palette.mode)
    const { collapseSidebar, collapsed } = useProSidebar();
    const [selected, setSelected] = useState("Dashboard")


    const [TID, setTID] = useState('') 
    const [Shop, setShop] = useState('') //ShopID
    const [TName, setTName] = useState('') 
    const [isOwner, setIsOwner] = useState('')
    const [ShopName, setShopName] = useState('')





useEffect(() => {

    setTID(sessionStorage.getItem('TID'))
    setShop(sessionStorage.getItem('ShopID')) 
    setShopName(sessionStorage.getItem('ShopName'))  
    setTName(sessionStorage.getItem("TName"))
    setIsOwner(sessionStorage.getItem("isOwner"))

    
    },[]);

  return (
    <Sidebar 
        rootStyles={{

        "& .ps-sidebar-container":{
            backgroundColor: `${colors.Primary[400]}`
        },

        "& .ps-menu-button:hover":{
            backgroundColor:"transparent"
        },

        "& .ps-active":{
            color:"#6870fa"
        }

    }}
    >
        <Menu>
        {/* Logo and menu icon */}
        <MenuItem
         onClick={() => collapseSidebar()}
         icon= {collapsed ? <MenuOutlinedIcon /> : undefined}
         style={{
            margin: "10px 0 20px 0",
            color: colors.Grey[100]
         }}
         >

         {!collapsed && (
            <Box display="flex" justifyContent="center" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.Grey[100]}>{ShopName}</Typography>
                <IconButton onChange={() => collapseSidebar()}>
                    <MenuOutlinedIcon/>
                </IconButton>
            </Box>
         )}
         
        </MenuItem>

        {/* User */}

        {!collapsed && (
            <Box mb = "25px">
                    <Box display = "flex" justifyContent="center" alignItems="center">
                        <img alt="profile-user"
                            width="100px"
                            height="100px"
                            src={main}
                            style ={{cursor: "pointer", borderRadius:"50%"}}

                        />
                    </Box>

                    <Box textAlign="center">
                        <Typography variant='h2' color={colors.Grey[100]} fontWeight="bold" sx={{ m:"10px 0 0 0 "}}>{TName}</Typography>
                        <Typography variant='h5' color={colors.greenAccent[500]} fontWeight="bold" sx={{ m:"10px 0 0 0 "}}>{isOwner === false ? "Employee" : "Owner"}</Typography>
                    </Box>

                
                </Box>
            )}
            
        {/* MenuItems */}
            <Box paddingLeft={collapsed ? undefined : "10%"}>
                <Item
                    title="Dashboard"
                    to={`/Dashboard/${TID}/${Shop}`}
                    icon={<HomeOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Typography variant="h6" color={colors.Grey[300]} sx={{m:"15px 0 5px 20px"}}>Orders</Typography>

                <Item
                    title="Add Order"
                    to={`/AddOrder/${TID}/${Shop}`}
                    icon={<PostAddOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Item
                    title="Manage Orders"
                    to={`/ManageOrders/${TID}/${Shop}`}
                    icon={<ReceiptOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Typography variant="h6" color={colors.Grey[300]} sx={{m:"15px 0 5px 20px"}}>My Team</Typography>

                <Item
                    title="Add Employee"
                    to={`/AddEmployee/${TID}/${Shop}`}
                    icon={<PersonAddOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />
                
                <Item
                    title="Manage Team"
                    to={`/ManageTeam/${TID}/${Shop}`}
                    icon={<PeopleOutlinedIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                />

            </Box>

      </Menu>
    </Sidebar>
  )
}

export default SideBar