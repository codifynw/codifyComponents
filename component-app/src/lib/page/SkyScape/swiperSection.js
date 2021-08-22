import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import './css/swiper.css'

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper/core'

// install Swiper modules
SwiperCore.use([Pagination])

export default function SimpleSwiper(products) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1
          Slide 1 Slide 1 Slide 1 Slide 1 Slide 1
        </SwiperSlide>
        <SwiperSlide>
          Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1
          Slide 1 Slide 1 Slide 1 Slide 1 Slide 1
        </SwiperSlide>
        <SwiperSlide>
          Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1
          Slide 1 Slide 1 Slide 1 Slide 1 Slide 1
        </SwiperSlide>
      </Swiper>
    </>
  )
}
