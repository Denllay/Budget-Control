import { useActions } from '@/hooks/useActions';
import React from 'react';
import styles from './NavAuth.module.scss';

interface IProps {}
export const NavAuth: React.FC<IProps> = () => {
  const { ChangeViewAuthModal } = useActions();
  return (
    <ul className={styles.list}>
      <li className={styles.list_item} onClick={() => ChangeViewAuthModal('login')}>
        <span>Login</span>
      </li>
      <li className={styles.list_item} onClick={() => ChangeViewAuthModal('reg')}>
        <span>Register</span>
      </li>
    </ul>
  );
};
