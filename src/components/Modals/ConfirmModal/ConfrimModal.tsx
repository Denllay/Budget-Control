import React from 'react';
import { Button, Title } from '@/components/UIKit';
import styles from './ConfirmModal.module.scss';
interface IProps {
  titleText: string;
  toggleModal(): void;
  onClickConfirm(): void;
}
const titleStyle = {
  color: '#282d3c',
  fontSize: '25px',
};
const animationDuration = 300;

export const ConfirmModal: React.FC<IProps> = ({ toggleModal, onClickConfirm, titleText }) => {
  const onClickConfirmHandler = () => {
    toggleModal();
    setTimeout(() => onClickConfirm(), animationDuration);
  };

  return (
    <div className={styles.container}>
      <Title style={titleStyle}>{titleText}</Title>

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
