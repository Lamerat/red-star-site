import React, { useEffect, useState, useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper'
import { listPhotosRequest } from '../../api/media'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import CircularProgress from '@mui/material/CircularProgress'
import { titleBox, preloadStyle } from './styles'
import { ENV } from '../../config/constants'
import CloseIcon from '@mui/icons-material/Close'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const MobileHomeMedia = ({ album }) => {  
  const firstRenderRef = useRef(true)

  const [photos, setPhotos] = useState(null)
  const [fullscreen, setFullscreen] = useState({ enabled: false, startIndex: 0 })
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })
  const [isLandscape, setIsLandscape] = useState(window.screen.availWidth > window.screen.availHeight)
  

  useEffect(() => {
    const changeOrientation = () => setIsLandscape(isLandscape => !isLandscape)

    window.addEventListener('orientationchange', changeOrientation)

    return () => window.removeEventListener('orientationchange', changeOrientation)
  }, [])


  useEffect(() => {
    if (firstRenderRef.current && ENV === 'development') {
      firstRenderRef.current = false
      return
    }

    listPhotosRequest({ album })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setPhotos(result.payload.docs)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [album])

  if (!photos) return <Box sx={preloadStyle}><CircularProgress size='60px' />{ errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }</Box>

  if (!photos.length) {
    return (
      <Box sx={preloadStyle}>
        НЯМА НАМЕРЕН ГЛАВЕН АЛБУМ ИЛИ Е ПРАЗЕН
        { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
      </Box>
    )
  }


  if (fullscreen.enabled) {
    return (
      <Box sx={{ zIndex: 10000000, touchAction: 'none', backgroundColor: 'rgb(0,0,0,0.9)', position: 'fixed', top: -16, left: 0, right: 0, bottom: 0, overflow: 'hidden'}}>
        <Swiper
          initialSlide={fullscreen.startIndex}
          loop={true}
          autoHeight={true}
          pagination={{ clickable: true }}
          navigation={{ clickable: true, prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
          modules={[Pagination, Navigation ]}
          style={{ display: 'flex', alignItems: 'center' }}   
          
        >
          { photos.map(x =>
            <SwiperSlide key={x._id}>
              <Box className='swiper-image-wrapper' >
                <img
                  style={{
                    height: isLandscape ? '100vh' : 'auto',
                    width: isLandscape ? 'auto' : '100vw',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                  src={x.address}
                  alt={x._id}
                />
              </Box>
            </SwiperSlide>)
          }
        </Swiper>
          <div className='swiper-button-next'>›</div>
          <div className='swiper-button-prev'>‹</div>
        <IconButton sx={{position: 'absolute', top: 8, right: 8, zIndex: 100000000}} onClick={() => setFullscreen({ enabled: false, startIndex: 0 })}>
          <CloseIcon sx={{color: 'white'}} />
        </IconButton>
          { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
      </Box>
    )
  }


  return (
    <Box>
      <Box sx={titleBox}>
        <Box>МЕДИЯ</Box>
      </Box>
      <Swiper
        loop={true}
        autoplay={{delay: 2500, disableOnInteraction: false}}
        modules={[Autoplay]}
        style={{ maxHeight: '230px'}}
      >
        {
          photos.map((el, index) =>
            <SwiperSlide key={el._id} onClick={() => setFullscreen({ enabled: true, startIndex: index })}>
              <img src={el.address} alt={el._id} style={{}} />
            </SwiperSlide>)
        }
        { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
      </Swiper>
    </Box>
  )
}

export default MobileHomeMedia