import React, { useState, useEffect }from 'react'
import { Tokens } from '../theme'
import { useParams } from "react-router-dom";
import Header from '../global/Header'
import { Box, useTheme, Link, Typography , Button} from '@mui/material'
import { DataGrid, GridToolbar} from '@mui/x-data-grid'

const ManageOrders = () => {

    const theme = useTheme();
    const colors = Tokens (theme.palette.mode)

    const {shop} = useParams()
  

    const [orderDetails, setOrderDetails] = useState([])
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {

    // declare the async data fetching function
    const fetchData = async () => {
        // get the data from the api
        const data = await fetch(`/ManageOrders/${shop}`);
        // convert the data to json
        const json = await data.json();

    
        setOrderDetails(json)
        
    }

    fetchData()

    },[shop])

    const rows =  orderDetails
      
      const columns = [
        { field: "O_ID",   headerName: "Order ID", width: 150,
        renderCell: (params) => 
          <Link href={`?oid=${params.row.O_ID}`} underline="hover" color="inherit">{params.row.O_ID}</Link> 
    },
        { field: "CollectionDate", headerName: "Collection Date", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "TailorName", headerName: "Assign To", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "OrderStatus", headerName: "Order Status", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "CustomerName", headerName: "Customer Name", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "CustomerMobile", headerName: "Customer Mobile", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "PaymentStatus", headerName: "Payment Status", width: 150,  flex : 1, cellClassName:"name-column--cell" },
        { field: "RemainingAmt", headerName: "Remaining Amt", width: 150,  flex : 1, cellClassName:"name-column--cell" },

      ];


  return (

    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="MANAGE ORDERS" subtitle="List of Orders"/>
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
            getRowId={(row) =>  row.O_ID}
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

export default ManageOrders