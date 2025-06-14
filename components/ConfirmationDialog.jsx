import React, { useEffect, useRef } from 'react';
import styles from './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, loading }) => {
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);

  // Trap focus inside dialog
  useEffect(() => {
    if (isOpen) {
      // Focus the dialog
      dialogRef.current?.focus();
      // Trap focus
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
        if (e.key === 'Tab') {
          const focusableEls = dialogRef.current.querySelectorAll('button');
          const first = focusableEls[0];
          const last = focusableEls[focusableEls.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="dialog-title" className={styles.title}>Confirm Deletion</h2>
        <p id="dialog-description" className={styles.description}>Are you sure you want to delete this post?</p>
        <div className={styles.buttons}>
          <button
            ref={cancelRef}
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
            tabIndex={0}
          >
            Cancel
          </button>
          <button
            className={styles.deleteButton}
            onClick={onConfirm}
            type="button"
            disabled={loading}
            tabIndex={0}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
