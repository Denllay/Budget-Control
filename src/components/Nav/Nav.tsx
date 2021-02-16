import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { EnumAuthAction } from '../../store/types/Auth/Auth';
import styles from './Nav.module.scss';
import { NavAuth } from './NavAuth/NavAuth';
import { NavMain } from './NavMain/NavMain';
interface IProps {}
export const Nav: React.FC<IProps> = () => {
  const AuthStatus = useTypedSelector((state) => state.auth.status);
  return (
    <div className={styles.header_inner}>
      <div className={styles.logo_block}>
        <h1 className={styles.logo}>Family</h1>
      </div>
      <nav className={styles.nav}>
        {AuthStatus === EnumAuthAction.AUTH_LOGIN ? (
          <NavAuth />
        ) : AuthStatus === EnumAuthAction.AUTH_ENTERED ? (
          <NavMain /> // Вместо null сделать preloader
        ) : null}
      </nav>
    </div>
  );
};
