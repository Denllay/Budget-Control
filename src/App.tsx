import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Nav } from './components/Nav/Nav';
import styles from './App.module.scss';
import { EnumAuthAction } from './types/Auth';
import { Router } from './Routers/Router';

export const App: React.FC = () => {
  const authStatus = useTypedSelector((state) => state.auth.status);
  const { CheckAuth, GetBudgetsLength } = useActions();

  useEffect(() => {
    CheckAuth();
    if (authStatus === EnumAuthAction.AUTH_ENTERED) {
      GetBudgetsLength();
    }
  }, [useActions, authStatus]);

  return (
    <div className={styles.wrapper}>
      <Nav />
      <Router />
    </div>
  );
};
