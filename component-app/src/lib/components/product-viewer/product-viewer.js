import React, { useState, useEffect } from 'react'
import './product-viewer.scss'

/**
 * Product Page
 */
export const ProductViewer = ({ product, ...props }) => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  //   const [selectedProduct, setselectedProduct] = useState([0, 0, 0])

  const [selectedProduct, setselectedProduct] = useState({})

  function onChange(event) {
    const { name, value } = event.target
    setselectedProduct((prevState) => ({ ...prevState, [name]: value }))
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

  //   useEffect(() => {
  //     console.log('product: ', product)
  //   }, selectedProduct)

  //   const theFunction = (parentIndex, index) => {
  //     console.log('parentIndex: ', parentIndex)
  //     console.log('index: ', index)
  //     setselectedProduct([parentIndex, index]) // remove the curly braces
  //   }

  return (
    <section className={['product-viewer'].join(' ')} {...props}>
      <div className="product-image-container">
        <div className="product-image-nav">
          <div className="thumbnail"></div>
          <div className="thumbnail"></div>
          <div className="thumbnail"></div>
          <div className="thumbnail"></div>
        </div>
        <div className="product-hero-container">
          <div className="hero-picture"></div>
        </div>
      </div>
      <div className="product-options-container">
        <h3 className="title-container">{product.title}</h3>
        <div className="product-description">{product.description}</div>
        <form onSubmit={handleSubmit}>
          {product.optionsWithValues.map((option, parentIndex) => (
            <div className="option-container">
              <div className="option-title">Select {option.name}:</div>
              <div className="options-container">
                {option.values.map((value, index) => (
                  <div
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
                      onChange={onChange}
                      //   onClick={() => theFunction(parentIndex, index)} // pass the index
                    ></input>
                    <label
                      className="simple"
                      for={`ProductSelect-option-${option.name}-${value.replace(
                        /\s/g,
                        ''
                      )}`}
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
