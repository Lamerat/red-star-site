import React, { useEffect, useState, useRef } from 'react'
import { Box } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
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

const ImageSliderSmall = () => {
  const firstRenderRef = useRef(true)

  const [photos, setPhotos] = useState(null)
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  useEffect(() => {
    if(firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    listPhotosRequest()
    .then(x => x.json())
    .then(result => {
      if (!result.success) throw new Error(result.message)
      setPhotos(result.payload.docs)
    })
    .catch(error => setErrorDialog({ show: true, message: error.message }))
  }, [])

  if (!photos) return <Box sx={preloadStyle}><CircularProgress size='60px' />{ errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }</Box>

  return (
    <Swiper
      onClick={() => console.log('ok')}
      slidesPerView={5}
      spaceBetween={24}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
    >
      { photos.map(x => <SwiperSlide key={x._id}><img src={x.address} alt={x._id} /></SwiperSlide>) }
      { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Swiper>
  )
}

export default ImageSliderSmall