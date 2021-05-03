import React from 'react';
import { IRouters } from '@/types/Routers';
import { RoutePrivate } from './RoutePrivate';
import { Route } from 'react-router-dom';

interface IProps {
  router: IRouters;
}
export const RouteWithSubRoutes: React.FC<IProps> = ({ router: { Component, path, privateMode, exact } }) => {
  if (privateMode) {
    return (
      <RoutePrivate path={path} exact={exact}>
        <Component />
      </RoutePrivate>
    );
  }

  return (
    <Route path={path} exact={exact}>
      <Component />
    </Route>
  );
};
