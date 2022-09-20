import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress, Grid, IconButton, Switch, FormControlLabel, Slide, Stack } from '@mui/material'
import { mainPaper } from './styles'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { redColor } from '../../config/constants'
import { useParams } from 'react-router-dom'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import { getPlayersList } from '../../api/player'
import PlayerBox from './PlayerBox'
import TuneIcon from '@mui/icons-material/Tune'

const defaultFilters = { goalie: false, guard: false, attacker: false, all: true }

const PlayersPage = () => {
  const { filter } = useParams()
  console.log(filter)
  const firstRenderRef = useRef(true)
  
  const [players, setPlayers] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })
  
  useEffect(() => {
    if (filter === 'all') {
      setFilters({ goalie: true, guard: true, attacker: true, all: true })
    } else {
      setFilters({ ...defaultFilters, [filter]: true })
    }
  }, [filter])

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    if (!filters) return

    getPlayersList({ position: Object.keys(filters).filter(x => filters[x]), pageSize: 10 })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setPlayers(result.payload.docs)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [filters])


  const switchChange = (field) => {
    const oldValue = filters[field]
    setFilters({ ...filters, [field]: !oldValue })
  }

  if (!filters) return
  
  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='space-between' borderBottom={1} borderColor={redColor} mb={2}>
          <Box display='flex'>
            <IconButton size='small' sx={{ml: -0.8}} onClick={() => setShowFilters(!showFilters)}><TuneIcon color='primary' /></IconButton>
            <Box overflow='hidden' ml={12}>
              <Slide in={showFilters} direction='right' pt={0.4} pl={1} mountOnEnter unmountOnExit timeout={800}>
                <Stack direction='row' spacing={1} >
                  <FormControlLabel
                    componentsProps={{
                      typography: { fontFamily: 'CorsaGrotesk', fontSize: '14px', pb: 0.3, ml: 0.3 }
                    }}
                    control={ <Switch size='small' checked={filters.goalie} onChange={() => switchChange('goalie')}/> }
                    label='вратари'
                  />
                  <FormControlLabel
                    componentsProps={{
                      typography: { fontFamily: 'CorsaGrotesk', fontSize: '14px', pb: 0.3, ml: 0.3 }
                    }}
                    control={ <Switch size='small' checked={filters.guard} onChange={() => switchChange('guard')}/> }
                    label='защитници'
                  />
                  <FormControlLabel
                    componentsProps={{
                      typography: { fontFamily: 'CorsaGrotesk', fontSize: '14px', pb: 0.3, ml: 0.3 }
                    }}
                    control={ <Switch size='small' checked={filters.attacker} onChange={() => switchChange('attacker')}/> }
                    label='нападатели'
                  />
                </Stack>
              </Slide>
              </Box>
            </Box>
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Отбор</Typography>
        </Box>
        <Scrollbars style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}>
          <Box p={2} pt={0}>
            {
              !players
                ? <LinearProgress sx={{height: '20px'}} />
                : <Grid container spacing={4}>
                    { players.map(x => <Grid key={x._id} item xs={3}><PlayerBox key={x._id} data={x}/></Grid>) }
                  </Grid>
            }
            </Box>
        </Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default PlayersPage