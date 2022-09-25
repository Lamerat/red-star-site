import React, { useState, useRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Box, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { menuBarStyle, buttonStyle, separatorStyle, menuItem, dropDown } from './styles'
import { getArticles } from '../../api/articles'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import { ENV } from '../../config/constants'

const MenuBar = () => {
  const firstRenderRef = useRef(true)

  const [hoverButton, setHoverButton] = useState(null)
  const [articles, setArticles] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  const history = useNavigate()

  const submenuAction = (event, address) => {
    history(address)
    event.stopPropagation()
    setHoverButton(null)
  }

  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    getArticles({ pageNumber: 1, pageSize: 10 })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setArticles(result.payload.docs)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [])

  if (errorDialog.show) return <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} />

  if (!articles) return null

  return (
    !isMobile
      ?  <Box sx={menuBarStyle} onMouseLeave={() => setHoverButton(null)}>
          <Box display='flex' alignItems='center'>
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(1)} onClick={() => history('/')}>НАЧАЛО</Box>
            <Box sx={separatorStyle} />
            <Box sx={buttonStyle} onMouseEnter={() => setHoverButton(2)}>
              КЛУБ
              <Box sx={{ ...dropDown, display: hoverButton === 2 ? 'block' : 'none' }}>
                {
                  articles.map((el, index) => (
                    <React.Fragment key={el._id}>
                      <Box sx={menuItem} onClick={(event) =>submenuAction(event, `/article/${el._id}`)}>{el.shortTitle}</Box>
                      { index < articles.length - 1 ? <Divider variant='middle'/> : null }
                    </React.Fragment>
                  ))
                }
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