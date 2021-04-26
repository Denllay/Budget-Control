import React from 'react';
import CheckMarkIcon from '@/assets/svg/checkMarkIcon.svg';
import styles from './AlertModal.module.scss';
import { Button, Title } from '@/components/UIKit';
interface IProps {
  closeModal(): void;
}
const titleStyle = {
  fontSize: '28px',
  margin: '15px 0px',
  fontWeight: 500,
};

export const SucsessfulAlert: React.FC<IProps> = ({ closeModal }) => {
  return (
    <div className={styles.content}>
      <div className={styles.block_top}>
        <CheckMarkIcon className={styles.icon} />
      </div>

      <Title style={titleStyle}>Great!</Title>

      <Button className={styles.button} onClick={closeModal} theme="green">
        OK
      </Button>
    </div>
  );
};
