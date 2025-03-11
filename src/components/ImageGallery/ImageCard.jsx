import css from "./ImageCard.module.css";

const ImageCard = ({ src, alt }) => (
  <div className={css.imageCard}>
    <img className={css.image} src={src} alt={alt} />
  </div>
);

export default ImageCard;
