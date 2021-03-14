import { useActions } from '@/hooks/useActions';
import { EnumModalAction, TModalAuthStatus } from '@/types/Modal';
import React from 'react';
import styles from './NavAuth.module.scss';

interface IProps {}
export const NavAuth: React.FC<IProps> = () => {
  const { ChangeViewModal } = useActions();
  const onClickModalHandler = (statusModal: TModalAuthStatus) =>
    ChangeViewModal({ type: EnumModalAction.SHOW_AUTH_MODAL, payload: statusModal });
  return (
    <ul className={styles.list}>
      <li className={styles.list_item} onClick={() => onClickModalHandler('login')}>
        <span>Login</span>
      </li>
      <li className={styles.list_item} onClick={() => onClickModalHandler('reg')}>
        <span>Register</span>
      </li>
    </ul>
  );
};
