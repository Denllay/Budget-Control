import { AuthModal } from '@/components/global/Modals/AuthModal/AuthModal';
import { CreateModal } from '@/utilities/CreateModal/CreateModal';
import React, { useState } from 'react';
import styles from './NavAuth.module.scss';

type TdataModalEnumKey = 'LOGIN' | 'REGISTRATION';

export const NavAuth: React.FC = () => {
  const [muttableModalData, setMuttableModalData] = useState<TdataModalEnumKey | null>(null);

  const onClickOpenModalHandler = (modalData: TdataModalEnumKey) => {
    setMuttableModalData(modalData);
    toggleModal();
  };

  const { toggleModal, ModalComponent } = CreateModal({
    component: AuthModal,
    dataModal: muttableModalData as TdataModalEnumKey,
  });

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
      {ModalComponent}
    </>
  );
};
