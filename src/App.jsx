import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { searchPhotos } from "./api/Api";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const perPage = 12;

  useEffect(() => {
    if (searchQuery) {
      fetchImages();
    }
  }, [searchQuery, page]);

  const fetchImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await searchPhotos(searchQuery, page, perPage);
      setImages((prevImages) =>
        page === 1
          ? data.results.map(mapImage)
          : [...prevImages, ...data.results.map(mapImage)]
      );
      setTotalResults(data.total);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const mapImage = ({ id, urls, alt_description }) => ({
    id,
    srcSmall: urls.small,
    srcRegular: urls.regular,
    alt: alt_description || "Image",
  });

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setTotalResults(0);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const shouldShowLoadMore =
    images.length > 0 && !isLoading && images.length < totalResults;
  const showNoResultsMessage =
    searchQuery !== "" && !isLoading && images.length === 0 && !error;

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {showNoResultsMessage ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>No results found for &quot;{searchQuery}&quot;.</p>
        </div>
      ) : (
        <ImageGallery
          images={images}
          isLoading={isLoading}
          onImageClick={handleImageClick}
        />
      )}
      {isLoading && <Loader />}
      {shouldShowLoadMore && <LoadMoreBtn onClick={loadMoreImages} />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
