import React from 'react';
import CheckMarkIcon from '@/assets/svg/checkMarkIcon.svg';
import { Button } from '@/components/UIKit/Button/Button';
import styles from './AlertModal.module.scss';
interface IProps {
  closeModal(): void;
}
export const SucsessfulAlert: React.FC<IProps> = ({ closeModal }) => {
  return (
    <div className={styles.content}>
      <div className={styles.block_top}>
        <CheckMarkIcon className={styles.icon} />
      </div>
      <div className={styles.block_title}>Great!</div>

      <Button className={styles.button} onClick={closeModal} theme="green">
        OK
      </Button>
    </div>
  );
};
