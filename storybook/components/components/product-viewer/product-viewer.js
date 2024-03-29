import React, { useState, useEffect, useMemo } from 'react'
import { ProductImage } from '../product-image/product-image'
import './product-viewer.scss'

const thumbnails = ['main', 'details', 'wall', 'tbd']

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
      console.log('viewer.container.element.offsetWidth', viewer.container.element.offsetWidth)
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
  const [size, setsize] = useState('20x30')
  const [stickyTop, setstickyTop] = useState(0)


  const wallSizes = useMemo(() => {
    const newWallSizes = {}

    calculateWallSizes(size, activeRoomIndex, product.media, rooms).forEach((wallSize, index) => {
      newWallSizes[generateViewers()[index].name] = wallSize
    })

    return newWallSizes
  }, [size, activeRoomIndex, product.media, rooms])

  useEffect(() => {
    setstickyTop(document.querySelector('.sticky-container').offsetTop)
  }, [])

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

  function calculateWallSizes(dimensions, activeRoomIndex, media, rooms) {
    const [height, width] = dimensions.split('x')
    const isLandscapeOrientation = media[0]?.preview_image?.width > media[0]?.preview_image?.height
    const scalePercent = rooms[activeRoomIndex].scalePercent

    return generateViewers().map((viewer, index) => {
      const scaleConversionRatio = viewer.container.width * scalePercent
      const PPI = scaleConversionRatio / rooms[activeRoomIndex].scaleInches
      let resizedArray = []
      let baseWidth
      let baseHeight

      // CALCULATE VERTICAL POSITION
      let centerYPointPixels = ''
      if (isLandscapeOrientation) {
        resizedArray = [height * PPI, width * PPI]
        centerYPointPixels = rooms[activeRoomIndex].verticalCenter * viewer.container.height
        baseWidth = viewer.container.width * 0.8
        baseHeight =
          (viewer.container.width * 0.8 * media[0]?.preview_image.height) /
          media[0]?.preview_image.width
      } else {
        resizedArray = [width * PPI, height * PPI]
        centerYPointPixels = rooms[activeRoomIndex].portraitVerticalCenter * viewer.container.height
        baseWidth =
          (viewer.container.height * 0.8 * media[0]?.preview_image.width) /
          media[0]?.preview_image.height
        baseHeight = viewer.container.height * 0.8
      }

      const newTop = centerYPointPixels - resizedArray[0] * 0.5
      const newLeft = rooms[activeRoomIndex].horizontalCenter

      return {
        height: resizedArray[0],
        width: resizedArray[1],
        top: newTop,
        left: newLeft,
        scaleConversionRatio: scaleConversionRatio,
        baseimgWidthPx: baseWidth,
        baseimgHeightPx: baseHeight,
      }
    })
  }

  //   const handleResize = () => {
  //     setwindowWidth(window.innerWidth)
  //   }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className={['product-viewer'].join(' ')} {...props}>
      <div className="product-image-container">
        <div className="sticky-container" style={{ top: `${stickyTop}px` }}>
          <div className="product-image-nav">
            {thumbnails.map((value, index) => (
              <div
                id={`thumbnail-${value}`}
                key={index}
                className={`thumbnail thumbnail-${value} ${value} ${
                  activeThumbnailIndex === index ? 'active' : ''
                }`}
                style={{
                  backgroundImage: index === 2 ? `url(${rooms[activeRoomIndex].url})` : '',
                }}
                onClick={() => onThumbnailSelect(index)} // pass the index
              >
                <ProductImage
                  onThumbnailWall={value === 'wall'}
                  measurements={wallSizes}
                  rotateImage={value === 'details'}
                  featured_image={product.featured_image}
                  thumbnailIndex={value}
                  containerType="thumbnail"
                />
              </div>
            ))}
          </div>
          <div
            id="product-hero-container"
            className={`product-hero-container scene-${activeThumbnailIndex}`}
            style={{
              backgroundImage:
                activeThumbnailIndex === 2 ? `url(${rooms[activeRoomIndex].url})` : '',
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
              measurements={wallSizes}
              rotateImage={activeThumbnailIndex === 1}
              onWall={activeThumbnailIndex === 2}
              containerType="room"
            />
          </div>
        </div>
      </div>
      <div className="product-options-container">
        <h3 className="title-container">{product.title}</h3>
        <div className="product-description">{product.description}</div>
        <div>
          <div className="option-title">Size</div>
          <div className="option-title">Material</div>
          <div className="option-title">Finish</div>
        </div>
        <form onSubmit={handleSubmit}>
          {product.optionsWithValues.map((option, parentIndex) => (
            <>
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
            </>
          ))}
        </form>
        <div className="bottom-height">Filler</div>
      </div>
    </section>
  )
}
