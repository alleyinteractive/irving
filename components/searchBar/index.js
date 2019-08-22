import React, { useState } from 'react';
import queryString from 'query-string';
import { __ } from '@wordpress/i18n';
import history from 'utils/history';
import Search from 'assets/icons/search.svg';
import InputText from 'components/form/inputText';
import { withStyles } from 'critical-style-loader/lib';
import styles from './searchBar.css';

const SearchBar = () => {
  const searchQuery = window.location.search ?
    queryString.parse(window.location.search) :
    '';

  const [query, setQuery] = useState(searchQuery.s || '');

  const handleSubmit = (e) => {
    const encodedQuery = queryString.stringify({ s: query });
    e.preventDefault();
    history.push(`/search/?${encodedQuery}`);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputText
          className={styles.input}
          name="s"
          placeholder="Search for anything"
          onChange={handleChange}
          value={query || ''}
        >
          {__('Search term', 'mittr')}
        </InputText>
        <button type="submit" className={styles.submit}>
          <Search />
        </button>
      </form>
    </div>
  );
};

export default withStyles(styles)(SearchBar);
