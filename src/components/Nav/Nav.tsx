import React from 'react';
import { NavAuth } from './NavAuth/NavAuth';
import { PreLoader } from '@/components/PreLoader/PreLoader';
import { NavMain } from './NavMain/NavMain';
import { EnumAuthAction } from '@/types/Auth';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Title } from '@/components/UIKit';
import styles from './Nav.module.scss';

const titleStyle = {
  fontFamily: 'DelightCandles, sans-serif',
  fontSize: '30px',
  margin: '10px 0px',
};

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
        <Title style={titleStyle}>Budget Control</Title>
      </div>
      <nav className={styles.nav}>{navComponentList[authStatus]}</nav>
    </div>
  );
};
