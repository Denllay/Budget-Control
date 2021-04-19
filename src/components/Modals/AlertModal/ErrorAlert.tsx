import React from 'react';
import CrossIcon from '@/assets/svg/crossInCircleIcon.svg';
import styles from './AlertModal.module.scss';
interface IProps {
  closeModal(): void;
}
export const ErrorAlert: React.FC<IProps> = ({ closeModal }) => {
  return (
    <div className={styles.content}>
      <div className={`${styles.block_top} ${styles.block_top_error}`}>
        <CrossIcon className={styles.icon} />
      </div>

      <div className={`${styles.block_title} ${styles.block_title_error}`}>Error!</div>

      <button className={`${styles.block_button} ${styles.block_button_error}`} onClick={closeModal}>
        OK
      </button>
    </div>
  );
};
