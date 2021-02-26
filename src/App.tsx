import React, { useEffect, useState } from 'react';
import { useActions } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';
import styles from './App.module.scss';
import { Nav } from './components/Nav/Nav';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Auth } from './components/Auth/Auth';
import { EnumAuthAction } from './store/types/Auth/Auth';
import { Route, Switch } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Home } from './components/Home/Home';
import { TModalAuth } from './types/ModalAuth';
import { NavContext } from './context/NavContext';
export const App: React.FC = () => {
  const { status } = useTypedSelector((state) => state.auth);
  const [modalAuthStatus, setModalAuthStatus] = useState<TModalAuth>(null);
  const { CheckAuth } = useActions();
  useEffect(() => {
    CheckAuth();
    console.log(status);
  }, []);

  return (
    <div className={styles.wrapper}>
      <NavContext.Provider value={{ setModalAuthStatus }}>
        <Nav />
      </NavContext.Provider>

      <Switch>
        <PrivateRoute
          component={Main}
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

      <Auth statusModal={modalAuthStatus} setModal={setModalAuthStatus} />
    </div>
  );
};
