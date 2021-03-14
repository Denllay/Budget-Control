import React from 'react';
import styles from './ConfirmationDialog.module.scss';
interface IProps {
  headerText: string;
  isOpen: boolean;
  onClose(): void;
  onConfirmClick(): void;
}
export const ConfirmationDialog: React.FC<IProps> = ({ headerText, isOpen, onConfirmClick, onClose }) => {
  const onCloseConfirmDialog = (e: React.MouseEvent<HTMLDivElement>) =>
    (e.target as HTMLDivElement).id === 'close' && onClose();

  return isOpen ? (
    <div className={styles.wrapper} id="close" onClick={onCloseConfirmDialog}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>{headerText}</h2>
        </div>
        <div className={styles.button_block}>
          <button className={styles.button} onClick={onConfirmClick}>
            OK
          </button>
          <button className={`${styles.button} ${styles.button_cancel}`} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
// Later
