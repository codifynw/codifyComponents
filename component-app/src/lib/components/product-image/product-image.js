import styled from 'styled-components'

const Image = styled.section`
  height: 200px;
  width: 200px;
  position: absolute;
  top: 50%;
  left: ${(props) => (props.left ? props.left : '50%')};
  background-image: url(${(props) => props.featured_image});
  transition: transform 0s ease, all 0.4s ease;

  transform: ${(props) =>
    props.rotateImage
      ? 'translate(-36%, -50%) rotateY(43deg) scale3d(1, 1, 1)'
      : 'translate(-50%, -50%)'};
  box-shadow: ${(props) =>
    props.rotateImage ? '-18px 6px 7px -6px rgb(0 0 0 / 10%)' : '-2px 4px 7px #000'};
`

const setRotateImage = function (activeThumbnailIndex) {
  return activeThumbnailIndex === 1
}

export const ProductImage = ({ featured_image, activeThumbnailIndex, wallStyles, ...props }) => {
  let rotateImage = setRotateImage(activeThumbnailIndex)
  return (
    <div>
      <Image
        className="hero-picture"
        featured_image={featured_image}
        rotateImage={rotateImage}
        activeThumbnailIndex={activeThumbnailIndex}
      />
    </div>
  )
}
