import React, { useState, useEffect, useRef } from 'react'
import { Box, Stack, CardMedia } from '@mui/material'
import { dateTextStyle, mainBox, overTimeStyle, partsStyle, titleBox, versusStyle, logoStyle, loaderBox } from './styles'
import { getLastNextGame } from '../../api/events'
import { formatDate } from '../../common/help-functions'
import { overtimeTranslate } from '../../config/constants'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import CircularProgress from '@mui/material/CircularProgress'

const GameBox = ({type}) => {
  const firstRenderRef = useRef(true)

  const [game, setGame] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    getLastNextGame({ option: type })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setGame(result.payload)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [type])

  if (!game) return <Box sx={loaderBox}><CircularProgress size='80px' />{ errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }</Box>

  return (
    <Box sx={mainBox}>
      <Box sx={titleBox}>
        <Box>{ type === 'next' ? 'СЛЕДВАЩ МАЧ' : 'ПОСЛЕДЕН МАЧ' }</Box>
        <Box sx={dateTextStyle}>{formatDate(game.date)}</Box>
      </Box>
      <Box sx={{display: 'grid', gridTemplateColumns: '30% 40% 30%', p: 2, minHeight: '82px', maxHeight: '82px'}}>
        <CardMedia component='img' image={game.homeTeam.logo} sx={logoStyle}/>
        {
          type === 'next' && !game.finalScore.home && !game.finalScore.visitor
          ? <Box sx={versusStyle}>VS</Box>
          : <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={overTimeStyle}>{ game.overtime ? overtimeTranslate[game.overtime] : null }</Box>
              {
                game.finalScore.home !== null && game.finalScore.visitor !== null
                  ? <>
                      <Box  sx={versusStyle}>{`${game.finalScore.home} - ${game.finalScore.visitor}`}</Box>
                        <Stack direction='row' sx={partsStyle} spacing={0.8}>
                          <Box>{`${game.firstThird.home}-${game.firstThird.visitor}`}</Box>
                          <Box>{`${game.secondThird.home}-${game.secondThird.visitor}`}</Box>
                          <Box>{`${game.thirdThird.home}-${game.thirdThird.visitor}`}</Box>
                      </Stack>
                    </>
                  : <>
                      <Box  sx={versusStyle}>{` - `}</Box>
                        <Stack direction='row' sx={partsStyle} spacing={0.8}>
                          <Box>{` - `}</Box>
                          <Box>{` - `}</Box>
                          <Box>{` - `}</Box>
                      </Stack>
                    </>
              }
            </Box>
        }
        <CardMedia component='img' image={game.visitorTeam.logo} sx={logoStyle}/>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Box>
  )
}

export default GameBox
