import { Component, useEffect, useState } from 'react';
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
        setError(error);
        setLoading(false);
        return toast('Something went wrong! Please retry');
      });
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
      {loading && <Loader />}
      {images.length > 0 && images.length !== totalHits && !loading && (
        <Button onClick={loadMore} />
      )}
      <GlobalStyle />
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

// export class OldApp extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     error: null,
//     loading: false,
//     isBtnVisible: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       imagesFind(query, page)
//         .then(({ hits, totalHits }) => {
//           if (hits.length > 12) {
//             this.setState({ isBtnVisible: true });
//           }
//           if (totalHits === 0) {
//             this.setState({ loading: false });
//             return toast('Sorry, nothing was found for your search');
//           }
//           this.setState(prevState => ({
//             images: [...prevState.images, ...hits],
//             loading: false,
//             totalHits,
//           }));
//         })
//         .catch(error => {
//           this.setState({ loading: false });
//           return toast('Something went wrong! Please retry');
//         });
//     }
//   }
//   handleSubmit = query => {
//     this.setState({
//       query,
//       page: 1,
//       images: [],
//       loading: true,
//       isBtnVisible: false,
//     });
//   };
//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//       loading: true,
//     }));
//     const { page, totalHits } = this.state;
//     const amountOfPages = totalHits / 12 - page;
//     if (amountOfPages < 0) {
//       this.setState({ isBtnVisible: false });
//     }
//   };
//   render() {
//     const { query, images, loading, totalHits } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleSubmit} query={query} />
//         {images.length > 0 && (
//           <ImageGallery>
//             {images.map(image => (
//               <ImageGalleryItem key={image.id} image={image} />
//             ))}
//           </ImageGallery>
//         )}
//         {loading && <Loader />}
//         {images.length > 0 && images.length !== totalHits && !loading && (
//           <Button onClick={this.loadMore} />
//         )}
//         <GlobalStyle />
//         <ToastContainer position="top-center" autoClose={2500} />
//       </>
//     );
//   }
// }
