import React from 'react'
import PropTypes from 'prop-types'
import './gallery-grid.css'

const elements = ['one', 'two', 'three']

/**
 * Grid to show galleries
 */
export const GalleryGrid = ({ classList, columns, label, ...props }) => {
  //   const mode = primary
  //     ? 'storybook-button--primary'
  //     : 'storybook-button--secondary'
  return (
    <div className={['gallery-grid', classList].join(' ')} {...props}>
      {elements.map((value, index) => {
        return <div key={index}>{value}</div>
      })}
    </div>
  )
}

GalleryGrid.propTypes = {
  /**
   * What background color to use
   */
  columns: PropTypes.number,
  /**

  /**
   * Is this the principal call to action on the page?
   */
  // primary: PropTypes.bool,

  /**
   * Classes to add to the div
   */
  classList: PropTypes.string,

  /**
   * Button contents
   */
  // label: PropTypes.string.isRequired,

  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
}

GalleryGrid.defaultProps = {
  columns: 3,
  onClick: undefined,
}
