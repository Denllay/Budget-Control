import React from 'react';
import { IRouters } from '@/types/Routers';
import { RoutePrivate } from './RoutePrivate';
import { Route } from 'react-router-dom';

interface IProps {
  router: IRouters;
}
export const RouteWithSubRoutes: React.FC<IProps> = ({ router: { Component, path, privateMode } }) => {
  if (privateMode) {
    return (
      <RoutePrivate path={path}>
        <Component />
      </RoutePrivate>
    );
  }

  return (
    <Route path={path}>
      <Component />
    </Route>
  );
};
