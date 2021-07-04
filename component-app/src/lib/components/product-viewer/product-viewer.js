import React, { useState, useEffect } from 'react'
import './product-viewer.scss'

/**
 * Product Page
 */
export const ProductViewer = ({ product, ...props }) => {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  const [selectedProduct, setselectedProduct] = useState(0)

  const handleResize = () => {
    setwindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log('in selectedProduct use effect')
    console.log('product', product)
  }, selectedProduct)

  let theFunction = function () {
    console.log('test')
  }

  return (
    <div className={['product-viewer'].join(' ')} {...props}>
      <div>{windowWidth}</div>
      {product.options.map((option, index) => (
        <button onClick={theFunction}>{option}</button>
      ))}
    </div>
  )
}
