import React, { useState, useEffect, useRef } from 'react'
import { Box, Popover, Stack } from '@mui/material'
import { getMontEvents } from '../../api/events.js'
import { createCalendarArray, getMonth, getYear } from '../../common/help-functions.js'
import { dateBox, dateBoxActive, mainBox, titleBox, popoverPaper, elementsBox, loaderBox } from './style.js'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import CircularProgress from '@mui/material/CircularProgress'
import EventRow from './EventRow.jsx'
import { ENV } from '../../config/constants.js'


const CalendarSmall = () => {
  const calendar = createCalendarArray(new Date())
  const firstRenderRef = useRef(true)

  const [events, setEvents] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentDay, setCurrentDay] = useState([])
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  const open = Boolean(anchorEl)

  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
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


  const haveEvent = (day) => events.some(x => x.day === day) ? true: false


  const openPopover = (event, index) => {
    const getEvents = events.filter(x => x.day === index)
    setCurrentDay(getEvents[0].list)
    setAnchorEl(event.currentTarget)
  }


  const closePopover = () => {
    setAnchorEl(null)
    setCurrentDay([])
  }


  if (!events) return <Box sx={loaderBox}><CircularProgress size='100px' /></Box>

  return (
    <Box sx={mainBox}>
      <Box sx={titleBox}>
        <Box>{ getMonth(new Date()) }</Box>
        <Box>{ getYear(new Date()) }</Box>
      </Box>
      <Box sx={elementsBox}>
        {
          calendar.map((el, index) => (
            <Box key={index} sx={haveEvent(el) ? dateBoxActive : dateBox}onMouseEnter={haveEvent(el) ? (event) => openPopover(event, el) : null} onMouseLeave={closePopover}>{el}</Box>
          ))
        }
      </Box>
      <Popover
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={closePopover}
        disableRestoreFocus
        PaperProps={{elevation: 0, sx: popoverPaper}}
      >
        <Stack spacing={1}>{ currentDay.map((el, index) => <EventRow key={el._id} data={el} last={index === currentDay.length - 1 } />) }</Stack>
      </Popover>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Box>
  )
}

export default CalendarSmall