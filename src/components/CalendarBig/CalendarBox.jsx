import React from 'react'
import { Box, CardMedia } from '@mui/material'
import { TEAM_ID, trainingImage } from '../../config/constants'
import { downMark, logoStyle, otherEventBoxStyle, boxMainStyle, boxDayNumber } from './styles'
import { redColor } from '../../config/constants'
import parse from 'html-react-parser'
import moment from 'moment-timezone'


const CalendarBox = ({ day, data, detailFunc }) => {
  if (data) data = { ...data }
  if (data && data.count > 1) {
    const checkForGame = data.list.filter(x => x.type === 'game')
    if (checkForGame.length) {
      data.list = checkForGame
    } else {
      data.list = data.list[0]
    }
  }

  const event = data ? data.list[0] : null

  const showTeam = () => {
    const team = [event.homeTeam, event.visitorTeam].filter(x => x._id !== TEAM_ID)
    return team[0].logo
  }

  const formatScore = () => {
    const gameDate = moment(event.date).tz('Europe/Sofia').add(4, 'hours')
    if ((event.finalScore.home === null || event.finalScore.visitor === null) && moment.tz('Europe/Sofia').isBefore(gameDate)) return null
    const homeScore = event.finalScore.home === null ? '-' : event.finalScore.home
    const visitorScore = event.finalScore.visitor === null ? '-' : event.finalScore.visitor

    return event.homeTeam._id === TEAM_ID ? homeScore + ' : ' + visitorScore : visitorScore + ' : ' + homeScore
  }
  
  return (
    <Box
      sx={event ? boxMainStyle : { ...boxMainStyle, backgroundColor: 'white', cursor: 'default' }}
      onClick={() => event ? detailFunc({ show: true, event: event._id }) : null}
    >
      <Box sx={boxDayNumber}>{day}</Box>
      {
        !event
          ? null
          : event.type === 'game'
            ? <Box sx={{display: 'grid', gridTemplateColumns: '60% 40%', minHeight: '80px', maxHeight: '80px'}}>
                <Box sx={{ alignSelf: 'end', fontSize: '22px', fontWeight: 'bold', ml: 1, mb: 1.5 }}>{formatScore()}</Box>
                <CardMedia component='img' image={showTeam()} sx={logoStyle}/>
                <Box sx={downMark(event.homeTeam._id === TEAM_ID ? redColor : 'black')}></Box>
              </Box>
            : event.type === 'training'
              ? <Box sx={{display: 'grid', gridTemplateColumns: '55% 45%', minHeight: '80px', maxHeight: '80px', width: '100%'}}>
                  <Box sx={{ alignSelf: 'end', fontSize: '13px', ml: 1, mb: 0.5 }}>Тренировка</Box>
                <CardMedia component='img' image={trainingImage} sx={{ ...logoStyle, transform: 'scaleX(-1)', mt: 0.5 }}/>
            </Box>
              : <Box sx={otherEventBoxStyle}>{parse(event.description)}</Box>
      }
    </Box>
  )
}

export default CalendarBox