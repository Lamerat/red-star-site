import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Box, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { menuBarStyle, buttonStyle, separatorStyle, menuItem, dropDown } from './styles'


const MenuBar = () => {
  const [hoverButton, setHoverButton] = useState(null)

  const history = useNavigate()

  const submenuAction = (address) => {
    history(address)
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
                <Box sx={menuItem} onClick={() =>submenuAction('/about')}>ИСТОРИЯ</Box>
                <Divider variant='middle'/>
                <Box sx={menuItem} onClick={() => 1}>КОНТАКТИ</Box>
              </Box>
            </Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(3)}>НОВИНИ</Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(4)}>
              ОТБОР
              <Box sx={{ ...dropDown, display: hoverButton === 4 ? 'block' : 'none' }}>
                <Box sx={menuItem} onClick={() => 1}>ВРАТАРИ</Box>
                <Divider variant='middle'/>
                <Box sx={menuItem} onClick={() => 1}>ЗАЩИТНИЦИ</Box>
                <Divider variant='middle'/>
                <Box sx={menuItem} onClick={() => 1}>НАПАДАТЕЛИ</Box>
              </Box>
            </Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(5)}>МЕДИЯ</Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(6)}>КАЛЕНДАР</Box>
            <Box sx={separatorStyle} />
          </Box>
        </Box>
      : null
  )
}

export default MenuBar