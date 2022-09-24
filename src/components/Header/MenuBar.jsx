import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Box, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { menuBarStyle, buttonStyle, separatorStyle, menuItem, dropDown } from './styles'


const MenuBar = () => {
  const [hoverButton, setHoverButton] = useState(null)

  const history = useNavigate()

  const submenuAction = (event, address) => {
    history(address)
    event.stopPropagation()
    setHoverButton(null)
  }

  return (
    !isMobile
      ?  <Box sx={menuBarStyle} onMouseLeave={() => setHoverButton(null)}>
          <Box display='flex' alignItems='center'>
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(1)} onClick={() => history('/')}>НАЧАЛО</Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(2)}>
              КЛУБ
              <Box sx={{ ...dropDown, display: hoverButton === 2 ? 'block' : 'none' }}>
                <Box sx={menuItem} onClick={(event) =>submenuAction(event, '/about')}>ИСТОРИЯ</Box>
                <Divider variant='middle'/>
                <Box sx={menuItem} onClick={() => 1}>КОНТАКТИ</Box>
              </Box>
            </Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(3)} onClick={() => history('/news')}>НОВИНИ</Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(4)} onClick={(event) => submenuAction(event, '/players/all')}>
              ОТБОР
              <Box sx={{ ...dropDown, display: hoverButton === 4 ? 'block' : 'none' }}>
                <Box sx={menuItem} onClick={(event) => submenuAction(event, '/players/goalie')}>ВРАТАРИ</Box>
                <Divider variant='middle'/>
                <Box sx={menuItem} onClick={(event) => submenuAction(event, '/players/guard')}>ЗАЩИТНИЦИ</Box>
                <Divider variant='middle'/>
                <Box sx={menuItem} onClick={(event) => submenuAction(event, '/players/attacker')}>НАПАДАТЕЛИ</Box>
              </Box>
            </Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(5)} onClick={() => history('/media')}>МЕДИЯ</Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(6)} onClick={() => history('/calendar')}>КАЛЕНДАР</Box>
            <Box sx={separatorStyle} />
          </Box>
        </Box>
      : null
  )
}

export default MenuBar