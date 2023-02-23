import React, { useState, useEffect } from 'react'
import Header from '../global/Header'
import { Tokens } from '../theme'
import { Box, Button, Card, CardActions, CardContent, Typography, useTheme, Grid } from '@mui/material'
import { useParams } from "react-router-dom";
import FullCalendar from '@fullcalendar/react' 
import { formatDate } from '@fullcalendar/core' 
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'


const bull = (
    <Box
      component="span"
      sx={{display: "inline-block", mx:"2px", transform: "scale(0.8)"}}
    >
      .
    </Box>
);

const Dashboard = () => {

  const theme = useTheme();
  const colors = Tokens(theme.palette.mode)


  const {id} = useParams()
  const {shop} = useParams()

  const [card1, setCard1] = useState('')
  const [card2, setCard2] = useState('')
  const [card3 , setCard3] = useState('')

  useEffect(() => {

    // declare the async data fetching function
    const fetchData = async () => {
        // get the data from the api
        const data = await fetch(`${process.env.REACT_APP_BASE_URL}/Dashboard/${id}/${shop}`);
        // convert the data to json
        const json = await data.json();
  
    
        setCard1(json[0])
        setCard2(json[1])
        setCard3(json[2])
        
        }
        fetchData()
  
        },[shop])

  console.log(card1)
  console.log(card2)
  console.log(card3)
  const TodayOrder = card1
  const TomorrowOrder = card2
  const AssignToOrder = card3

  return (

      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your shop's dashboard" />
        </Box>

        <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1}}
        direction="row"
        alignItems="center"   
        justifyContent="center" 
        >

        {/* 1st Card */}
        <Grid item>

        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
            <Card sx={{minWidth:300}}>
              <CardContent>
                <Typography sx={{fontSize:14}} color="text.secondary" gutterBottom>
                  Total Orders due Today
                </Typography>
                <Typography variant="h5" component="h2">
                  {TodayOrder.TodayDueOrder}
                </Typography>

                <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1}}
                direction="row"
                alignItems="center"   
                justifyContent="space-between" 
                >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p"> 
                  To Do 
                  <br />
                  {TodayOrder.ToDoOrder}
                </Typography>
                </Box>
               
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                  In Progress
                  <br />
                  {TodayOrder.ProgressOrder}
                </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                 Ready for collection
                  <br />
                  {TodayOrder.ReadyOrder}
                </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                 Collected
                  <br />
                  {TodayOrder.CompleteOrder}
                </Typography>
                </Box>
              </Grid>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
          </Card>

        </Box>
          </Grid>

           {/* 2nd Card */}
        <Grid item>

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
            <Card sx={{minWidth:300}}>
              <CardContent>
                <Typography sx={{fontSize:14}} color="text.secondary" gutterBottom>
                  Total Orders due Tommorrow 
                </Typography>
                <Typography variant="h5" component="h2">
                {TomorrowOrder.TomorrowDueOrder}
                </Typography>

                <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1}}
                direction="row"
                alignItems="center"   
                justifyContent="space-between" 
                >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p"> 
                  To Do 
                  <br />
                  {TomorrowOrder.TomToDoOrder}
                </Typography>
                </Box>
               
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                  In Progress
                  <br />
                  {TomorrowOrder.TomProgressOrder}
                </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                 Ready for collection
                  <br />
                  {TomorrowOrder.TomReadyOrder}
                </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                 Collected
                  <br />
                  {TomorrowOrder.TomCompleteOrder}
                </Typography>
                </Box>
                
              </Grid>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
          </Card>

        </Box>
        </Grid>

        {/* 3rd Card */}
        <Grid item>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
            <Card sx={{minWidth:300}}>
              <CardContent>
                <Typography sx={{fontSize:14}} color="text.secondary" gutterBottom>
                  Total Orders Assign to me
                </Typography>
                <Typography variant="h5" component="h2">
                  {AssignToOrder.TotalAssignOrder}
                </Typography>

                <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1}}
                direction="row"
                alignItems="center"   
                justifyContent="space-between" 
                >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p"> 
                  To Do 
                  <br />
                  {AssignToOrder.AssignToDoOrder}
                </Typography>
                </Box>
               
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                  In Progress
                  <br />
                  {AssignToOrder.AssignProgressOrder}
                </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                  Ready for collection
                  <br />
                  {AssignToOrder.AssignReadyOrder}
                </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{p:"20px"}}>
                <Typography variant="h6" component="p">
                  Collected
                  <br />
                  {AssignToOrder.AssignCompleteOrder}
                </Typography>
                </Box>

              </Grid>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
          </Card>

        </Box>
        </Grid>

        
        </Grid>




      
      </Box>
    
  )
}

export default Dashboard