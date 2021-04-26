import React from 'react';
import { Button } from '@/components/UIKit/Button/Button';
import styles from './ConfirmModal.module.scss';
interface IProps {
  titleText: string;
  toggleModal(): void;
  onClickConfirm(): void;
}
const animationDuration = 300;
export const ConfirmModal: React.FC<IProps> = ({ toggleModal, onClickConfirm, titleText }) => {
  const onClickConfirmHandler = () => {
    toggleModal();
    setTimeout(() => onClickConfirm(), animationDuration);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>{titleText}</h2>
      </div>
      <div className={styles.button_block}>
        <Button theme="green" className={styles.button} onClick={onClickConfirmHandler}>
          Yes
        </Button>

        <Button theme="red" className={styles.button} onClick={toggleModal}>
          Yes
        </Button>
      </div>
    </div>
  );
};
