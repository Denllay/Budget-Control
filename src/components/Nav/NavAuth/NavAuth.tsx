import { LoginModal } from '@/components/global/Modals/AuthModal/LoginModal';
import { RegisterModal } from '@/components/global/Modals/AuthModal/RegisterModal';
import { CreateModal } from '@/utilities/CreateModal/CreateModal';
import React from 'react';
import styles from './NavAuth.module.scss';

interface IProps {}
export const NavAuth: React.FC<IProps> = () => {
  const { toggleModal: toggleLoginModal, ModalComponent: LoginModalComponent } = CreateModal({
    component: LoginModal,
  });
  const { toggleModal: toggleRegisterModal, ModalComponent: RegisterModalComponent } = CreateModal({
    component: RegisterModal,
  });
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.list_item} onClick={toggleLoginModal}>
          <span>Login</span>
        </li>
        <li className={styles.list_item} onClick={toggleRegisterModal}>
          <span>Register</span>
        </li>
      </ul>
      {LoginModalComponent}
      {RegisterModalComponent}
    </>
  );
};
