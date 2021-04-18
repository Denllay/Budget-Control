import React from 'react';
import { NavAuth } from './NavAuth/NavAuth';
import { PreLoader } from '@/components/PreLoader/PreLoader';
import { NavMain } from './NavMain/NavMain';
import { EnumAuthAction, TAuthStatus } from '@/types/Auth';
import styles from './Nav.module.scss';
interface IProps {
  authStatus: TAuthStatus;
}
export const Nav: React.FC<IProps> = ({ authStatus }) => {
  const navComponentList = {
    [EnumAuthAction.AUTH_UNAUTHORIZED]: <NavAuth />,
    [EnumAuthAction.AUTH_ENTERED]: <NavMain />,
    [EnumAuthAction.AUTH_PENDING]: <PreLoader preloaderStatus="nav" />,
  };

  return (
    <div className={styles.header_inner}>
      <div className={styles.logo_block}>
        <h1 className={styles.logo}>Budget Control</h1>
      </div>
      <nav className={styles.nav}>{navComponentList[authStatus]}</nav>
    </div>
  );
};
