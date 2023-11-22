import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../services/imagesService';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { animateScroll } from 'react-scroll';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    isLoading: false,
    error: '',
    loadMore: false,
    items: [],
    page: 1,
    query: '',
    showModal: false,
    largeImageURL: '',
    alt: '',
  };

  componentDidUpdate(_prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getItems(query, page);
    }
  }

  getItems = async (query, page) => {
    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await getImages(query, page);
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmitForm = query => {
    this.setState({ query, items: [], page: 1, loadMore: false });
  };

  onOpenModal = (largeImageURL, alt) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      alt: alt,
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onloadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 5,
      smooth: 'linear',
    });
  };

  render() {
    const { isLoading, items, loadMore, showModal, largeImageURL, alt } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitForm} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={items} onOpenModal={this.onOpenModal} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            alt={alt}
            onClose={this.onCloseModal}
          />
        )}
        {loadMore && <Button onloadMore={this.onloadMore} />}
      </>
    );
  }
}
