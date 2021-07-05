export const HeroImage = ({ featured_image, ...props }) => {
  return <div style={{ backgroundImage: `url(${featured_image})` }} className="hero-picture"></div>
}
