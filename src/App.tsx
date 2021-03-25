import React, { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import { Nav } from './components/Nav/Nav';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { EnumAuthAction } from './store/types/Auth/Auth';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { BudgetContainer } from './containers/Budget/BudgetContainer';
import styles from './App.module.scss';

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
          component={BudgetContainer}
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
