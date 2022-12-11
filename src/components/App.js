import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { imagesFind } from './utils/pixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    loading: false,
    isBtnVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      imagesFind(query, page)
        .then(({ hits, totalHits }) => {
          if (hits.length > 12) {
            this.setState({ isBtnVisible: true });
          }
          if (totalHits === 0) {
            this.setState({ loading: false });
            return toast('Sorry, nothing was found for your search');
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            loading: false,
            totalHits,
          }));
        })
        .catch(error => {
          this.setState({ loading: false });
          return toast('Something went wrong! Please retry');
        });
    }
  }
  handleSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      loading: true,
      isBtnVisible: false,
    });
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
    const { page, totalHits } = this.state;
    const amountOfPages = totalHits / 12 - page;
    if (amountOfPages < 0) {
      this.setState({ isBtnVisible: false });
    }
  };
  render() {
    const { query, images, loading, totalHits } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} query={query} />
        {images.length > 0 && (
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ImageGallery>
        )}
        {loading && <Loader />}
        {images.length > 0 && images.length !== totalHits && !loading && (
          <Button onClick={this.loadMore} />
        )}
        <GlobalStyle />
        <ToastContainer position="top-center" autoClose={2500} />
      </>
    );
  }
}
