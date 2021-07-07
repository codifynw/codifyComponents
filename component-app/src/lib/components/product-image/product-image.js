import styled from 'styled-components'

const Image = styled.div`
  top: 50%;
  left: 50%;
  border-radius: 1px;
  position: absolute;

  width: ${(props) => props.widthValue};
  height: ${(props) => props.heightValue};

  top: ${(props) => (props.onWall ? props.wallStyles.top + 'px' : '50%')};
  left: ${(props) => (props.left ? props.left : '50%')};
  background-image: url(${(props) => props.featured_image});
  transition: transform 0s ease, all 0.4s ease;

  transform: ${(props) => props.transformValue};
  box-shadow: ${(props) =>
    props.rotateImage ? '-18px 6px 7px -6px rgb(0 0 0 / 10%)' : '-2px 4px 7px #000'};
`

export const ProductImage = ({
  featured_image,
  rotateImage,
  onWall,
  wallStyles,
  thumbnailIndex,
  ...props
}) => {
  const determineTransform = function () {
    console.log('rotateImage: ', rotateImage)
    if (onWall) {
      console.log('I return initial')
      return 'initial'
    }
    if (rotateImage) {
      console.log('I return rotate image')
      return 'translate(-36%, -50%) rotateY(43deg) scale3d(1, 1, 1)'
    }
    console.log('I RETURN 5050')
    return 'translate(-50%, -50%)'
  }

  const determineWidth = function () {
    if (onWall) {
      return wallStyles.width + 'px'
    }
    return '50%'
  }

  const determineHeight = function () {
    if (onWall) {
      return wallStyles.height + 'px'
    }
    return '50%'
  }

  return (
    <div>
      <Image
        className="hero-picture"
        featured_image={featured_image}
        rotateImage={rotateImage}
        onWall={onWall}
        wallStyles={wallStyles}
        widthValue={determineWidth()}
        heightValue={determineHeight()}
        transformValue={determineTransform()}
      />
    </div>
  )
}
