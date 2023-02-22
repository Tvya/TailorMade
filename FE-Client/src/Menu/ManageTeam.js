import React, { useState, useEffect }from 'react'
import { Tokens } from '../theme'
import { useParams } from "react-router-dom";
import Header from '../global/Header'
import { Box,  useTheme } from '@mui/material'
import { DataGrid, GridToolbar} from '@mui/x-data-grid'


export const ManageTeam = () => {

    const theme = useTheme();
    const colors = Tokens (theme.palette.mode)

   

    const {shop} = useParams()
  

    const [employeeDetails, setEmployeeDetails] = useState([])
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {

    // declare the async data fetching function
    const fetchData = async () => {
        // get the data from the api
        const data = await fetch(`/ManageTeam/${shop}`);
        // convert the data to json
        const json = await data.json();

    
        setEmployeeDetails(json)
        
    }

    fetchData()

    },[shop])

    const rows =  employeeDetails
      
      const columns = [
        { field: "T_ID",   headerName: "Employee ID", width: 150, },
        { field: "TailorName", headerName: "Name", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "PhoneNumber", headerName: "Phone Number", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "Email", headerName: "Email", width: 150,  flex : 1, cellClassName:"name-column--cell" }
      ];
      

  return (

    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="MANAGE TEAM" subtitle="List of Team Members"/>
        </Box>

        <Box
        sx={{

        "& .MuiCheckbox-colorPrimary":{
            color: `${colors.greenAccent[200]} !important`
        },
        
        "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
            color: `${colors.Grey[100]}`
        }
    }}
        
        >
            <DataGrid 
            rows = {rows}
            columns = {columns} 
            getRowId={(row) =>  row.T_ID}
            components = {{Toolbar: GridToolbar}}
            checkboxSelection
            autoHeight
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 30]}
            />
        </Box>
    </Box>
   

  )
}

export default ManageTeam