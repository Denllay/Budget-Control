import React, { ContextType, useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavContext } from '../../../context/NavContext';
import styles from './NavAuth.module.scss';

interface IProps {}
export const NavAuth: React.FC<IProps> = () => {
  const { setModalAuthStatus } = useContext(NavContext);
  return (
    <ul className={styles.list}>
      <li className={styles.list_item} onClick={() => setModalAuthStatus('login')}>
        <span>Login</span>
      </li>
      <li className={styles.list_item} onClick={() => setModalAuthStatus('reg')}>
        <span> Register</span>
      </li>
    </ul>
  );
};
