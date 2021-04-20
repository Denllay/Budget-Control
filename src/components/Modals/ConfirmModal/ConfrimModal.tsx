import React from 'react';
import styles from './ConfirmModal.module.scss';
interface IProps {
  toggleModal(): void;
  onClickConfirm(): void;
  titleText: string;
}
export const ConfirmModal: React.FC<IProps> = ({ toggleModal, onClickConfirm, titleText }) => {
  const onClickConfirmHandler = () => {
    onClickConfirm();
    toggleModal();
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{titleText}</h2>
      </div>
      <div className={styles.button_block}>
        <button className={styles.button} onClick={onClickConfirmHandler}>
          Yes
        </button>
        <button className={`${styles.button} ${styles.button_cancel}`} onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
