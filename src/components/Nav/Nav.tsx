import React from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { EnumAuthAction } from '@/store/types/Auth/Auth';
import { NavAuth } from './NavAuth/NavAuth';
import { NavLoader } from './NavLoader/NavLoader';
import { NavMain } from './NavMain/NavMain';
import styles from './Nav.module.scss';

export const Nav: React.FC = () => {
  const AuthStatus = useTypedSelector((state) => state.auth.status);
  return (
    <div className={styles.header_inner}>
      <div className={styles.logo_block}>
        <h1 className={styles.logo}>Budget Control</h1>
      </div>
      <nav className={styles.nav}>
        {AuthStatus === EnumAuthAction.AUTH_LOGIN ? (
          <NavAuth />
        ) : AuthStatus === EnumAuthAction.AUTH_ENTERED ? (
          <NavMain />
        ) : (
          <NavLoader />
        )}
      </nav>
    </div>
  );
};
