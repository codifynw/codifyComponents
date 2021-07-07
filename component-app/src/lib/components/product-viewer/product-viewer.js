import React, { useState, useEffect } from 'react'
import { ProductImage } from '../product-image/product-image'
import './product-viewer.scss'

let thumbnails = ['main', 'details', 'wall', 'tbd']

let generateViewers = function () {
  let viewers = [
    {
      name: 'room',
      selector: '#product-hero-container',
    },
    {
      name: 'thumbnail',
      selector: '#thumbnail-wall',
    },
  ]

  viewers.map((viewer, index) => {
    viewer.container = {
      element: document.querySelector(viewer.selector),
    }

    if (viewer.container.element) {
      viewer.container.width = viewer.container.element.offsetWidth
      viewer.container.height = viewer.container.element.offsetHeight
    }
  })
  return viewers
}

export const ProductViewer = ({ product, rooms, ...props }) => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  const [selectedProduct, setselectedProduct] = useState({})
  const [activeThumbnailIndex, setactiveThumbnailIndex] = useState(0)
  const [activeRoomIndex, setactiveRoomIndex] = useState(0)
  const [size, setsize] = useState('0x0')
  const [wallSizes, setwallSizes] = useState([])

  function onOptionSelect(event) {
    const { name, value } = event.target
    if (name.toLowerCase() === 'size') {
      setsize(value)
    }
    setselectedProduct((prevState) => ({ ...prevState, [name]: value }))
  }

  function onThumbnailSelect(index) {
    setactiveThumbnailIndex(index)
  }

  function onRoomSelect(event) {
    const { name, value } = event.target
    setactiveRoomIndex(value)
  }

  function calculateWallSizes(dimensions) {
    const [height, width] = dimensions.split('x')
    const isLandscapeOrientation =
      product.media[0]?.preview_image?.width > product.media[0]?.preview_image?.height
    let viewers = generateViewers()

    // PERCENT OF PHOTO OCCUPIED BY OBJECT WITh KNOWN MEASUREMENT
    // IF A BED IS 60 IN. AND TAKES UP 60% OF THE PHOTO, WE KNOW
    // THE PHOTO LENGTH SPANS 100 INCHES
    const scalePercent = rooms[activeRoomIndex].scalePercent

    viewers.map((viewer, index) => {
      const scaledPixels = viewer.container.width * scalePercent
      const PPI = scaledPixels / rooms[activeRoomIndex].scaleInches
      const resizedArray = [viewer.container.height * PPI, viewer.container.width * PPI]

      setwallSizes((prevState) => ({
        ...prevState,
        [viewer.name]: { height: resizedArray[0], width: resizedArray[1], top: '20' },
      }))
    })

    console.log('wallSizes: ', wallSizes)

    // // CALCULATE VERTICAL POSITION
    // let centerYPointPixels = ''
    // if (landscapeOrientation) {
    //   centerYPointPixels = rooms[activeRoomIndex].verticalCenter * containerHeight
    // } else {
    //   centerYPointPixels = rooms[activeRoomIndex].portraitVerticalCenter * containerHeight
    // }
    // const newTop = centerYPointPixels - resizedArray[0] * 0.5
    // setwallSizes()
  }

  const handleResize = () => {
    setwindowWidth(window.innerWidth)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('You clicked submit.')
  }

  useEffect(() => {
    calculateWallSizes(size)
  }, [size])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <section className={['product-viewer'].join(' ')} {...props}>
      <div className="product-image-container">
        <div className="product-image-nav">
          {thumbnails.map((value, index) => (
            <div
              id={`thumbnail-${value}`}
              key={index}
              className={`thumbnail thumbnail-${value} ${value} ${
                activeThumbnailIndex === index ? 'active' : ''
              }`}
              style={{
                backgroundImage: index == 2 ? `url(${rooms[activeRoomIndex].url})` : '',
              }}
              onClick={() => onThumbnailSelect(index)} // pass the index
            >
              <ProductImage
                onWall={value === 'wall'}
                wallSizes={wallSizes}
                featured_image={product.featured_image}
                wallStyles={wallSizes}
                thumbnailIndex={value}
              />
            </div>
          ))}
        </div>
        <div
          id="product-hero-container"
          className={`product-hero-container scene-${activeThumbnailIndex}`}
          style={{
            backgroundImage: activeThumbnailIndex == 2 ? `url(${rooms[activeRoomIndex].url})` : '',
          }}
        >
          <select
            className={`single-option-select background-setting-select
                ${activeThumbnailIndex === 2 ? 'show' : ''}
            `}
            name="Room"
            onChange={onRoomSelect}
          >
            {rooms.map((room, index) => (
              <option key={index} value={index}>
                {room.title}
              </option>
            ))}
          </select>
          <ProductImage
            featured_image={product.featured_image}
            wallStyles={wallSizes}
            rotateImage={activeThumbnailIndex === 1}
            onWall={activeThumbnailIndex === 2}
          />
        </div>
      </div>
      <div className="product-options-container">
        <h3 className="title-container">{product.title}</h3>
        <div className="product-description">{product.description}</div>
        <form onSubmit={handleSubmit}>
          {product.optionsWithValues.map((option, parentIndex) => (
            <div className="option-container" key={parentIndex}>
              <div className="option-title">Select {option.name}:</div>
              <div className="options-container">
                {option.values.map((value, index) => (
                  <div
                    key={index}
                    className={`option variant
                    ${option.name}
                    ${selectedProduct[option.name] === value ? 'active' : ''}   
                    ${option.name}-${value.replace(/\s/g, '')}`}
                    id={`toggle-${option.name}-${value.replace(/\s/g, '')}`}
                  >
                    <input
                      type="radio"
                      value={value}
                      name={option.name}
                      className={`option single-option-selector`}
                      data-option-set={parentIndex}
                      data-option-index={index}
                      data-product-handle={product.handle}
                      data-value-escaped={value.replace(/\s/g, '')}
                      id={`ProductSelect-option-${option.name}-${escape(value.replace(/\s/g, ''))}`}
                      onChange={onOptionSelect}
                    ></input>
                    <label
                      className="simple"
                      htmlFor={`ProductSelect-option-${option.name}-${value.replace(/\s/g, '')}`}
                    >
                      <div className="variant-text">{value.replace(/\s/g, '')}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="submit">
            <span>{product.selected.price}</span>
          </button>
        </form>
      </div>
    </section>
  )
}

{
  /* <div>{windowWidth}</div> */
}
