import React, { useEffect, useState, useRef } from 'react'
import { Container, Backdrop, Box, CircularProgress, IconButton, CardMedia, Stack } from '@mui/material'
import { detailPreviewMain, topPreview, detailPreviewWhite, detailTrainingImage, detailVersusStyle, detailOverTimeStyle, detailPartsStyle, mainContainerStyle } from './styles'
import { getDayNumber, getMonth, getTime, getYear } from '../../common/help-functions'
import { ENV, overtimeTranslate, trainingImage } from '../../config/constants'
import { getSingleEvent } from '../../api/events'
import { redColor } from '../../config/constants'
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import parse from 'html-react-parser'
import moment from 'moment-timezone'


export const EventDetails = ({ event, closeFunc, errorFunc }) => {
  const firstRenderRef = useRef(true)

  const [data, setData] = useState(null)

  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    getSingleEvent(event)
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setData(result.payload)
    })
    .catch(error => errorFunc({ show: true, message: error.message }))
  }, [errorFunc, event])

  const formatScore = () => {
    const gameDate = moment(data.date).tz('Europe/Sofia').add(4, 'hours')
    if ((data.finalScore.home === null || data.finalScore.visitor === null) && moment.tz('Europe/Sofia').isBefore(gameDate)) return null
    const homeScore = data.finalScore.home === null ? '-' : data.finalScore.home
    const visitorScore = data.finalScore.visitor === null ? '-' : data.finalScore.visitor

    return homeScore + ' : ' + visitorScore
  }

  const handleClose = () => closeFunc({ show: false, event: null })

  return (
    <Backdrop open={true} sx={{ zIndex: 10000, backgroundColor: 'rgb(41, 41, 41, 0.95)', m: '0 !important'}} onClick={handleClose}>
      <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={handleClose}><CloseIcon sx={{ color: '#808080' }}/></IconButton>
      <Container sx={mainContainerStyle} disableGutters={true} onClick={(e) => e.stopPropagation()}>
        <Box sx={ data && data.type === 'game' ? detailPreviewMain : detailPreviewWhite}>
        {
          !data
            ? <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 100 }}><CircularProgress size={100} /></Box>
            : <Box>
                <Box sx={topPreview}>
                  <Box sx={{ fontSize: '70px', color: 'red', fontWeight: 'bold', lineHeight: 0.78, textAlign: 'center' }}>{ getDayNumber(data.date)}</Box>
                  <Box sx={{fontSize: '15px', ml: 1}}>
                    <Box sx={{ color: redColor, fontWeight: 'bold' }}>{ getMonth(data.date) }</Box>
                    <Box sx={{ display: 'flex', mt: 0.3 }}>
                      <AccessTimeIcon sx={{fontSize: '18px', color: '#616161', pt: 0.3, mr: 0.4 }} />
                      <Box sx={{ color: '#616161' }}>{ getTime(data.date) }</Box>
                    </Box>
                  </Box>
                  <Box sx={{ justifySelf: 'flex-end', fontSize: '14px', textAlign: 'right', color: '#616161' }}>
                    <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>{ getYear(data.date) }</Box>
                    <Box>{ data.type === 'other' ? data.city.name : `${data.arena.name} - ${data.arena.city.name}` }</Box>
                  </Box>
                </Box>
                {
                  data.type === 'game'
                    ? <>
                      <Box sx={{display: 'grid', fontSize: '14px', width: '100%', gridTemplateColumns: 'calc((100% - 160px) / 2) 160px auto', mt: 3 }}>
                        <Box sx={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                          <Box mr={2}>
                            <Box sx={{textAlign: 'right', fontSize: '19px', fontWeight: 'bold'}}>{data.homeTeam.name}</Box>
                            <Box sx={{textAlign: 'right'}}>{data.homeTeam.city.name}</Box>
                          </Box>
                          <CardMedia component='img' image={data.homeTeam.logo} sx={{maxHeight: '120px', minHeight: '110px', maxWidth: '110px', minWidth: '110px'}}/>
                        </Box>
                        {
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxHeight: '110px' }}>
                            <Box sx={detailOverTimeStyle}>{ data.overtime ? overtimeTranslate[data.overtime] : null }</Box>
                            <Box  sx={detailVersusStyle}>{formatScore()}</Box>
                            {
                              data.finalScore.home === null || data.finalScore.visitor === null
                                ? <Box sx={detailPartsStyle} />
                                : <Stack direction='row' sx={detailPartsStyle} spacing={1.3}>
                                    <Box>{`${data.firstThird.home}-${data.firstThird.visitor}`}</Box>
                                    <Box>{`${data.secondThird.home}-${data.secondThird.visitor}`}</Box>
                                    <Box>{`${data.thirdThird.home}-${data.thirdThird.visitor}`}</Box>
                                  </Stack>
                            }
                          </Box>
                        }
                        <Box sx={{textAlign: 'center', display: 'flex', alignItems: 'center', width: '100%'}}>
                          <CardMedia component='img' image={data.visitorTeam.logo} sx={{maxHeight: '120px', minHeight: '110px', maxWidth: '110px', minWidth: '110px'}}/>
                          <Box ml={2}>
                            <Box sx={{textAlign: 'left', fontSize: '19px', fontWeight: 'bold'}}>{data.visitorTeam.name}</Box>
                            <Box sx={{textAlign: 'left'}}>{data.visitorTeam.city.name}</Box>
                          </Box>
                        </Box>
                      </Box>
                      {
                        !data.description
                          ? <Box pt={3}/>
                          : <Box sx={{ borderTop: '1px solid #e0e0e0', fontSize: '14px', m: 1.5, mt: 3, pb: 1.5, pt: 1 }}>{ parse(data.description) }</Box>
                      }
                    </>
                    : data.type === 'other'
                      ? <Box sx={{ borderTop: '1px solid #e0e0e0', mr: 2, ml: 2, pt: 2, pb: 2 }}>{ parse(data.description) }</Box>
                      : <Box sx={{ borderTop: '1px solid #e0e0e0', mr: 2, ml: 2, pt: 2, pb: 2, minHeight: '166px' }}>
                          <CardMedia component='img' image={trainingImage} sx={detailTrainingImage}/>
                          <Box sx={{ fontSize: '20px', fontWeight: 'bold', pb: 1 }}>Тренировка</Box>
                          <Box sx={{ color: '#656565'}}>{ parse(data.description) }</Box>
                        </Box>
                }

                
              </Box>
        }
        

        </Box>
      </Container>
    </Backdrop>
  )
}

export default EventDetails