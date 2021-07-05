import React, { useState, useEffect } from 'react'
import './product-viewer.scss'

let thumbnails = ['main', 'details', 'wall', 'tbd']

export const ProductViewer = ({ product, ...props }) => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  const [selectedProduct, setselectedProduct] = useState({})
  const [activeThumbnailIndex, setactiveThumbnailIndex] = useState(0)

  function onOptionSelect(event) {
    const { name, value } = event.target
    setselectedProduct((prevState) => ({ ...prevState, [name]: value }))
  }

  function onThumbnailSelect(index) {
    setactiveThumbnailIndex(index)
  }

  const handleResize = () => {
    setwindowWidth(window.innerWidth)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('You clicked submit.')
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <section className={['product-viewer'].join(' ')} {...props}>
      <div className="product-image-container">
        <div className="product-image-nav">
          {thumbnails.map((value, index) => (
            <div
              key={index}
              className={`thumbnail ${value} ${
                activeThumbnailIndex === index ? 'active' : ''
              }`}
              onClick={() => onThumbnailSelect(index)} // pass the index
            ></div>
          ))}
        </div>
        <div className="product-hero-container">
          <div
            style={{ backgroundImage: `url(${product.featured_image})` }}
            className="hero-picture"
          ></div>
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
                    ${option.name}-${value.replace(/\s/g, '')}`}
                    id={`toggle-${option.name}-${value.replace(/\s/g, '')}`}
                  >
                    <input
                      type="radio"
                      value={value}
                      name={option.name}
                      className={`option single-option-selector ${
                        selectedProduct === index ? 'active' : 'unactive'
                      }`}
                      data-option-set={parentIndex}
                      data-option-index={index}
                      data-product-handle={product.handle}
                      data-value-escaped={value.replace(/\s/g, '')}
                      id={`ProductSelect-option-${option.name}-${escape(
                        value.replace(/\s/g, '')
                      )}`}
                      onChange={onOptionSelect}
                    ></input>
                    <label
                      className="simple"
                      htmlFor={`ProductSelect-option-${
                        option.name
                      }-${value.replace(/\s/g, '')}`}
                    >
                      <div className="variant-text">
                        {value.replace(/\s/g, '')}
                      </div>
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
