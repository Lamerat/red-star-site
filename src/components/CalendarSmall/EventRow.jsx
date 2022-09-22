import React from 'react'
import { Box, Stack, CardMedia } from '@mui/material'
import { getMonth, getDayNumber, getDayName, getTime } from '../../common/help-functions.js'
import { popoverTitle, versusStyle, overTimeStyle, partsStyle, logoStyle, popupDateStyle, otherEventText } from './style.js'
import { overtimeTranslate, trainingImage } from '../../config/constants'
import parse from 'html-react-parser'


const EventRow = ({data, last}) => {
  return (
    <>
    <Box sx={popoverTitle}>
      <Box sx={popupDateStyle}>{getDayNumber(data.date)}</Box>
      <Box sx={{alignSelf: 'top', justifySelf: 'left', fontSize: '12px', pt: 1.1}}>
        <Box>{getMonth(data.date)}</Box>
        <Box>{getDayName(data.date)} {getTime(data.date)}</Box>
      </Box>
      <Box sx={{alignSelf: 'top', justifySelf: 'right', fontSize: '12px', textAlign: 'right', pt: 1.1, mr: 1.6}}>
        <Box>{data.type !== 'other' ? data.arena.name.split(' ').filter(x => x !== '').slice(0, 2).join(' ') : null}</Box>
        <Box>{data.city.name}</Box>
      </Box>
    </Box>
      {
        data.type === 'game'
          ? <Box sx={{display: 'grid', gridTemplateColumns: '30% 40% 30%', pb: 1, minHeight: '82px', maxHeight: '82px'}}>
              <CardMedia component='img' image={data.homeTeam.logo} sx={logoStyle}/>
              {
                !data.finalScore.home && !data.finalScore.visitor
                ? <Box sx={versusStyle}>VS</Box>
                : <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={overTimeStyle}>{ data.overtime ? overtimeTranslate[data.overtime] : null }</Box>
                    <Box  sx={versusStyle}>{`${data.finalScore.home} - ${data.finalScore.visitor}`}</Box>
                    <Stack direction='row' sx={partsStyle} spacing={0.8}>
                      <Box>{`${data.firstThird.home}-${data.firstThird.visitor}`}</Box>
                      <Box>{`${data.secondThird.home}-${data.secondThird.visitor}`}</Box>
                      <Box>{`${data.thirdThird.home}-${data.thirdThird.visitor}`}</Box>
                    </Stack>
                  </Box>
              }
              <CardMedia component='img' image={data.visitorTeam.logo} sx={logoStyle}/>
            </Box>
          : data.type === 'training'
              ? <Box sx={{display: 'grid', gridTemplateColumns: '30% 40% 30%', p: 1, minHeight: '82px', maxHeight: '82px'}}>
                <CardMedia component='img' image={trainingImage} sx={logoStyle}/>
                <Box sx={{alignSelf: 'center', justifySelf: 'center', pb: 1, fontSize: '20px'}} >ТРЕНИРОВКА</Box>
                <CardMedia component='img' image={trainingImage} sx={{ ...logoStyle, transform: 'scaleX(-1)' }}/>
              </Box>
              : <Box sx={otherEventText}>{ parse(data.description) }
              </Box>
      }
      { last ? null : <Box sx={{borderBottom: '1px solid #9e9e9e'}} /> }
    </>
  )
}

export default EventRow