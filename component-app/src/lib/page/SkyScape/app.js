import React from 'react'
import ReactDOM from 'react-dom'

import { initThree } from './canvas'
import { handleScroll } from './helpers'
import SimpleSwiper from './swiperSection'

import { getProductData } from './static/stub/products'

import './css/reset.css'
import './css/styles.css'
import './css/tour-list.css'

initThree()
handleScroll()

const products = getProductData().products
console.log('products: ', products)

const rootElement = document.getElementById('slider-target')
ReactDOM.render(<SimpleSwiper products={products} />, rootElement)
