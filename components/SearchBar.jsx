import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, mobileMode }) => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleInput = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    if (mobileMode) setExpanded(true);
  };

  if (mobileMode && !expanded) {
    return (
      <button
        className={styles.iconButton}
        aria-label="Open search"
        onClick={() => setExpanded(true)}
      >
        <span className={styles.icon}>🔍</span>
      </button>
    );
  }

  return (
    <form className={styles.searchBar} role="search" onSubmit={handleSubmit}>
      <label htmlFor="search-input" className={styles.label}>Search posts:</label>
      <input
        id="search-input"
        className={styles.input}
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={handleInput}
        aria-label="Search posts"
        autoComplete="off"
      />
      <button type="submit" className={styles.iconButton} aria-label="Search">
        <span className={styles.icon}>🔍</span>
      </button>
      {mobileMode && (
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => { setExpanded(false); setQuery(''); onSearch(''); }}
        >Cancel</button>
      )}
    </form>
  );
};

export default SearchBar;
