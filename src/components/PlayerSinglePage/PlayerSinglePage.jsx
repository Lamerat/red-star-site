import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress, CardMedia, IconButton } from '@mui/material'
import { ENV, handTranslate, positionTranslate, redColor } from '../../config/constants'
import { mainPaper, visitCardStyle, numberBoxStyle } from './styles'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../common/help-functions'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { getSinglePlayer } from '../../api/player'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import CakeIcon from '@mui/icons-material/Cake'
import SpeedIcon from '@mui/icons-material/Speed'
import SportsHockeyIcon from '@mui/icons-material/SportsHockey'
import ManIcon from '@mui/icons-material/Man'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const PlayerSinglePage = () => {
  const { id } = useParams()
  const firstRenderRef = useRef(true)

  const [player, setPlayer] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  const history = useNavigate()

  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    getSinglePlayer(id)
      .then(x => x.json())
      .then(result => {
        if (!result.success) throw new Error(result.message)
        setPlayer(result.payload)
      })
      .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [id])

  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
      <Box display='flex' alignItems='center' justifyContent='space-between' borderBottom={1} borderColor={redColor} mb={2}>
          <Box sx={{minWidth: '123px'}}>
            <IconButton size='small' sx={{ml: -0.8}} onClick={() => history('/players/all')}><DoubleArrowIcon color='primary' sx={{ transform: 'scaleX(-1)' }} /></IconButton>
          </Box>
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Профил на играч</Typography>
        </Box>
        <Scrollbars style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}>
          <Box p={2} pt={0}>
            {
              !player
                ? <LinearProgress sx={{height: '20px'}} />
                : <Box sx={{ display: 'grid', gridTemplateColumns: '500px auto' }}>
                    <CardMedia component='img' image={player.photo} sx={{ maxWidth: '500px', maxHeight: '612px' }} />
                    <Box sx={visitCardStyle}>
                      <Box sx={numberBoxStyle}>{ player.number }</Box>
                      <Box sx={{ fontSize: '40px', fontWeight: 'bold', color: redColor }}>{player.firstName} {player.lastName}</Box>
                      <Box sx={{ fontSize: '20px', fontWeight: 'bold', color: '#848385', lineHeight: 1, ml: 1 }}>{positionTranslate[player.position]}</Box>

                      <Box sx={{ fontSize: '18px', mt: 4, display: 'flex' }}>
                        <CakeIcon color='primary' sx={{mr: 0.5}} />
                        <Box sx={{fontWeight: 'bold', mr: 1}}>Роден:</Box>
                        {formatDate(player.birthDate)}
                      </Box>
                      <Box sx={{ fontSize: '18px', mt: 1, display: 'flex' }}>
                        <SportsHockeyIcon color='primary' sx={{mr: 0.5, pt: 0.2}} />
                        <Box sx={{fontWeight: 'bold', mr: 1}}>Водеща ръка:</Box>
                        { handTranslate[player.hand] }
                      </Box>
                      <Box sx={{ fontSize: '18px', mt: 1, display: 'flex' }}>
                        <ManIcon color='primary' sx={{mr: 0.5, pt: 0.2}} />
                        <Box sx={{fontWeight: 'bold', mr: 1}}>Височина:</Box>
                        {player.height} см
                      </Box>
                      <Box sx={{ fontSize: '18px', mt: 1, display: 'flex' }}>
                        <SpeedIcon color='primary' sx={{mr: 0.5, pt: 0.2}} />
                        <Box sx={{fontWeight: 'bold', mr: 1}}>Тегло:</Box>
                        {player.weight} кг
                      </Box>
                      <Box sx={{ fontSize: '18px', mt: 4 }}>{parse(player.description)}</Box>
                    </Box>
                  </Box>
            }
            </Box>
        </Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default PlayerSinglePage