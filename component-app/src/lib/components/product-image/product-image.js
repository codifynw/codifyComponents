import styled from 'styled-components'

const Image = styled.section`
  height: 200px;
  width: ${(props) => (props.onWall ? props.wallStyles.width + 'px' : '200px')};
  height: ${(props) => (props.onWall ? props.wallStyles.height + 'px' : '150px')};
  top: ${(props) => (props.onWall ? props.wallStyles.top + '%' : '50%')};
  position: absolute;
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

export const ProductImage = ({ featured_image, rotateImage, onWall, wallStyles, ...props }) => {
  return (
    <div>
      <Image
        className="hero-picture"
        featured_image={featured_image}
        rotateImage={rotateImage}
        onWall={onWall}
        wallStyles={wallStyles}
      />
    </div>
  )
}
