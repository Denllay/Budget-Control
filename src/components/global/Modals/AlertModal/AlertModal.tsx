import React from 'react';
import { EnumAlertModalData, IPropsModalComponent } from '@/types/Modal';
import CheckMarkIcon from '@/assets/svg/checkMarkIcon.svg';
import CrossIcon from '@/assets/svg/crossInCircleIcon.svg';
import styles from './AlertModal.module.scss';

export const AlertModal: React.FC<IPropsModalComponent> = ({ dataModal, closeModal }) => {
  return (
    <div className={styles.content} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div
        className={
          dataModal === EnumAlertModalData.SUCCESSFUL
            ? `${styles.block_top}`
            : `${styles.block_top} ${styles.block_top_error}`
        }
      >
        {dataModal === EnumAlertModalData.SUCCESSFUL ? (
          <CheckMarkIcon className={styles.icon} />
        ) : (
          <CrossIcon className={styles.icon} />
        )}
      </div>
      <div
        className={
          dataModal === EnumAlertModalData.SUCCESSFUL
            ? `${styles.block_title}`
            : `${styles.block_title} ${styles.block_title_error}`
        }
      >
        {dataModal === EnumAlertModalData.SUCCESSFUL ? 'Great!' : 'Error!'}
      </div>
      <button
        className={
          dataModal === EnumAlertModalData.SUCCESSFUL
            ? `${styles.block_button}`
            : `${styles.block_button} ${styles.block_button_error}`
        }
        onClick={closeModal}
      >
        OK
      </button>
    </div>
  );
};
