import { useEffect, useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { imagesFind } from './utils/pixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    } else {
      imagesFind(query, page)
        .then(({ hits, totalHits }) => {
          if (hits.length > 12) {
            setIsBtnVisible(true);
          }
          if (totalHits === 0) {
            setLoading(false);
            return toast('Sorry, nothing was found for your search');
          }
          setImages(images => [...images, ...hits]);
          setTotalHits(totalHits);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setError(error);
          setLoading(false);
          return toast('Something went wrong! Please retry!');
        });
    }
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setLoading(true);
    setIsBtnVisible(false);
  };

  const loadMore = () => {
    setPage(page => page + 1);
    setLoading(true);
    const amountOfPages = totalHits / 12 - page;
    if (amountOfPages < 0) {
      setIsBtnVisible(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} query={query} />
      {images.length > 0 && (
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
        </ImageGallery>
      )}
      {error && <p>Something went wrong! Please retry!</p>}
      {loading && <Loader />}
      {images.length > 0 &&
        images.length !== totalHits &&
        !loading &&
        !isBtnVisible && <Button onClick={loadMore} />}
      <GlobalStyle />
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};
