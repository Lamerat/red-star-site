import React, { useState, useEffect, useRef } from 'react'
import { Container, Box, CardMedia, Grid, LinearProgress } from '@mui/material'
import { ENV } from '../../config/constants'
import { getBanners } from '../../api/banner'
import ErrorDialog from '../ErrorDialog/ErrorDialog'


const BannerPage = () => {
  const firstRenderRef = useRef(true)

  const [banners, setBanners] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    getBanners({ pageNumber: 1, pageSize: 8 })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setBanners(result.payload.docs)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [])


  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pr:1, fontFamily: 'CorsaGrotesk'}} disableGutters={true}>
      {
        !banners
          ? <Box sx={{ minHeight: '82.719px', display: 'flex', alignItems: 'center', width: '100%' }}><LinearProgress sx={{ height: '20px', width: '100%' }} /></Box>
          : <Grid container spacing={3}>
            {  banners.map(x => (
                <Grid key={x._id} item xs={1.5}>
                  <Box sx={{ color: 'gray', fontSize: '12px', textAlign: 'center', cursor: 'pointer' } } onClick={() => window.open(x.link, "_blank")}>
                    <CardMedia component='img' image={x.photo}/>
                    <Box mt={1}>{x.text}</Box>
                  </Box>
                </Grid>
              ))
            }
          </Grid>
      }
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default BannerPage