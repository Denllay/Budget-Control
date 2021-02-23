import React, { SetStateAction, useEffect, useState } from 'react';
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
import { NavContext } from './context/navContext';
export const App: React.FC = () => {
  const authStatus = useTypedSelector((state) => state.auth.status);
  const [modalAuthStatus, setModalAuthStatus] = useState<TModalAuth>(null);
  // const closeAuthModal = () => setModalAuthStatus(null);
  const { CheckAuth } = useActions();
  useEffect(() => {
    CheckAuth();
    console.log(authStatus);
  });
  return (
    <div className={styles.wrapper}>
      <NavContext.Provider value={{ setModalAuthStatus }}>
        <Nav />
      </NavContext.Provider>
      <Switch>
        <PrivateRoute
          component={Main}
          condition={authStatus}
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
