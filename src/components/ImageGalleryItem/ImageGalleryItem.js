import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageCard, ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <ImageCard>
        <ImageItem
          src={image.webformatURL}
          alt={image.tags}
          onClick={openModal}
        />
      </ImageCard>
      {isModalOpen && <Modal image={image} onClose={closeModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
