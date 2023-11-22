import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Modal.module.css';

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleEscape = this.handleEscape.bind(this);
    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleEscape(event) {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  }

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape, false);
  }
  render() {
    const { largeImageURL, alt } = this.props;
    return (
      <div className={styles.Overlay} onClick={this.handleOverlayClick}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
