import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Swiper from './swiper'
import { Lazy } from 'swiper/dist/js/swiper.esm'
import SlideItem from './slideItem'

export default ({ items }) => {
  // Swiper instance
  const [swiper, updateSwiper] = useState(null)
  // Slides current index
  const [currentIndex, updateCurrentIndex] = useState(0)
  // Params definition
  const params = {
    modules: [Lazy],
    lazy: true,
    initialSlide: 0,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 4,
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    autoplay: false,
    getSwiper: updateSwiper, // Get swiper instance callback
  }

  // Manipulate swiper from outside
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  const renderItem = useCallback(
    ({ idx, color, content }) => (
      <SlideItem color={color} content={content} key={`slide_${idx}`}>
        <img class="swiper-lazy" data-src={`https://picsum.photos/100/100?random=${idx}`} alt="" />
      </SlideItem>
    ),
    []
  )

  const updateIndex = useCallback(() => updateCurrentIndex(swiper.realIndex), [swiper])

  // Add eventlisteners for swiper after initializing
  useEffect(() => {
    if (swiper !== null) {
      swiper.on('slideChange', updateIndex)
    }

    return () => {
      if (swiper !== null) {
        swiper.off('slideChange', updateIndex)
      }
    }
  }, [swiper, updateIndex])

  return (
    <div>
      <Swiper params={params}>{items.map(renderItem)}</Swiper>
      <div>
        <button onClick={goPrev}>Prev</button>
        <button onClick={goNext}>Next</button>
      </div>
      <div>
        Current slide index is <div>{currentIndex}</div>
      </div>
    </div>
  )
}
