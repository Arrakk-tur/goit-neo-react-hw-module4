import ImageCard from "./ImageCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
const ImageGallery = ({ images, isLoading, error }) => {
  if (error) {
    return <ErrorMessage message={error} />;
  }
  return (
    <>
      {images && images.length > 0 && (
        <ul>
          {images.map(({ id, src, alt }) => (
            <li key={id}>
              <ImageCard src={src} alt={alt} />
            </li>
          ))}
        </ul>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default ImageGallery;
