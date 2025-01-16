import { useState } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { searchPhotos } from "./api/Api";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await searchPhotos(query);
      setImages(
        data.results.map(({ id, urls, alt_description }) => ({
          id,
          src: urls.small,
          alt: alt_description || "Image",
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} isLoading={isLoading} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
