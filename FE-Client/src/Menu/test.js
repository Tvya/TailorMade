const [currentEvents, setCurrentEvents] = useState([])

  const handleDateClick = (selected) =>{
    const title = prompt("Please enter a new title for your event")
    const calendarApi = selected.view.calendar;
    calendarApi.unselect()

    if(title){
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay
      })
    }
  }

  const handleEventClick = (selected) =>{
    if (
      window.confirm(`Are you sure you want to delete event? '${selected.event.title}'`)
      )
      {
        selected.event.remove()
      } 

  }

    {/* <Box display="flex" justifyContent="space-between" alignItems="center"> */}
          {/* CALENDAR SIDEBAR */}
          {/* <Box flex ="1 1 20%" backgroundColor = {colors.Primary[400]} p="15px" borderRadius="4px">
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) =>(
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                     margin:"10px 0", 
                     borderRadius:"2px"
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {formatDate(event.start,{
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </Typography>
                      }
                    />

                  </ListItem>
              ))}
            </List>
          </Box> */}
            {/* CALENDAR */}
            {/* <Box flex="1 1 100%" ml="15px">
              <FullCalendar
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin
                ]}
                headerToolBar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                }}
                initialView = "dayGridMonth"
                editiable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventSet = {(events) => setCurrentEvents(events)}
                initialEvents={[
                  {id: "1234", title: "All-day event", date: "2022-02-15" },
                  {id: "1234", title: "Timed event", date: "2022-02-16" }
                ]}
              
              
              />

            </Box>

        </Box> */}