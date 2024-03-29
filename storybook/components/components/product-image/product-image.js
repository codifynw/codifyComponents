import styled from 'styled-components'

const Image = styled.div`
  border-radius: 1px;
  position: absolute;

  width: ${(props) => props.widthValue};
  height: ${(props) => props.heightValue};
  top: ${(props) => props.topValue};
  left: ${(props) => props.leftValue};
  background-image: url(${(props) => props.featured_image});
  transition: transform 0s ease, all 0.4s ease;

  transform: ${(props) => props.transformValue};
  transform-style: preserve-3d;


    box-shadow: -179px 139px 19px -151px, -34px 2px 12px -27px
`

export const ProductImage = ({
  featured_image,
  rotateImage,
  onWall,
  measurements,
  thumbnailIndex,
  onThumbnailWall,
  containerType,
  ...props
}) => {
  const determineTransform = function () {
    if (onWall || onThumbnailWall) {
      return 'translateX(-50%)'
    }
    if (rotateImage) {
      return 'translate(-36%, -50%) rotateY(43deg) scale3d(1, 1, 1)'
    }
    // return 'translate(-50%, -50%)'
    return 'rotate3d(1, 20, 0, 33deg) translate(-50%, -50%)'
  }

  const determineHeight = function () {
    if (onWall) {
      return measurements.room?.height + 'px'
    }
    if (onThumbnailWall) {
      return measurements.thumbnail?.height + 'px'
    }
    return measurements[containerType]?.baseimgHeightPx + 'px'
  }

  const determineWidth = function () {
    if (onWall) {
      return measurements.room?.width + 'px'
    }
    if (onThumbnailWall) {
      return measurements.thumbnail?.width + 'px'
    }

    return measurements[containerType]?.baseimgWidthPx + 'px'
  }

  const determineTop = function () {
    if (onWall) {
      return measurements.room?.top + 'px'
    }
    if (onThumbnailWall) {
      return measurements.thumbnail?.top + 'px'
    }
    return '50%'
  }

  const determineLeft = function () {
    if (onWall) {
      return measurements.room?.left + '%'
    }
    if (onThumbnailWall) {
      return measurements.thumbnail?.left + '%'
    }
    return '50%'
  }

  return (
      <Image
        className="hero-picture"
        featured_image={featured_image}
        rotateImage={rotateImage}
        measurements={measurements}
        widthValue={determineWidth()}
        heightValue={determineHeight()}
        topValue={determineTop()}
        leftValue={determineLeft()}
        transformValue={determineTransform()}
      />
  )
}
