import React from 'react'
import { Box, CardMedia, Stack } from '@mui/material'
import { redColor } from '../../config/constants'
import { getMonth, getDayNumber } from '../../common/help-functions'
import { overtimeTranslate, trainingImage } from '../../config/constants'
import moment from 'moment-timezone'
import parse from 'html-react-parser'
import { otherEventRowStyle, rowTimeStyle } from './styles'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export const versusStyle = {
  textAlign: 'center',
  fontFamily: 'CorsaGrotesk',
  fontWeight: 'bold',
  fontSize: '35px',
  minWidth: '150px',
  maxHeight: '41px',
  minHeight: '41px',
  lineHeight: '1.2',
  pb: '3px'
}

export const overTimeStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '11px',
  minHeight: '16px'
}

export const partsStyle = {
  fontFamily: 'CorsaGrotesk',
  fontSize: '11px',
  justifyContent: 'space-between',
  letterSpacing: '1px',
  minHeight: '16px'
}

const CalendarRow = ({ data }) => {

  const formatScore = () => {
    const gameDate = moment(data.date).tz('Europe/Sofia').add(4, 'hours')
    if ((data.finalScore.home === null || data.finalScore.visitor === null) && moment.tz('Europe/Sofia').isBefore(gameDate)) return null
    const homeScore = data.finalScore.home === null ? '-' : data.finalScore.home
    const visitorScore = data.finalScore.visitor === null ? '-' : data.finalScore.visitor

    return homeScore + ' : ' + visitorScore
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between', minHeight: '100px', ml: 1, mr: 1, mb: 2, backgroundColor: '#eeeeee'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', color: 'white', height: '100%', minWidth: '100px', maxWidth: '100px'}}>
        <Box sx={{backgroundColor: redColor, minHeight: '66px', fontSize: '40px', textAlign: 'center', pt: '8px', letterSpacing: '1px', maxWidth: '100px' }}>{getDayNumber(data.date)}</Box>
        <Box sx={{backgroundColor: '#b60909', fontSize: '13px', textAlign: 'center', pt: 0.5, pb: 0.5, minHeight: '18px', maxWidth: '100px'}}>{getMonth(data.date)}</Box>
      </Box>
      {
        data.type === 'game'
          ? <Box sx={{display: 'flex', fontSize: '14px', p: '12px', width: '100%', justifyContent: 'center'}}>
              <Box sx={{textAlign: 'center', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'right' }}>
                <Box mr={2}>
                  <Box sx={{textAlign: 'right', fontSize: '18px', fontWeight: 'bold'}}>{data.homeTeam.name}</Box>
                  <Box sx={{textAlign: 'right', color: '#8696a5'}}>{data.homeTeam.city.name}</Box>
                </Box>
                <CardMedia component='img' image={data.homeTeam.logo} sx={{maxHeight: '76px', minHeight: '76px', maxWidth: '76px', minWidth: '76px'}}/>
              </Box>
              {
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={overTimeStyle}>{ data.overtime ? overtimeTranslate[data.overtime] : null }</Box>
                  <Box  sx={versusStyle}>{formatScore()}</Box>
                  {
                    data.finalScore.home === null || data.finalScore.visitor === null
                      ? <Box sx={partsStyle} />
                      : <Stack direction='row' sx={partsStyle} spacing={1}>
                          <Box>{`${data.firstThird.home}-${data.firstThird.visitor}`}</Box>
                          <Box>{`${data.secondThird.home}-${data.secondThird.visitor}`}</Box>
                          <Box>{`${data.thirdThird.home}-${data.thirdThird.visitor}`}</Box>
                        </Stack>
                  }
                </Box>
              }
              <Box sx={{textAlign: 'center', display: 'flex', alignItems: 'center', width: '100%'}}>
                <CardMedia component='img' image={data.visitorTeam.logo} sx={{maxHeight: '76px', minHeight: '76px', maxWidth: '76px', minWidth: '76px'}}/>
                <Box ml={2}>
                  <Box sx={{textAlign: 'left', fontSize: '18px', fontWeight: 'bold'}}>{data.visitorTeam.name}</Box>
                  <Box sx={{textAlign: 'left', color: '#8696a5'}}>{data.visitorTeam.city.name}</Box>
                </Box>
              </Box>
            </Box>
          : data.type === 'training'
              ? <Box sx={{minWidth: '302px', display: 'flex', p: '12px'}}>
                <CardMedia component='img' image={trainingImage} sx={{maxHeight: '76px', minHeight: '76px', maxWidth: '76px', minWidth: '76px'}}/>
                <Box sx={{minWidth: '150px', textAlign: 'center', fontSize: '18px', pt: 3, fontWeight: 'bold'}}>ТРЕНИРОВКА</Box>
                <CardMedia component='img' image={trainingImage} sx={{maxHeight: '76px', minHeight: '76px', maxWidth: '76px', minWidth: '76px', transform: 'scaleX(-1)'}}/>
              </Box>
              : <Box sx={otherEventRowStyle}>{ parse(data.description) }</Box>
      }
      <Box sx={{backgroundColor: 'gray', color: 'white', p: 1, fontSize: '13px', minWidth: '200px', textAlign: 'right'}}>
        { data.type !== 'other' ? <Box>{data.arena.name}</Box> : null }
        <Box>{data.city.name}</Box>
        <Box mt={1} display='flex' alignItems='center' justifyContent='right'>
            <AccessTimeIcon sx={{fontSize: '16px', mr: '2px', color: 'white'}} />
            <Box sx={rowTimeStyle}>{moment(data.date).tz('Europe/Sofia').format('dddd HH:ss')}</Box>
          </Box>
      </Box>
    </Box>
  )
}

export default CalendarRow