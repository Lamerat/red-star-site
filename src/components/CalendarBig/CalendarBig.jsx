import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress, IconButton } from '@mui/material'
import { createCalendarArray } from '../../common/help-functions.js'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { getMontEvents } from '../../api/events.js'
import { ENV, redColor } from '../../config/constants'
import { mainPaper, calendarGrid, outMontBox } from './styles'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import CalendarBox from './CalendarBox.jsx'
import AppsIcon from '@mui/icons-material/Apps'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import moment from 'moment-timezone'
import CalendarRow from './CalendarRow.jsx'
import EventDetails from './EventDetails.jsx'

const CalendarBig = () => {
  const firstRenderRef = useRef(true)

  const [detailView, setDetailView] = useState({ show: false, event: null })
  const [calendar, setCalendar] = useState(createCalendarArray(new Date()))
  const [currentMount, setCurrentMount] = useState(new Date())
  const [events, setEvents] = useState(null)
  const [tableView, setTableView] = useState(true)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    getMontEvents({ date: currentMount })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setEvents(result.payload)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [currentMount])


  const haveEvent = (day) => {
    const checkForEvent = events.filter(x => x._id === day)
    return checkForEvent.length ? checkForEvent[0] : null
  }

  const changeDate = (value) => {
    const newDate = value === 'inc'
      ? moment(currentMount).add(1, 'month')
      : moment(currentMount).subtract(1, 'month')
      setCurrentMount(newDate)
      setCalendar(createCalendarArray(newDate))
  }

  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2, fontFamily: 'CorsaGrotesk'}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='space-between' borderBottom={1} borderColor={redColor} mb={2}>
          <Box sx={{minWidth: '123px'}}>
            <IconButton size='small' sx={{ml: -0.8}} onClick={() => setTableView(true)}><AppsIcon color='primary' /></IconButton>
            <IconButton size='small' onClick={() => setTableView(false)}><FormatListBulletedIcon color='primary' /></IconButton>
          </Box>
          <Box display='flex'>
            <IconButton size='small' onClick={() => changeDate('dec')}><ArrowLeftIcon sx={{color: '#8c8b8d'}} /></IconButton>
              <Box sx={{ pt: 0.5, ml: 0.3, mr: 0.3, color: '#8c8b8d', letterSpacing: '0.5px'}}>{ moment(currentMount).format('MMMM YYYY') }</Box>
            <IconButton size='small' onClick={() => changeDate('inc')}><ArrowRightIcon sx={{color: '#8c8b8d'}} /></IconButton>
          </Box>
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Календар</Typography>
        </Box>
        <Scrollbars style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}>
          <Box p={1} pt={0}>
            {
              !events
                ? <LinearProgress sx={{ height: '20px' }} />
                : tableView
                  ? <>
                      <Box sx={calendarGrid}>
                        { calendar.map((el, index) => el ? <CalendarBox key={index} day={el} data={haveEvent(el)} detailFunc={setDetailView} /> : <Box key={index} sx={outMontBox} />) }
                      </Box>
                      <Box ml={1} mt={0.5} display='flex' alignItems='center'>
                        <Box display='flex' alignItems='center'>
                          <Box sx={{minWidth: '10px', minHeight: '10px', maxHeight: '10px', borderRadius: '5px', backgroundColor: redColor}}></Box>
                          <Box sx={{fontSize: '13px', pb: 0.5, ml: 0.5}}>домакин</Box>
                        </Box>
                        <Box display='flex' alignItems='center' ml={2}>
                          <Box sx={{minWidth: '10px', minHeight: '10px', maxHeight: '10px', borderRadius: '5px', backgroundColor: 'black'}}></Box>
                          <Box sx={{fontSize: '13px', pb: 0.5, ml: 0.5}}>гост</Box>
                        </Box>
                      </Box>
                    </>
                  : events.map(s => s.list).flat().reverse().map(x => <CalendarRow key={x._id} data={x} detailFunc={setDetailView} />)
            }
          </Box>
        </Scrollbars>
      </Box>
      { detailView.show ? <EventDetails event={detailView.event} errorFunc={setErrorDialog} closeFunc={setDetailView} /> : null }
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default CalendarBig