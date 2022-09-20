import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress, Grid } from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useParams } from 'react-router-dom'
import { redColor } from '../../config/constants'
import { mainPaper } from './styles'
import ErrorDialog from '../ErrorDialog/ErrorDialog'


const SingleNewsPage = () => {
  const { id } = useParams()
  const firstRenderRef = useRef(true)

  const [news, setNews] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    // listNewsRequest({ pageSize: 20 })
    //   .then(x => x.json())
    //   .then(result => {
    //     if (!result.success) throw new Error(result.message)
    //     setNews(result.payload.docs)
    //   })
    //   .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [])
  
  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='flex-end' borderBottom={1} borderColor={redColor} mb={2}>
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Новини</Typography>
        </Box>
        <Scrollbars style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}></Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default SingleNewsPage