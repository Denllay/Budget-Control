import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import styles from './App.module.scss';
import { Nav } from './components/Nav/Nav';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { EnumAuthAction } from './store/types/Auth/Auth';
import { Route, Switch } from 'react-router-dom';
import { Budgets } from './components/Budgets/Budgets';
import { Home } from './components/Home/Home';
import { Modals } from './components/Modals/Modals';
export const App: React.FC = () => {
  const { status } = useTypedSelector((state) => state.auth);
  const { CheckAuth } = useActions();
  useEffect(() => {
    CheckAuth();
  }, [useActions, status]);

  return (
    <div className={styles.wrapper}>
      <Nav authStatus={status} />
      <Switch>
        <PrivateRoute
          component={Budgets}
          condition={status}
          trueCondition={EnumAuthAction.AUTH_ENTERED}
          exact
          pathRedirect="/"
          path="/main"
        />
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Modals />
    </div>
  );
};
