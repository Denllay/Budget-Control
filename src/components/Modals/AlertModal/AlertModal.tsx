import { useActions } from '@/hooks/useActions';
import React from 'react';
import styles from './AlertModal.module.scss';
interface IProps {
  headerText: string;
}
export const AlertModal: React.FC<IProps> = ({ headerText }) => {
  const { CloseModal } = useActions();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>{headerText}</h2>
        </div>
        <button className={styles.button} onClick={CloseModal}>
          OK
        </button>
      </div>
    </div>
  );
};
