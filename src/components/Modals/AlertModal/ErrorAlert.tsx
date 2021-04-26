import React from 'react';
import CrossIcon from '@/assets/svg/crossInCircleIcon.svg';
import styles from './AlertModal.module.scss';
import { Button, Title } from '@/components/UIKit';
interface IProps {
  closeModal(): void;
}
const titleStyle = {
  fontSize: '28px',
  fontWeight: 500,
  margin: '15px 0px',
};

export const ErrorAlert: React.FC<IProps> = ({ closeModal }) => {
  return (
    <div className={styles.content}>
      <div className={`${styles.block_top} ${styles.block_top_error}`}>
        <CrossIcon className={styles.icon} />
      </div>

      <Title style={titleStyle}>Error!</Title>

      <Button className={styles.button} onClick={closeModal} theme="red">
        OK
      </Button>
    </div>
  );
};
