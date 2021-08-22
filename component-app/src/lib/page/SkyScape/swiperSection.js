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

// let prepareProducts = function (products) {
//     for ()

//     return filteredProducts
// }

export default function SimpleSwiper(props) {
  let products = props.products
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
        {products.map((product, index) => {
          return <SwiperSlide>{product.title}</SwiperSlide>
        })}
      </Swiper>
    </>
  )
}
