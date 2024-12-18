import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

const App = () => {
  const images = [
    { id: 1, src: "https://via.placeholder.com/150", alt: "Image 1" },
    { id: 2, src: "https://via.placeholder.com/150", alt: "Image 2" },
    { id: 3, src: "https://via.placeholder.com/150", alt: "Image 3" },
  ];

  const handleSearchSubmit = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} />
    </div>
  );
};

export default App;
