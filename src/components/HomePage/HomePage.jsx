import React from 'react'
// import { isMobile } from 'react-device-detect'
import { Container, Box, Stack } from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { mainPaper } from './styles'
import NewsBox from '../NewsBox/NewsBox'
import GameBox from '../GameBox/GameBox'
import CalendarSmall from '../CalendarSmall/CalendarSmall'

const HomePage = () => {
  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 1}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Scrollbars style={{height: '100vh'}}>
          <Stack direction='row' spacing={3}>
            <NewsBox />
            <Stack spacing={3} maxWidth='330px'>
              <GameBox type='next' />
              <GameBox type='last' />
              <CalendarSmall />
            </Stack>
          </Stack>
          
          <Box color='white'>dasdsadsadsa</Box>
          
        </Scrollbars>
      </Box>
    </Container>
  )
}

export default HomePage