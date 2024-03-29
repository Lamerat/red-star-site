import React, { useEffect, useState, useRef } from 'react'
import { Container, Box, Typography, LinearProgress } from '@mui/material'
import { getSingleArticle } from '../../api/articles'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { ENV, redColor } from '../../config/constants'
import { isMobile } from 'react-device-detect'
import { useParams } from 'react-router-dom'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import parse from 'html-react-parser'


const mainPaper = {
  maxHeight: 'calc(100vh - 200px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  border: '1px solid black',
  p: 2,
}

const ArticlePage = () => {
  const firstRenderRef = useRef(true)

  const [article, setArticle] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  const { id } = useParams()
  
  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    getSingleArticle(id)
      .then(x => x.json())
      .then(result => {
        if (!result.success) throw new Error(result.message)
        setArticle(result.payload)
      })
      .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [id])


  if (isMobile) return (
    <Box sx={{backgroundColor: 'white', mt: '54px', p: 1.5, pt: 1}}>
      {
        article
          ? <React.Fragment>
              <Box display='flex' alignItems='center' justifyContent='flex-end' borderBottom={1} borderColor={redColor} mb={1} pl={10} textAlign='right'>
                <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h6' pb={0.5}>{article.longTitle}</Typography>
              </Box>
              { parse(article.text) }
            </React.Fragment>
          : <LinearProgress sx={{height: '20px'}} />
      }
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Box>
  )


  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='flex-end' borderBottom={1} borderColor={redColor} mb={1}>
          {
            article
              ? <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>{article.longTitle}</Typography>
              : <Box minHeight='36.02px'></Box>
          }
        </Box>
        <Scrollbars style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}>
          <Box p={2} pt={0}>
            {
              article
                ? parse(article.text)
                : <LinearProgress sx={{height: '20px'}} />
            }
          </Box>
        </Scrollbars>
      </Box>
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default ArticlePage