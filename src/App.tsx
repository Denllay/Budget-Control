import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Nav } from './components/Nav/Nav';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import styles from './App.module.scss';
import { EnumAuthAction } from './types/Auth';
import { Main } from './pages/Main/Main';

export const App: React.FC = () => {
  const { status } = useTypedSelector((state) => state.auth);
  const { CheckAuth, GetBudgetsLength } = useActions();
  useEffect(() => {
    CheckAuth();
    if (status === EnumAuthAction.AUTH_ENTERED) {
      GetBudgetsLength();
    }
  }, [useActions, status]);

  return (
    <div className={styles.wrapper}>
      <Nav authStatus={status} />
      <Switch>
        <PrivateRoute
          component={Main}
          condition={status}
          trueCondition={EnumAuthAction.AUTH_ENTERED}
          pathRedirect="/"
          path="/main"
          exact
        />
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
