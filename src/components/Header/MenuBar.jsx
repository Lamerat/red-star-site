import React, { useState, useRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Box, Divider, Collapse } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { menuBarStyle, buttonStyle, separatorStyle, menuItem, dropDown } from './styles'
import { getArticles } from '../../api/articles'
import { redColor } from '../../config/constants'
import { ENV } from '../../config/constants'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { mobileMenuRow, mobileMenuRowWithSub, rotateAngle } from './styles.mobile'

const MenuBar = ({ mobileControl }) => {
  const firstRenderRef = useRef(true)

  const [hoverButton, setHoverButton] = useState(null)
  const [articles, setArticles] = useState(null)
  const [mobileSub, setMobileSub] = useState({ club: false, team: false })
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


  const mobileMenuAction = (event, address) => {
    console.log(event)
    mobileControl(false)
    setMobileSub({ club: false, team: false })
    event.stopPropagation()
    history(address)
  }


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
      : <Box sx={{ backgroundColor: redColor, color: 'white', fontFamily: 'CorsaGrotesk', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px', pt: 6 }}>
          <Box sx={mobileMenuRow} onClick={(event) => mobileMenuAction(event, '/')}>НАЧАЛО</Box>
          <Box sx={mobileMenuRowWithSub(mobileSub.club)}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setMobileSub({ ...mobileSub, club: !mobileSub.club })}>
              <Box>КЛУБ</Box>
              <NavigateNextIcon sx={rotateAngle(mobileSub.club)} />
            </Box>
            <Collapse in={mobileSub.club} sx={{ ml: 2, color: 'black' }}>
              {
                articles.map((el, index) => (
                  <Box
                    key={el._id}
                    sx={{ ...mobileMenuRow, borderColor: index === articles.length - 1 ? 'transparent' : 'black', textTransform: 'uppercase', fontWeight: '500' }}
                    onClick={(event) =>mobileMenuAction(event, `/article/${el._id}`)}
                  >
                    {el.shortTitle}
                  </Box>)
                )
              }
            </Collapse>
          </Box>
          <Box sx={mobileMenuRow} onClick={(event) => mobileMenuAction(event, '/news')}>НОВИНИ</Box>
          <Box sx={mobileMenuRowWithSub(mobileSub.team)}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setMobileSub({ ...mobileSub, team: !mobileSub.team })}>
              <Box>ОТБОР</Box>
              <NavigateNextIcon sx={rotateAngle(mobileSub.team)} />
            </Box>
            <Collapse in={mobileSub.team} sx={{ ml: 2, color: 'black' }}>
              <Box sx={{ ...mobileMenuRow, borderColor: 'black', fontWeight: '500'}} onClick={(event) => mobileMenuAction(event, '/players/all')}>ВСИЧКИ</Box>
              <Box sx={{ ...mobileMenuRow, borderColor: 'black', fontWeight: '500'}} onClick={(event) => mobileMenuAction(event, '/players/goalie')}>ВРАТАРИ</Box>
              <Box sx={{ ...mobileMenuRow, borderColor: 'black', fontWeight: '500'}} onClick={(event) => mobileMenuAction(event, '/players/guard')}>ЗАЩИТНИЦИ</Box>
              <Box sx={{ ...mobileMenuRow, borderColor: 'transparent', fontWeight: '500'}} onClick={(event) => mobileMenuAction(event, '/players/attacker')}>НАПАДАТЕЛИ</Box>
            </Collapse>
          </Box>
          <Box sx={mobileMenuRow} onClick={(event) => mobileMenuAction(event, '/media')}>МЕДИЯ</Box>
          <Box sx={{ ...mobileMenuRow, borderBottom: null }} onClick={(event) => mobileMenuAction(event, '/calendar')}>КАЛЕНДАР</Box>
        </Box>
  )
}

export default MenuBar