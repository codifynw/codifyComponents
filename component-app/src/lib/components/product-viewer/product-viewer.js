import React from 'react'
import './product-viewer.scss'

/**
 * Product Page
 */
export const ProductViewer = ({ product, ...props }) => {
  return (
    <div className={['product-viewer'].join(' ')} {...props}>
      <div>This is a div</div>
    </div>
  )
}
