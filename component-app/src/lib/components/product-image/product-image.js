import styled from 'styled-components'

const Image = styled.section`

position: absolute;
top: 50%;
left: 50%;
height: 50px;
width: 50px;
border-radius: 1px;
box-shadow: -2px 4px 7px rgba(0, 0, 0, 0.8);
transform: translate(-50%, -50%);

  height: 200px;
  width: ${(props) => props.widthValue};

  height: ${(props) => (props.onWall ? props.wallStyles.height + 'px' : '150px')};
  top: ${(props) => (props.onWall ? props.wallStyles.top + 'px' : '50%')};
  position: absolute;
  left: ${(props) => (props.left ? props.left : '50%')};
  background-image: url(${(props) => props.featured_image});
  transition: transform 0s ease, all 0.4s ease;

  transform: ${(props) => props.transformValue});
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
  console.log('********** **********')
  console.log('onWall: ', onWall)
  console.log('thumbnailIndex: ', thumbnailIndex)

  const determineTransform = function () {
    if (onWall) {
      return 'initial'
    }
    if (rotateImage) {
      return 'translate(-36%, -50%) rotateY(43deg) scale3d(1, 1, 1)'
    }
    return 'translate(-50%, -50%)'
  }

  const determineWidth = function () {
    if (onWall) {
      console.log('ON THE WALL')
      return wallStyles.width + 'px'
    }
    return '200px'
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
        transformValue={determineTransform()}
      />
    </div>
  )
}
