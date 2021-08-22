import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import { initThree } from './canvas'
import SimpleSwiper from './swiperSection'

import { productData } from './static/stub/products'

import './css/reset.css'
import './css/styles.css'
import './css/tour-list.css'

initThree()

let products

if (typeof Shopify === 'undefined') {
  products = productData
} else {
  const baseURL = 'http://skyscapetours.myshopify.com/collections/all/products.json'
  fetch(baseURL)
    .then((resp) => resp.json())
    .then((data) => (products = data))
}

const rootElement = document.getElementById('slider-target')
ReactDOM.render(<SimpleSwiper product={products} />, rootElement)
