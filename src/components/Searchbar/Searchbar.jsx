import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget[1].value?.toLowerCase().trim();
    if (!searchValue) {
      return alert('Please, enter a value!');
    }
    this.props.onSubmit(searchValue);
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span>
              <FiSearch size={25} stroke="#000" />
            </span>
          </button>

          <input
            className={styles.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
