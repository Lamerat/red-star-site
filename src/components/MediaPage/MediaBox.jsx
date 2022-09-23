import React, { useState, useRef, useEffect } from 'react'
import { Box, Backdrop } from '@mui/material'
import { formatDate, newsTime } from '../../common/help-functions'
import { redColor } from '../../config/constants'
import { emptySlideStyle, smallNewsImage, dateNewsStyle } from './styles'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, Keyboard  } from 'swiper'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'



const MediaBox = ({data}) => {
  const [fullscreen, setFullscreen] = useState({ enabled: false, startIndex: 0 })
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })


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
          { data.photos.map(x =>
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
    <Box maxHeight='265px' minHeight='245px'>
      <Swiper
        loop={false}
        spaceBetween={0}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        style={{ maxHeight: '190px', maxWidth: '299px', border: '1px solid #e0e0e0', zIndex: 0 }}
      >
        {
          !data.photosCount
            ? <SwiperSlide><Box sx={{ ...emptySlideStyle, fontSize: '14px' }}>{ `няма намерени снимки` }</Box></SwiperSlide>
            : <>
                {
                  data.photos.map((el, index) => 
                    <SwiperSlide key={el._id} onClick={() => setFullscreen({ enabled: true, startIndex: index })}>
                      <img src={el.address} alt={el._id} style={{cursor: 'pointer' }} />
                    </SwiperSlide>)
                }
                {
                  data.photosCount > 3
                    ? <SwiperSlide onClick={() => setFullscreen({ enabled: true, startIndex: 4 })}><Box sx={emptySlideStyle}>{ `+ още ${data.photosCount - 3}` }</Box></SwiperSlide>
                    : null}
              </>
        }
      </Swiper>
      <Box sx={{ color: '#adadae', display: 'flex', justifyContent: 'space-between', mt: 1, fontSize: '14px' }}>
        <Box>{ formatDate(data.createdAt) }</Box>
        <Box sx={{ display: 'flex' }}>
          <PhotoCameraIcon sx={{mr: 0.5, fontSize: '18px', pt: 0.1}} />{ data.photosCount }</Box>
      </Box>
      <Box sx={{ mt: 0.4, fontSize: '15px', fontWeight: 'bold' }}>
        {data.name.length > 62 ? `${data.name.slice(0, 62)} ...` : data.name }
      </Box>
        { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Box>
  )
}

export default MediaBox