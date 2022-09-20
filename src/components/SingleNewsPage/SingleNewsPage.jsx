import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress } from '@mui/material'
import { singNewsPageSwiper } from '../../config/constants.js'
import { mainPaper, newsBox, imageWrapper } from './styles'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { singleNewsRequest } from '../../api/news'
import { redColor } from '../../config/constants'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import ImageSliderSmall from '../ImageSliderSmall/ImageSliderSmall'


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

    singleNewsRequest(id)
      .then(x => x.json())
      .then(result => {
        if (!result.success) throw new Error(result.message)
        setNews(result.payload)
      })
      .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [id])

  
  
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
                : <Box sx={newsBox}>
                    <Box sx={imageWrapper}>
                      <ImageSliderSmall settings={singNewsPageSwiper} data={[news.coverPhoto, ...news.photos]} />
                    </Box>
                    <Box style={{marginTop: '-432px'}}>
                      <Box sx={{ fontWeight: 'bold', fontSize: '20px' }}>{news.title}</Box>
                      { parse(news.text) }
                    </Box>
                  </Box>
            }
            </Box>
        </Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default SingleNewsPage