import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Nav } from './components/Nav/Nav';
import styles from './App.module.scss';
import { EnumAuthAction } from './types/Auth';
import { Router } from './Routers/Router';

export const App: React.FC = () => {
  const { status } = useTypedSelector((state) => state.auth);
  const { CheckAuth, GetBudgetsLength } = useActions();
  useEffect(() => {
    CheckAuth();
    if (status === EnumAuthAction.AUTH_ENTERED) {
      GetBudgetsLength();
    }
  }, [useActions]);

  return (
    <div className={styles.wrapper}>
      <Nav authStatus={status} />
      <Router />
    </div>
  );
};
