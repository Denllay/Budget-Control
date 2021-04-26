import React, { useState } from 'react';
import { EnumAlertModalData, TAuthModalMode } from '@/types/Modal';
import { AlertModal } from '../AlertModal/AlertModal';
import { Login } from './Login/Login';
import { Modal } from '@/components/UIKit';
import { Registration } from './Registration/Registration';
import styles from './AuthModal.module.scss';
interface IProps {
  authModalMode: TAuthModalMode;
}

export const AuthModal: React.FC<IProps> = ({ authModalMode }) => {
  const [alertModalStatus, setAlertModalStatus] = useState(false);

  const authList = {
    LOGIN: <Login setAlertModalStatus={setAlertModalStatus} />,
    REGISTRATION: <Registration setAlertModalStatus={setAlertModalStatus} />,
  };

  return (
    <div className={styles.content}>
      {authList[authModalMode]}

      <Modal modalStatus={alertModalStatus} setModalStatus={setAlertModalStatus}>
        <AlertModal setAlertModalStatus={setAlertModalStatus} modalMode={EnumAlertModalData.ERROR} />
      </Modal>
    </div>
  );
};
