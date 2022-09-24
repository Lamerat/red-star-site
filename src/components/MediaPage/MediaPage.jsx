import React, { useState, useRef, useEffect } from 'react'
import { Container, Box, Typography, LinearProgress, Grid } from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { listAlbumsRequest } from '../../api/media'
import { redColor } from '../../config/constants'
import { mainPaper } from './styles'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import MediaBox from './MediaBox'
import FullscreenBox from './FullscreenBox'

const defaultQuery = { pageNumber: 1, pageSize: 12, noPagination: false, hasNextPage: false }


const MediaPage = () => {
  const firstRenderRef = useRef(true)

  const [query, setQuery] = useState(defaultQuery)
  const [albums, setAlbums] = useState(null)
  const [fullscreenShow, setFullscreenShow] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    const body = {
      photoLimit: 3,
      pageNumber: query.pageNumber,
      pageSize: 12,
    }

    listAlbumsRequest(body)
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setAlbums(albums => query.pageNumber === 1 ? result.payload.docs : [ ...albums, ...result.payload.docs])
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

  return (
    <Container sx={{maxWidth: '1366px !important', marginTop: 3, pl: 2, pr: 2}} disableGutters={true}>
      <Box sx={mainPaper}>
        <Box display='flex' alignItems='center' justifyContent='flex-end' borderBottom={1} borderColor={redColor} mb={2}>
          <Typography fontFamily='CorsaGrotesk' color={redColor} variant='h5' pb={0.5}>Медия</Typography>
        </Box>
        <Scrollbars
          style={{height: '100vh', padding: 16, paddingTop: 0, marginLeft: -16}}
          onScroll={({ target }) => handlePagination(target.scrollTop, target.getBoundingClientRect().height, target.scrollHeight)}
        >
          <Box p={2} pt={0}>
            {
              !albums
                ? <LinearProgress sx={{height: '20px'}} />
                : albums.length
                  ? <Grid container spacing={4}>
                      { albums.map(x => <Grid key={x._id} item xs={3}><MediaBox key={x._id} data={x} selectAlbum={setFullscreenShow} /></Grid>) }
                    </Grid>
                  : <Box textAlign='center'>Няма намерени албуми</Box>
            }
          </Box>
        </Scrollbars>
      </Box>
      { fullscreenShow ? <FullscreenBox album={fullscreenShow._id} startIndex={fullscreenShow.startIndex} setAlbum={setFullscreenShow} /> : null }
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Container>
  )
}

export default MediaPage