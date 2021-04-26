import React from 'react';
import { NavAuth } from './NavAuth/NavAuth';
import { PreLoader } from '@/components/PreLoader/PreLoader';
import { NavMain } from './NavMain/NavMain';
import { EnumAuthAction } from '@/types/Auth';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './Nav.module.scss';

export const Nav = () => {
  const authStatus = useTypedSelector((state) => state.auth.status);

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
