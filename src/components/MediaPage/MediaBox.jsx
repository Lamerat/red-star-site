import React, { useState } from 'react'
import { Box } from '@mui/material'
import { formatDate } from '../../common/help-functions'
import { emptySlideStyle } from './styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import ErrorDialog from '../ErrorDialog/ErrorDialog'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'



const MediaBox = ({ data, selectAlbum }) => {
  const [errorDialog, setErrorDialog] = useState({ show: false, message: '' })

  const openFullScreen = (index) => data.photosCount ? selectAlbum({ _id: data._id, startIndex: index }) : null

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
                  data.photos.map((el, index) => <SwiperSlide key={el._id} onClick={() => openFullScreen(index)}><img src={el.address} alt={el._id} style={{cursor: 'pointer' }} /></SwiperSlide>)
                }
                {
                  data.photosCount > 3
                    ? <SwiperSlide onClick={() => openFullScreen(3)}><Box sx={emptySlideStyle}>{ `+ още ${data.photosCount - 3}` }</Box></SwiperSlide>
                    : null
                }
              </>
        }
      </Swiper>
      <Box sx={{ color: '#adadae', display: 'flex', justifyContent: 'space-between', mt: 1, fontSize: '14px' }}>
        <Box>{ formatDate(data.createdAt) }</Box>
        <Box sx={{ display: 'flex' }}>
          <PhotoCameraIcon sx={{mr: 0.5, fontSize: '18px', pt: 0.1}} />{ data.photosCount }
        </Box>
      </Box>
      <Box sx={{ mt: 0.4, fontSize: '15px', fontWeight: 'bold' }}>
        {data.name.length > 62 ? `${data.name.slice(0, 62)} ...` : data.name }
      </Box>
        { errorDialog.show ? <ErrorDialog text={errorDialog.message} closeFunc={setErrorDialog} /> : null }
    </Box>
  )
}

export default MediaBox