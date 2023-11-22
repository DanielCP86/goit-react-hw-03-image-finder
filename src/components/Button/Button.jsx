import PropTypes from 'prop-types';
import styles from './Button.module.css';

export const Button = ({ onloadMore }) => {
  return (
    <div className={styles.Button__container}>
      <button type="button" className={styles.Button} onClick={onloadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
};
