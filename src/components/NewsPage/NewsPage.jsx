import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress, Grid } from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { listNewsRequest } from '../../api/news'
import { redColor } from '../../config/constants'
import { mainPaper } from './styles'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import MainNews from './MainNews'
import NewsSmall from './NewsSmall'


const NewsPage = () => {
  const firstRenderRef = useRef(true)

  const [news, setNews] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    listNewsRequest({ pageSize: 20 })
      .then(x => x.json())
      .then(result => {
        if (!result.success) throw new Error(result.message)
        setNews(result.payload.docs)
      })
      .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [])

  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='flex-end' borderBottom={1} borderColor={redColor} mb={2}>
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Новини</Typography>
        </Box>
        <Scrollbars style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}>
          <Box p={2} pt={0}>
          {
            !news
              ? <LinearProgress sx={{height: '20px'}} />
              : <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <MainNews data={news[0]} />
                  </Grid>
                  { news.slice(1).map(x => <Grid key={x._id} item xs={3}><NewsSmall key={x._id} data={x}/></Grid>) }
                </Grid>
          }
          </Box>
        </Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default NewsPage