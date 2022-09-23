import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress, Grid, IconButton, Switch, FormControlLabel, Slide, Stack } from '@mui/material'
import { getPlayersList, averageStat } from '../../api/player'
import { mainPaper } from './styles'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { redColor } from '../../config/constants'
import { useParams } from 'react-router-dom'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import PlayerBox from './PlayerBox'
import TuneIcon from '@mui/icons-material/Tune'

const defaultFilters = { goalie: false, guard: false, attacker: false }
const defaultQuery = { position: null, pageNumber: 1, pageSize: 12, noPagination: false, hasNextPage: false }

const PlayersPage = () => {
  const firstRenderRef = useRef(true)
  const { filter } = useParams()
  
  const [query, setQuery] = useState(defaultQuery)
  const [players, setPlayers] = useState(null)
  const [stat, setStat] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })


  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    averageStat()
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setStat(result.payload)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [])


  useEffect(() => {
    if (filter === 'all') {
      setQuery({ ...defaultQuery, position: { goalie: true, guard: true, attacker: true } })
    } else {
      setQuery({ ...defaultQuery, position: { ...defaultFilters, [filter]: true } })
    }
  }, [filter])


  useEffect(() => {
    if (!query.position) return

    const body = {
      position: Object.keys(query.position).filter(x => query.position[x]),
      pageNumber: query.pageNumber,
      pageSize: 12,
    }

    getPlayersList(body)
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setPlayers(players => query.pageNumber === 1 ? result.payload.docs : [ ...players, ...result.payload.docs])
      setQuery(query => ({ ...query, pageNumber: result.payload.page, hasNextPage: result.payload.hasNextPage }))
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [query.position, query.pageNumber])


  const handlePagination = (scrollTop, height, scrollHeight) => {
    if (scrollTop + height < scrollHeight - 20) return
    if (query.hasNextPage) {
      setQuery({ ...query, pageNumber: query.pageNumber + 1, hasNextPage: false })
    }
  }


  const switchChange = (field) => {
    const oldValue = query.position[field]
    const newPositions = { ...query.position, [field]: !oldValue }
    setQuery({ ...defaultQuery, position: newPositions })
  }

  
  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='space-between' borderBottom={1} borderColor={redColor} mb={2}>
          {
            query.position
              ? <Box display='flex'>
                  <IconButton size='small' sx={{ml: -0.8}} onClick={() => setShowFilters(!showFilters)}><TuneIcon color='primary' /></IconButton>
                  <Box overflow='hidden' ml={5}>
                    <Slide in={showFilters} direction='right' pt={0.4} pl={1} mountOnEnter unmountOnExit timeout={700} ml={7}>
                      <Stack direction='row' spacing={1} >
                        <FormControlLabel
                          componentsProps={ { typography: { fontFamily: 'CorsaGrotesk', fontSize: '14px', pb: 0.3, ml: 0.3 } } }
                          control={ <Switch size='small' checked={query.position.goalie} onChange={() => switchChange('goalie')}/> }
                          label='вратари'
                        />
                        <FormControlLabel
                          componentsProps={ { typography: { fontFamily: 'CorsaGrotesk', fontSize: '14px', pb: 0.3, ml: 0.3 } } }
                          control={ <Switch size='small' checked={query.position.guard} onChange={() => switchChange('guard')}/> }
                          label='защитници'
                        />
                        <FormControlLabel
                          componentsProps={ { typography: { fontFamily: 'CorsaGrotesk', fontSize: '14px', pb: 0.3, ml: 0.3 } } }
                          control={ <Switch size='small' checked={query.position.attacker} onChange={() => switchChange('attacker')}/> }
                          label='нападатели'
                        />
                        {
                          !stat || stat.totalPlayers === 0
                            ? null
                            : <Box display='flex' pt={0.8} justifyContent='space-between' alignItems='center'>
                                <Box ml={16} fontSize='12px'>Средна възраст: <strong>{ stat.averageYears } г.</strong></Box>
                                <Box borderLeft='1px solid #e0e0e0' height='50%' ml={1} mr={1}></Box>
                                <Box fontSize='12px'>Средна височина: <strong>{ stat.averageHeight } см</strong></Box>
                                <Box borderLeft='1px solid #e0e0e0' height='50%' ml={1} mr={1}></Box>
                                <Box fontSize='12px'>Средно тегло: <strong>{ stat.averageWeight } кг</strong></Box>
                              </Box>
                        }
                      </Stack>
                    </Slide>
                  </Box>
                </Box>
              : null
          }
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Отбор</Typography>
        </Box>
        <Scrollbars
          style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}
          onScroll={({ target }) => handlePagination(target.scrollTop, target.getBoundingClientRect().height, target.scrollHeight)}
        >
          <Box p={2} pt={0}>
            {
              !players
                ? <LinearProgress sx={{height: '20px'}} />
                : players.length
                  ? <Grid container spacing={4}>
                      { players.map(x => <Grid key={x._id} item xs={3}><PlayerBox key={x._id} data={x}/></Grid>) }
                    </Grid>
                  : <Box textAlign='center'>Няма намерени играчи</Box>
            }
            </Box>
        </Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default PlayersPage