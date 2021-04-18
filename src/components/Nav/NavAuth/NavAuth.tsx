import { AuthModal } from '@/components/global/Modals/AuthModal/AuthModal';
import React, { useState } from 'react';
import { Modal } from '@/utilities/Modal/Modal';
import styles from './NavAuth.module.scss';
import { TAuthModalMode } from '@/types/Modal';

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
