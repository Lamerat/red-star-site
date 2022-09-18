import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination } from 'swiper';

const ImageSliderSmall = () => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={24}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
      >
        <SwiperSlide><img src='https://iili.io/iA8OXt.jpg' /></SwiperSlide>
        <SwiperSlide><img src='https://iili.io/gUOm4S.jpg' /></SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}

export default ImageSliderSmall