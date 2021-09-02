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
ReactDOM.render(
  <div>
    <canvas id="canvas"></canvas>
    <div id="app">
      <div id="main-scroll-area">
        <section id="landing">
          <div id="land-cta">
            <h1>
              SKY<span class="bolden">SCAPE</span>
            </h1>
          </div>
          <div id="main-scroll-indicator" style="opacity: 1;">
            <div id="main-scroll-indicator-text">Scroll to see more</div>
            <div id="main-scroll-indicator-arrow-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="5"
                fill="#fff"
                height="40"
                viewBox="0 0 5 40"
              >
                <title>Vector Smart Object</title>
                <path d="M0,40V0H1V35H5Z"></path>
              </svg>
            </div>
          </div>
        </section>
        <div id="slider-target"></div>
        <div style="height: 3000px;"></div>
      </div>
      <div id="main-scrollbar" style="display: block;">
        <div
          id="main-scrollbar-indicator"
          style="height: 107.273px; transform: translate3d(0px, 0px, 0px);"
        ></div>
      </div>
      <div class="menu"></div>
    </div>
    <header id="header">
      <div id="header-content">
        <div id="header-logo">
          <span class="bolden">SKYSCAPE</span> TOURS
        </div>

        <ul id="header-menu" class="nav">
          <li class="header-menu-item header-item is-contact">
            <a aria-label="contact" href="/contact" data-has-parsed="true">
              <div class="header-menu-item-mask">Contact</div>
            </a>
          </li>
          <li class="header-menu-item header-item is-about">
            <a aria-label="about" href="/about" data-has-parsed="true">
              <div class="header-menu-item-mask">About</div>
            </a>
          </li>
          <li class="header-menu-item header-item is-work">
            <a aria-label="work" href="/work" data-has-parsed="true">
              <div class="header-menu-item-mask">Tours</div>
            </a>
          </li>
          <li class="header-menu-item header-item is-home">
            <a aria-label="home" href="/" data-has-parsed="true">
              <div class="header-menu-item-mask">Home</div>
            </a>
          </li>
        </ul>
      </div>
    </header>
    <SimpleSwiper products={products} />
  </div>,
  rootElement
)
