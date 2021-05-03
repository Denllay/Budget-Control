import React from 'react';
import { routes } from './config';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithSubRoutes } from './RouteWithSubRoutes';

export const Router = () => {
  const routerList = routes.map((router) => {
    return <RouteWithSubRoutes router={router} key={router.key} />;
  });

  return (
    <Switch>
      {routerList}
      <Redirect exact from="/" to="/Budget-Control" />
    </Switch>
  );
};
