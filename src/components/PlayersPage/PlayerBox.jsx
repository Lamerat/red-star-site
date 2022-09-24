import React, { useState } from 'react'
import { positionTranslate, redColor } from '../../config/constants'
import { Box, CardMedia, Collapse, Stack } from '@mui/material'
import { playerBirthDate } from '../../common/help-functions'
import { numberStyle, infoStyle } from './styles'
import { useNavigate } from 'react-router-dom'

const PlayerBox = ({data}) => {
  const [showInfo, setShowInfo] = useState(false)
  
  const history = useNavigate()

  return (
    <Box sx={{position: 'relative', border: '1px solid #e0e0e0', maxHeight: '368px'}} onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
      <Box sx={numberStyle}>{data.number}</Box>
      <CardMedia component='img' image={data.photo} sx={{ maxHeight: '366px', maxWidth: '299px', cursor: 'pointer' }} onClick={() => history(`/player/${data._id}`)}/>
      <Box sx={{position: 'absolute', bottom: 0, width: '100%'}}>
      <Collapse in={showInfo} collapsedSize={38}>
        <Box sx={{ ...infoStyle, backgroundColor: showInfo ? redColor : 'white', color: showInfo ? 'white' : 'black', opacity: showInfo ? 0.95 : 1 }}>
          <Box fontWeight='bold' pb={0.4}>{data.fullName}</Box>
          <Box fontSize='13px'>{positionTranslate[data.position]}</Box>
          <Stack direction='row' sx={{fontSize: '13px', color: 'black', pt: 1.5, fontWeight: 'bold'}}>
            <Box width='50%'>Роден</Box>
            <Box width='25%'>Ръст</Box>
            <Box width='25%'>Тегло</Box>
          </Stack>
          <Stack direction='row' sx={{fontSize: '13px'}}>
            <Box width='50%'>{playerBirthDate(data.birthDate)}</Box>
            <Box width='25%'>{data.height} см</Box>
            <Box width='25%'>{data.weight} кг</Box>
          </Stack>
        </Box>
      </Collapse>
      </Box>
    </Box>
  )
}

export default PlayerBox