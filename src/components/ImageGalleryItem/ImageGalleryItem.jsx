import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, largeImageURL, onOpenModal }) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onOpenModal(largeImageURL, alt)}
    >
      <img src={src} alt={alt} className={styles.ImageGalleryItem__image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
