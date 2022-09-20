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

const preloadStyle = {
  width: '100%',
  maxWidth: '980px',
  height: '100%',
  maxHeight: '109px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}


const ImageSliderSmall = ({ settings, album, data }) => {
  const firstRenderRef = useRef(true)

  const [photos, setPhotos] = useState(null)
  const [fullscreen, setFullscreen] = useState({ enabled: false, startIndex: 0 })
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })
  

  const handleKeyUp = useCallback((event) => {
      if (event.key === 'Escape') {
        setFullscreen({ enabled: false, startIndex: 0 })
      }
  }, [setFullscreen])

  useEffect(() => {
    if (fullscreen.enabled) {
        window.addEventListener('keyup', handleKeyUp)
    } else {
        window.removeEventListener('keyup', handleKeyUp)
    }

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [fullscreen, handleKeyUp])

  useEffect(() => {
    
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    
    console.log('render')
    if (data) {
      setPhotos(data)
      return
    }

    listPhotosRequest({ album })
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setPhotos(result.payload.docs)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [album, data])

  if (!photos) return <Box sx={preloadStyle}><CircularProgress size='60px' />{ errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }</Box>


  if (fullscreen.enabled) {
    return (
      <Backdrop open={true} sx={{ zIndex: 10000, backgroundColor: 'black', m: '0 !important'}}>
        <Swiper
          initialSlide={fullscreen.startIndex}
          loop={true}
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
                <img
                  style={{height: '100%', maxHeight: '80vh', width: 'auto'}}
                  src={x.address}
                  alt={x._id}
                  onClick={() => setFullscreen({ enabled: false, startIndex: 0 })}
                />
              </Box>
            </SwiperSlide>)
          }
          { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
        </Swiper>
      </Backdrop>
    )
  }


  return (
    <Swiper
      loop={settings.loop}
      slidesPerView={settings.slidesPerView}
      spaceBetween={settings.spaceBetween}
      autoplay={settings.autoplay}
      modules={settings.modules}
      pagination={{ clickable: true }}
      style={settings.style}
    >
      {
        photos.map((el, index) =>
          <SwiperSlide key={el._id} onClick={() => setFullscreen({ enabled: true, startIndex: index })}>
            <img src={el.address} alt={el._id} style={{cursor: 'pointer'}} />
          </SwiperSlide>)
      }
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Swiper>
  )
}

export default ImageSliderSmall