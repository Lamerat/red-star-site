import React from 'react'
import { Container, Stack, Box, IconButton } from '@mui/material'
import { titleStyle } from './styles'
import { isMobile } from 'react-device-detect'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuBar from './MenuBar'
import { titleStyleMobile } from './styles.mobile'
import { redColor } from '../../config/constants'
import MenuIcon from '@mui/icons-material/Menu';


const Header = () => {
  if (isMobile) {
    document.body.style.overflowY = 'auto'
    document.body.style.backgroundImage = 'none'
    document.body.style.backgroundColor = 'black'

    return (
      <Box sx={{maxHeight: '40px', width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#393939', position: 'fixed', top: 0}}>
        <Box sx={titleStyleMobile}>RED STAR - Sofia</Box>
        <Box sx={{backgroundColor: redColor}}>
          <IconButton><MenuIcon sx={{color: 'white'}} /></IconButton>
        </Box>
      </Box>
    )
  }

  return (
    <Container sx={{maxWidth: '1366px !important', pl: 2, pr: '17px', mt: 2, maxHeight: '114px'}} disableGutters={true}>
      <Stack direction='row' spacing={2} maxHeight='114px'>
        <Box zIndex={1}><img src='https://lamerat.github.io/ChervenaZvezda/images/Logo.svg' alt='team_logo' width='178px' style={{ filter: 'drop-shadow(5px 5px 5px rgb(0 0 0 / 0.6))' }} /></Box>
        <Box width='100%' pt='14px' maxHeight='100px' zIndex={1}>
          <Box display='flex' justifyContent='space-between' alignItems='flex-end'>
            <Box sx={titleStyle}>RED STAR - Sofia</Box>
            <Box>
              <IconButton sx={{mb: '3px', mr: -0.5}} onClick={() => window.open('https://github.com/Lamerat', '_blank').focus()}><GitHubIcon sx={{color: 'white'}} /></IconButton>
              <IconButton sx={{mb: '3px', mr: -0.5}}><InstagramIcon sx={{color: 'white'}} /></IconButton>
              <IconButton sx={{mb: '3px', mr: -1}} onClick={() => window.open('https://www.facebook.com/redstarsofia', '_blank').focus()}><FacebookIcon sx={{color: 'white'}} /></IconButton>
            </Box>
          </Box>
          <MenuBar />
        </Box>
      </Stack>
    </Container>
  )
}

export default Header