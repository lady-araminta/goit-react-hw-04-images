import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });
  const handleEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <ModalBox>
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalBox>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
};
