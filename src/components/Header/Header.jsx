import React, { useState, useEffect } from 'react'
import { Container, Stack, Box, IconButton, Collapse, Slide } from '@mui/material'
import { redColor } from '../../config/constants'
import { titleStyle } from './styles'
import { isMobile } from 'react-device-detect'
import { titleStyleMobile } from './styles.mobile'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuBar from './MenuBar'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'



const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [hideLogo, setHideLogo] = useState(false)

  useEffect(() => {
    if (!isMobile) return

    const handleScroll = event => {
      if (window.scrollY >= 65) {
        setHideLogo(true)
      } else {
        setHideLogo(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isMobile) {
    document.body.style.overflowY = 'auto'
    document.body.style.backgroundImage = 'none'
    document.body.style.backgroundColor = 'black'

    return (
      <>
      <Box sx={{position: 'absolute', top: 8, left: 8, zIndex: 100001}}><img src='https://lamerat.github.io/ChervenaZvezda/images/Logo.svg' alt='team_logo' height='75px' style={{ filter: 'drop-shadow(5px 5px 5px rgb(0 0 0 / 0.6))' }} /></Box>
      <Box sx={{ position: 'fixed', top: 0, width: '100%', overflowY: 'scroll', maxHeight: '100%', zIndex: 10000 }}>
        <Box sx={{maxHeight: '54px', width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'black'}}>
          <Slide direction='right' in={hideLogo} mountOnEnter unmountOnExit timeout={600}>
            <Box width='100%' position='absolute' sx={{backgroundColor: '#393939', minHeight: '54px', zIndex: 0}} />
          </Slide>
          <Box width='100%' display='flex' position='relative'>
            <Collapse orientation='horizontal' in={!hideLogo} timeout={600}>
              <Box sx={{minWidth: '85px'}}></Box>
            </Collapse>
            <Collapse orientation='horizontal' in={hideLogo} timeout={600} collapsedSize={160}>
              <Box sx={titleStyleMobile}>RED STAR - Sofia</Box>
            </Collapse>
          </Box>
          <Box sx={{backgroundColor: redColor, zIndex: 2}} >
            <IconButton size='large' onClick={() => setMobileMenu(!mobileMenu)}>
              { mobileMenu ? <CloseIcon sx={{color: 'white', fontSize: '30px'}} /> : <MenuIcon sx={{color: 'white', fontSize: '30px'}} /> }
            </IconButton>
          </Box>
        </Box>
        <Collapse in={mobileMenu}>
          <MenuBar mobileControl={setMobileMenu} hideLogo={hideLogo} />
        </Collapse>
      </Box>
      </>
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