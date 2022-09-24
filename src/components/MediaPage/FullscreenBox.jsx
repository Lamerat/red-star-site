import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Box, Backdrop } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, Keyboard  } from 'swiper'
import { listPhotosRequest } from '../../api/media'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import CircularProgress from '@mui/material/CircularProgress'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const FullscreenBox = ({ album, startIndex, setAlbum }) => {
  const firstRenderRef = useRef(true)

  const [photos, setPhotos] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })


  const handleKeyUp = useCallback((event) => {
    if (event.key === 'Escape') {
      setAlbum(null)
    }
  }, [setAlbum])


  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])


  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    listPhotosRequest({ album, noPagination: true })
      .then(x => x.json())
      .then(result => {
        if (!result.success) throw new Error(result.message)
        setPhotos(result.payload.docs)
      })
      .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [album])

  return (
    <Backdrop open={true} sx={{ zIndex: 10000, backgroundColor: 'black', m: '0 !important'}}>
      {
        !photos
          ? <Box><CircularProgress size={200} /></Box>
          : <Swiper
              initialSlide={startIndex}
              loop={photos.length > 1 ? true : false}
              autoHeight={true}
              pagination={{ clickable: true }}
              navigation={{ clickable: true }}
              keyboard={{ enabled: true }}
              modules={[Pagination, Autoplay, Navigation, Keyboard ]}
              style={{ display: 'flex', alignItems: 'center', margin: 24 }}
            >
              { photos.map(x =>
                <SwiperSlide key={x._id}>
                  <Box className='swiper-image-wrapper' >
                    <img style={{height: '100%', maxHeight: '80vh', width: 'auto'}} src={x.address} alt={x._id} onClick={() => setAlbum(null)} />
                  </Box>
                </SwiperSlide>)
              }
            </Swiper>
      }
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Backdrop>
  )
}

export default FullscreenBox