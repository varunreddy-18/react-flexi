import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar';

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Responsive: show search bar or icon
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        BlogApp
      </Link>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/blog" className={styles.link}>Blog</Link>
        <Link to="/about" className={styles.link}>About</Link>
      </div>
      <div className={styles.searchWrapper}>
        <SearchBar onSearch={onSearch} mobileMode={isMobile} />
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        tabIndex={0}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Link to="/" className={styles.mobileLink} onClick={closeMenu}>Home</Link>
        <Link to="/blog" className={styles.mobileLink} onClick={closeMenu}>Blog</Link>
        <Link to="/about" className={styles.mobileLink} onClick={closeMenu}>About</Link>
      </div>
      {isMobileMenuOpen && <div className={styles.menuOverlay} onClick={closeMenu} tabIndex={-1} aria-hidden="true" />}
    </nav>
  );
};

export default NavBar;
