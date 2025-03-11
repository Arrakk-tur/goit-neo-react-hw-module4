import ImageCard from "./ImageCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, isLoading, error, onImageClick }) => {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <ul className={css.gallery}>
        {images &&
          images.map(({ id, srcSmall, srcRegular, alt }) => (
            <li
              key={id}
              className={css.galleryItem}
              onClick={() => onImageClick({ src: srcRegular, alt })}
            >
              <ImageCard src={srcSmall} alt={alt} />
            </li>
          ))}
      </ul>
      {isLoading && <Loader />}
    </>
  );
};

export default ImageGallery;
