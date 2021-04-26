import React, { useState } from 'react';
import { AuthModal } from '@/components/Modals/AuthModal/AuthModal';
import { TAuthModalMode } from '@/types/Modal';
import { Modal } from '@/components/UIKit';
import styles from './NavAuth.module.scss';

export const NavAuth: React.FC = () => {
  const [authModalMode, setAuthModalMode] = useState<TAuthModalMode | null>(null);
  const [authModalStatus, setAuthModalStatus] = useState(false);

  const onClickOpenModalHandler = (modalData: TAuthModalMode) => {
    setAuthModalMode(modalData);
    setAuthModalStatus(true);
  };

  return (
    <>
      <ul className={styles.list}>
        <li className={styles.list_item} onClick={() => onClickOpenModalHandler('LOGIN')}>
          <span>Login</span>
        </li>
        <li className={styles.list_item} onClick={() => onClickOpenModalHandler('REGISTRATION')}>
          <span>Register</span>
        </li>
      </ul>

      <Modal modalStatus={authModalStatus} setModalStatus={setAuthModalStatus}>
        <AuthModal authModalMode={authModalMode!} />
      </Modal>
    </>
  );
};
