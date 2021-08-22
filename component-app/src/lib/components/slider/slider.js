import React from 'react'
import PropTypes from 'prop-types'
import './slider.scss'

/**
 * Grid to show galleries
 */
export const Slider = ({ classList, items, ...props }) => {
  //   const mode = primary
  //     ? 'storybook-button--primary'
  //     : 'storybook-button--secondary'
  return (
    <div className={['simple-slider ', classList].join(' ')} {...props}>
      {items.map((value, index) => {
        // var sectionStyle = {
        //   backgroundImage: "url(" + {value.imgPath} + ")"
        // };

        return (
          <div
            className="grid-item"
            key={index}
            style={{ backgroundImage: 'url(' + value.imgPath + ')' }}
          >
            {value.title}
          </div>
        )
      })}
    </div>
  )
}

Slider.propTypes = {
  /**
   * Classes to add to the div
   */
  classList: PropTypes.string,

  /**
   * Optional click handler
   */
  onClick: PropTypes.func,

  /**
   * Items to be included in the slider
   */
  items: PropTypes.array,
}

Slider.defaultProps = {
  onClick: undefined,
}
