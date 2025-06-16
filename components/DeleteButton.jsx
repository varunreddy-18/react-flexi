import React from 'react';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onClick, disabled }) => (
  <button
    className={styles.deleteButton}
    onClick={onClick}
    disabled={disabled}
    type="button"
    tabIndex={0}
    aria-label="Delete blog post"
  >
    Delete
  </button>
);

export default DeleteButton;
