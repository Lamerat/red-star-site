import React from 'react'
import { isMobile } from 'react-device-detect'
import { Container, Box, Stack } from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { mainPaper } from './styles'
import NewsBox from '../NewsBox/NewsBox'
import GameBox from '../GameBox/GameBox'
import CalendarSmall from '../CalendarSmall/CalendarSmall'
import ImageSliderSmall from '../ImageSliderSmall/ImageSliderSmall'
import { mainPageSwiper } from '../../config/constants'
import BannerPage from '../BannerPage/BannerPage'

const HomePage = () => {

  if (isMobile) return (
    <Box sx={{color: 'white', mt: '54px'}}>
      <Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box>
      <Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box>
      <Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box>
      <Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box>
      <Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box>
      <Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box>
      <Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box><Box>test</Box>
    </Box>
    
  )


  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 1}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Scrollbars style={{height: '100vh'}}>
          <Stack direction='row' spacing={3}>
            <Stack spacing={3}>
              <NewsBox />
              <ImageSliderSmall settings={mainPageSwiper} />
            </Stack>
            <Stack spacing={3} maxWidth='330px'>
              <GameBox type='next' />
              <GameBox type='last' />
              <CalendarSmall />
            </Stack>
          </Stack>
          <BannerPage />
        </Scrollbars>
      </Box>
    </Container>
  )
}

export default HomePage