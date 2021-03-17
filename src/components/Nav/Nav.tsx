import React from 'react';
import { EnumAuthAction, TAuthStatus } from '@/store/types/Auth/Auth';
import { NavAuth } from './NavAuth/NavAuth';
import { PreLoader } from '@/components/PreLoader/PreLoader';
import { NavMain } from './NavMain/NavMain';
import styles from './Nav.module.scss';
interface IProps {
  authStatus: TAuthStatus;
}
export const Nav: React.FC<IProps> = ({ authStatus }) => {
  return (
    <div className={styles.header_inner}>
      <div className={styles.logo_block}>
        <h1 className={styles.logo}>Budget Control</h1>
      </div>
      <nav className={styles.nav}>
        {authStatus === EnumAuthAction.AUTH_UNAUTHORIZED ? (
          <NavAuth />
        ) : authStatus === EnumAuthAction.AUTH_ENTERED ? (
          <NavMain />
        ) : (
          <PreLoader preloaderStatus="nav" />
        )}
      </nav>
    </div>
  );
};
