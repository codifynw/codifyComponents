import React from 'react'
import PropTypes from 'prop-types'
import './gallery-grid.scss'

/**
 * Grid to show galleries
 */
export const GalleryGrid = ({ classList, items, ...props }) => {
  //   const mode = primary
  //     ? 'storybook-button--primary'
  //     : 'storybook-button--secondary'
  return (
    <div
      className={['gallery-grid grid-container', classList].join(' ')}
      {...props}
    >
      {items.map((value, index) => {
        return (
          <div className="grid-item" key={index}>
            {value.title}
          </div>
        )
      })}
    </div>
  )
}

GalleryGrid.propTypes = {
  /**
   * Classes to add to the div
   */
  classList: PropTypes.string,

  /**
   * Optional click handler
   */
  onClick: PropTypes.func,

  /**
   * Items to be included in the grid
   */
  items: PropTypes.array,
}

GalleryGrid.defaultProps = {
  onClick: undefined,
}
