import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress } from '@mui/material'
import { createCalendarArray } from '../../common/help-functions.js'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { getMontEvents } from '../../api/events.js'
import { redColor } from '../../config/constants'
import { mainPaper, calendarGrid } from './styles'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import CalendarBox from './CalendarBox.jsx'


const CalendarBig = () => {
  const calendar = createCalendarArray()
  const firstRenderRef = useRef(true)

  const [events, setEvents] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    getMontEvents({ date: new Date() })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setEvents(result.payload)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [])


  const haveEvent = (day) => {
    const checkForEvent = events.filter(x => x._id === day)
    return checkForEvent.length ? checkForEvent[0] : null
  }

  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='flex-end' borderBottom={1} borderColor={redColor} mb={2}>
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Календар</Typography>
        </Box>
        <Scrollbars style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}>
          <Box p={1} pt={0}>
            {
              !events
                ? <LinearProgress sx={{height: '20px'}} />
                : <Box sx={calendarGrid}>
                {
                  calendar.map((el, index) => (
                    el
                      ? <CalendarBox key={index} day={el} data={haveEvent(el)} />
                      : <Box key={index} sx={{ minHeight: '90px', border: '1px dashed #ebeff2', m: 1 }} />
                  ))
                }
              </Box>
            }
          </Box>
        </Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default CalendarBig